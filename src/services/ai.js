import { getSupabaseClient } from './supabase';

// We no longer need local storage keys for API since it's handled by backend
const STORAGE_KEY_MODEL = 'nihongo-memo-model-name';

export const getModelName = () => {
  const model = localStorage.getItem(STORAGE_KEY_MODEL);
  // Default to Gemini 2.5 Flash
  if (!model || model.includes('1.5') || model.includes('gemini-pro')) {
    return 'gemini-2.5-flash';
  }
  return model;
};
export const setModelName = (name) => localStorage.setItem(STORAGE_KEY_MODEL, name);

// Currently available models (May 2026)
export async function fetchAvailableModels() {
  return [
    { name: 'gemini-2.5-flash', displayName: 'Gemini 2.5 Flash (推薦・極速)' },
    { name: 'gemini-3.1-flash-lite', displayName: 'Gemini 3.1 Flash Lite (輕量)' },
    { name: 'gemini-2.5-pro', displayName: 'Gemini 2.5 Pro (需綁定付費卡)' },
  ];
}

async function invokeAIAssistant(messages) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase client not initialized.");

  const modelName = getModelName();
  console.log("Invoking AI Assistant with model:", modelName);

  const { data, error } = await supabase.functions.invoke('ai-assistant', {
    body: {
      messages,
      modelName
    }
  });

  if (error) {
    console.error("DEBUG: Full Edge Function Error Object:", error);

    let errorMsg = error.message;

    // Aggressively try to extract the error body
    if (error.context && typeof error.context.text === 'function') {
      try {
        const bodyText = await error.context.text();
        const bodyJson = JSON.parse(bodyText);
        if (bodyJson.error) errorMsg = bodyJson.error;
      } catch (e) {
        console.warn("Could not parse error.context.text()", e);
      }
    } else if (error.details) {
      errorMsg = typeof error.details === 'string' ? error.details : JSON.stringify(error.details);
    }

    throw new Error(errorMsg || "Failed to invoke AI assistant.");
  }

  if (!data || !data.response) {
    throw new Error("Invalid response format from AI Edge Function.");
  }

  return data.response;
}

/**
 * Strip markdown code fences and extract clean JSON from AI response.
 * Llama models often wrap JSON in ```json ... ``` blocks.
 */
