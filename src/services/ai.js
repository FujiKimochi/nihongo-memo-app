import { getSupabaseClient } from './supabase';

// We no longer need local storage keys for API since it's handled by backend
const STORAGE_KEY_MODEL = 'nihongo-memo-model-name';

export const getModelName = () => {
  const model = localStorage.getItem(STORAGE_KEY_MODEL);
  // Migrate from old Gemini models to Groq default
  if (!model || model.includes('gemini')) {
    return 'llama-3.3-70b-versatile';
  }
  return model;
};
export const setModelName = (name) => localStorage.setItem(STORAGE_KEY_MODEL, name);

// Currently available Groq models (April 2026)
export async function fetchAvailableModels() {
  return [
    { name: 'llama-3.3-70b-versatile', displayName: 'Llama 3.3 70B (推薦・高品質)' },
    { name: 'llama-3.1-8b-instant', displayName: 'Llama 3.1 8B (快速・輕量)' },
    { name: 'mixtral-8x7b-32768', displayName: 'Mixtral 8x7B (平衡)' },
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
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user has provided multiple Japanese verbs: "${items.join(', ')}".

    Please provide the following information for EACH verb in a strict JSON array of objects.
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    Each object MUST have:
    1. "kanji": The dictionary form of the verb (with Kanji).
    2. "kana": The reading in Hiragana (for Furigana usage).
    3. "meaning": Meaning in Traditional Chinese.
    4. "type": Verb type (e.g., Godan, Ichidan, Irregular).
    5. "conjugations": { "polite": {...}, "negative": {...}, "te": {...}, "potential": {...}, "passive": {...}, "causative": {...}, "causativePassive": {...}, "imperative": {...}, "volitional": {...}, "conditionalBa": {...}, "conditionalTara": {...}, "dictionary": {...} }
       **CRITICAL**: You MUST provide all 12 conjugations listed above. Do not skip any. Each conjugation must include "form" (the conjugated word), "explanation" (brief usage), and "example": { "jp", "ruby", "zh" }.
    6. "examples": An array of 3 distinct and practical objects. Each object: { "jp", "ruby", "zh" }.

    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.
    Example: <ruby>私<rt>わたし</rt></ruby>は...

    Return only a valid JSON array: [ {...}, {...} ].
  ` : `
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user has provided a Japanese verb: "${verbInput}".
    
    Please provide the following information in strict JSON format.
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "kanji": The dictionary form (Kanji).
    2. "kana": Hiragana reading.
    3. "meaning": Traditional Chinese meaning.
    4. "type": Verb type.
    5. "conjugations": { "polite": {...}, "negative": {...}, "te": {...}, "potential": {...}, "passive": {...}, "causative": {...}, "causativePassive": {...}, "imperative": {...}, "volitional": {...}, "conditionalBa": {...}, "conditionalTara": {...}, "dictionary": {...} } 
       **CRITICAL**: You MUST provide all 12 conjugations listed above. Do not skip any. Each conjugation must include "form" (the conjugated word), "explanation", and "example": { "jp", "ruby", "zh" }
    6. "examples": Array of 3 distinct and practical objects: { "jp", "ruby", "zh" }.

    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.

    Ensure it's a valid JSON object.
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
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    Compare multiple grammar points: "${items.join(', ')}".

    Provide the following in strict JSON:
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "grammar_point": String summary.
    2. "meaning": General meaning in Traditional Chinese.
    3. "explanation": Deep analysis of differences.
    4. "connection": How to connect with other words.
    5. "is_comparison": true.
    6. "comparison_analysis": Detailed comparison table or text.
    7. "items": Array for each grammar point. Each object: { "grammar": "...", "explanation": "...", "examples": [ { "jp", "ruby", "zh" }, ... ] }
    
    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.

    Return JSON ONLY.
  ` : `
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    Grammar point: "${grammarInput}".

    Provide the following in strict JSON:
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "grammar_point": The grammar point.
    2. "meaning": Traditional Chinese meaning.
    3. "explanation": Detailed explanation.
    4. "connection": Connection rules.
    5. "examples": Array of 5 sentences: [ { "jp", "ruby", "zh" }, ... ]
    
    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.

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
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user wants to practice a dialogue in this scenario: "${scenario}".

    Please generate a natural, highly engaging, and realistic situational dialogue (8-10 sentences) between two people (A and B).
    **CRITICAL Instructions for Dialogue Quality**:
    - Make the conversation lively and authentic. Avoid monotonous, robotic, or overly textbook-like phrases.
    - Include varied expressions, natural spoken Japanese nuances (like fillers, sentence-ending particles, colloquialisms if appropriate), and practical vocabulary related to the scenario.
    - Ensure there is a clear flow and purpose to the conversation, not just simple greetings.

    Provide the result in strict JSON format.
    **CRITICAL**: All descriptions and translations must be in **Traditional Chinese (繁體中文)**.

    1. "scenario": The scenario name.
    2. "description": A brief summary of the conversation.
    3. "dialogues": An array of objects, each representing one line:
       - "role": "A" or "B".
       - "jp": The Japanese sentence.
       - "ruby": The Japanese sentence with <ruby> tags for ALL Kanji furigana.
       - "zh": The Traditional Chinese translation.

    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.
    Example: <ruby>私<rt>わたし</rt></ruby>は<ruby>學生<rt>がくせい</rt></ruby>です。

    Structure:
    {
      "scenario": "...",
      "description": "...",
      "dialogues": [
        { "role": "A", "jp": "...", "ruby": "...", "zh": "..." },
        ...
      ]
    }

    Ensure valid JSON and no markdown formatting.
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
    You are a Japanese language tutor for Traditional Chinese speakers.
    Input words: "${items.join(', ')}". They could be Adjectives (i-adj, na-adj) or Adverbs (adv).
    Provide a JSON array of objects. 
    **Traditional Chinese (繁體中文)** only for explanations.

    Required for EACH:
    - "kanji", "kana", "meaning", "type" (i-adj, na-adj, or adv)
    - "conjugations": 
        - If i-adj or na-adj: { "negative", "past", "pastNegative", "polite", "politeNegative", "te", "adverb" } 
          Each conjugation must be an object: { "form", "explanation", "example": { "jp", "ruby", "zh" } }
        - If adv (Adverb): null
    - "examples": Array of 3 objects. Each object: { "jp", "ruby", "zh" }.

    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.
    Example: <ruby>私<rt>わたし</rt></ruby>は...

    Return JSON array: [ {...}, {...} ].
  ` : `
    You are a Japanese language tutor for Traditional Chinese speakers.
    Input word: "${adjectiveInput}". It could be an Adjective or Adverb.
    Provide a JSON object in Traditional Chinese.

    Include: kanji, kana, meaning, type (i-adj, na-adj, or adv).
    - If it's an Adjective, provide "conjugations" with: negative, past, pastNegative, polite, politeNegative, te, adverb.
      Each conjugation is an object: { "form", "explanation", "example": { "jp", "ruby", "zh" } }
    - If it's an Adverb, "conjugations" should be null.
    - Provide "examples": Array of 3 objects: { "jp", "ruby", "zh" }.

    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.
    Example: <ruby>私<rt>わたし</rt></ruby>は...

    Return JSON object ONLY.
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
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user has provided a Japanese word or grammar point: "${input}".

    Please generate exactly 5 natural, practical example sentences using this input.
    **CRITICAL Requirements**:
    1. The grammar and vocabulary used in the sentences MUST be at the JLPT N3 level or lower.
    2. All explanations and translations must be in **Traditional Chinese (繁體中文)**.
    3. You must return a strict JSON array of 5 objects.
    
    Each object in the array MUST have:
    - "jp": The Japanese sentence.
    - "ruby": The Japanese sentence with HTML <ruby> tags for ALL Kanji furigana. Example: <ruby>私<rt>わたし</rt></ruby>は...
    - "zh": The Traditional Chinese translation.
    - "grammar_explanation": A detailed grammatical explanation of the sentence structure. You MUST return an ARRAY OF STRINGS, where each string is a bullet point. Example:
      [
        "• 【主詞】: [Japanese text] - [Chinese explanation]",
        "• 【受詞】: [Japanese text] - [Chinese explanation] (if applicable)",
        "• 【助詞】: [Particle 1] ([Function]), [Particle 2] ([Function])...",
        "• 【動詞】: [Japanese Verb] (Dictionary form: ..., Conjugation: ...)",
        "• 【句型/文法】: Explain the key grammar point or structure used here."
      ]
      IMPORTANT: Do NOT use HTML <ruby> tags inside this array. Use plain Japanese text and Traditional Chinese only.

    Return JSON array ONLY.
  `;

  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI N3 Sentence Generation Error:", error);
    throw error;
  }
}