function cleanAIResponse(text) {
  // Remove markdown code fences: ```json ... ``` or ``` ... ```
  let cleaned = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
  // Also handle cases where there's text before/after the code fence
  const fenceMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n?```/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1];
  }
  return cleaned.trim();
}

/**
 * Extract and parse JSON from AI response text.
 */
function parseAIJson(responseText) {
  const cleaned = cleanAIResponse(responseText);
  
  // Try direct parse first (cleanest path)
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Fallback: extract JSON via regex
    const jsonMatch = cleaned.match(/\[\s\S]*\]|\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("AI Response Text:", responseText);
      throw new Error("Invalid response format from AI (No JSON found)");
    }
    return JSON.parse(jsonMatch[0]);
  }
}

/**
 * Health check to verify Edge Function connectivity and configuration.
 */
export async function checkAIHealth() {
  const supabase = getSupabaseClient();
  if (!supabase) return { status: 'error', message: 'Supabase not initialized' };

  console.log("Starting backend health check...");
  try {
    const { data, error } = await supabase.functions.invoke('ai-assistant', {
      body: { mode: 'ping' }
    });

    if (error) {
      console.error("Health Check SDK Error:", error);

      let details = error.message;
      if (error.context && typeof error.context.text === 'function') {
        try {
          details = await error.context.text();
        } catch (e) {
          details = "Could not read error context body";
        }
      }

      return {
        status: 'error',
        message: error.message,
        details: details,
        statusCode: error.status
      };
    }
    console.log("Health Check Success:", data);
    return { status: 'ok', ...data };
  } catch (err) {
    console.error("Health Check Unexpected Error:", err);
    return { status: 'error', message: err.message };
  }
}

export async function generateVerbDetails(verbInput) {
  const items = verbInput.split(/[\s,，、]+/).filter(i => i.trim().length > 0);
  const isBatch = items.length > 1;
  const promptText = isBatch ? `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${items.join(', ')}".
    Provide a JSON array of objects. ALL Chinese text must be **Traditional Chinese**.
    Each object MUST have:
    1. "kanji", "kana", "meaning", "type", "transitivity" (自動詞/他動詞), "verb_group" (第1/2/3類).
    2. "conjugations": { "polite", "negative", "te", "potential", "passive", "causative", "causativePassive", "imperative", "volitional", "conditionalBa", "conditionalTara", "dictionary" }.
       - Each conjugation: { "form", "explanation", "example": { "jp", "ruby", "zh" } }.
       - **CRITICAL**: Example "jp" must be short, concise, and practical sentences.
    3. "examples": Array of 3: { "jp", "ruby", "zh" }.
    **HTML <ruby> tags REQUIRED** for ALL Kanji furigana in all "ruby" fields.
    Return JSON array ONLY.
  ` : `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${verbInput}".
    Provide a JSON object. ALL Chinese text must be **Traditional Chinese**.
    Include:
    1. "kanji", "kana", "meaning", "type", "transitivity", "verb_group".
    2. "conjugations": { "polite", "negative", "te", "potential", "passive", "causative", "causativePassive", "imperative", "volitional", "conditionalBa", "conditionalTara", "dictionary" }.
       - Each: { "form", "explanation", "example": { "jp", "ruby", "zh" } }.
       - **CRITICAL**: Example "jp" must be short, concise, and practical sentences.
    3. "examples": Array of 3: { "jp", "ruby", "zh" }.
    **HTML <ruby> tags REQUIRED** for ALL Kanji furigana in all "ruby" fields.
  `;

  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI Generation Error (Primary):", error);
    throw error;
  }
}

/**
 * Generates details for Japanese grammar point(s) using AI.
 */
export async function generateGrammarDetails(grammarInput) {
  const items = grammarInput.split(/[\s,，、]+/).filter(i => i.trim().length > 0);
  const isComparison = items.length > 1;

  const promptText = isComparison ? `
    You are a Japanese tutor for Traditional Chinese speakers. Compare: "${items.join(', ')}".
    Provide strict JSON:
    1. "grammar_point", "meaning", "explanation", "connection", "is_comparison": true.
    2. "comparison_analysis": Detailed comparison text/table.
    3. "items": Array for each point. Each: { "grammar", "explanation", "examples": [ { "jp", "ruby", "zh" }, ... ] }
    **HTML <ruby> tags REQUIRED** for furigana. ALL Chinese in **Traditional**.
    Return JSON ONLY.
  ` : `
    You are a Japanese tutor for Traditional Chinese speakers. Point: "${grammarInput}".
    Provide strict JSON:
    1. "grammar_point", "meaning", "explanation", "connection".
    2. "examples": Array of 5: [ { "jp", "ruby", "zh" }, ... ]
    **HTML <ruby> tags REQUIRED** for furigana. ALL Chinese in **Traditional**.
    Return JSON ONLY.
  `;


  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI Grammar Generation Error:", error);
    throw error;
  }
}

/**
 * Generates a situational dialogue based on a scenario using AI.
 */
export async function generateDialogueContext(scenario) {
  const promptText = `
    You are a Japanese tutor for Traditional Chinese speakers. Scenario: "${scenario}".
    Generate a natural dialogue (8-10 lines) between A and B.
    **Quality**: Authentic, lively, uses natural particles/nuance.
    Return strict JSON:
    1. "scenario", "description".
    2. "dialogues": Array of { "role", "jp", "ruby", "zh" }.
    **HTML <ruby> tags REQUIRED** for furigana. ALL Chinese in **Traditional**.
    Return JSON ONLY.
  `;


  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI Dialogue Generation Error:", error);
    throw error;
  }
}

/**
 * Generates details for Japanese adjective(s) or adverb(s) using AI.
 */
export async function generateAdjectiveDetails(adjectiveInput) {
  const items = adjectiveInput.split(/[\s,，、]+/).filter(i => i.trim().length > 0);
  const isBatch = items.length > 1;

  const promptText = isBatch ? `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${items.join(', ')}".
    Return a JSON array of objects. ALL Chinese in **Traditional**.
    Each:
    - "kanji", "kana", "meaning", "type" (i-adj/na-adj/adv).
    - "conjugations": If adjective: { "negative", "past", "pastNegative", "polite", "politeNegative", "te", "adverb" }. Each: { "form", "explanation", "example": { "jp", "ruby", "zh" } }. If adverb: null.
    - "examples": Array of 3: { "jp", "ruby", "zh" }.
    **HTML <ruby> tags REQUIRED** for furigana.
    Return JSON ONLY.
  ` : `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${adjectiveInput}".
    Return a JSON object. ALL Chinese in **Traditional**.
    - "kanji", "kana", "meaning", "type" (i-adj/na-adj/adv).
    - "conjugations": If adjective: { "negative", "past", "pastNegative", "polite", "politeNegative", "te", "adverb" }. Each: { "form", "explanation", "example": { "jp", "ruby", "zh" } }. If adverb: null.
    - "examples": Array of 3: { "jp", "ruby", "zh" }.
    **HTML <ruby> tags REQUIRED** for furigana.
    Return JSON ONLY.
  `;


  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI Adjective Generation Error:", error);
    throw error;
  }
}

/**
 * Generates N3-level sentences for a given word or grammar point.
 */
export async function generateN3Sentences(input) {
  const promptText = `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${input}".
    Generate 5 N3-level example sentences.
    Return strict JSON array of 5 objects:
    - "jp", "zh".
    - "ruby": With HTML <ruby> tags for furigana.
    - "grammar_explanation": Array of strings (bullets). Explain structure, particles, verb form. (No ruby tags here).
    ALL Chinese in **Traditional**. Return JSON ONLY.
  `;


  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI N3 Sentence Generation Error:", error);
    throw error;
  }
}

/**
 * Generates a comprehensive dictionary lookup for any given Japanese word.
 */
export async function generateDictionaryLookup(input) {
  const promptText = `
    You are a Japanese dictionary/tutor for Traditional Chinese speakers. Input: "${input}".
    Provide a comprehensive JSON object:
    - "word", "kana", "meaning", "meaning_jp" (simple Japanese explanation).
    - "type", "transitivity" (verb only), "verb_group" (verb only).
    - "explanation": Array of strings (bullets). No ruby tags.
    - "examples": Array of 3: { "jp", "ruby", "zh" }.
    **HTML <ruby> tags REQUIRED** for furigana in "ruby".
    ALL Chinese in **Traditional**. Return JSON ONLY.
  `;


  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI Dictionary Lookup Error:", error);
    throw error;
  }
}
