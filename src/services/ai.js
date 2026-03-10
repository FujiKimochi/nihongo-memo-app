import { getSupabaseClient } from './supabase';

// We no longer need local storage keys for API since it's handled by backend
const STORAGE_KEY_MODEL = 'nihongo-memo-model-name';

export const getModelName = () => localStorage.getItem(STORAGE_KEY_MODEL) || 'gemini-2.5-flash';
export const setModelName = (name) => localStorage.setItem(STORAGE_KEY_MODEL, name);

// Kept for UI compatibility if needed, but we don't strictly "fetch" them from user key anymore.
// We can just return a hardcoded list of supported backend models.
export async function fetchAvailableModels() {
  return [
    { name: 'gemini-2.5-flash', displayName: 'Gemini 2.5 Flash (Fast)' },
    { name: 'gemini-2.5-pro', displayName: 'Gemini 2.5 Pro (Accurate)' },
    { name: 'gemini-1.5-flash', displayName: 'Gemini 1.5 Flash' },
    { name: 'gemini-1.5-pro', displayName: 'Gemini 1.5 Pro' }
  ];
}

async function invokeAIAssistant(messages) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase client not initialized.");

  const modelName = getModelName();

  const { data, error } = await supabase.functions.invoke('ai-assistant', {
    body: {
      messages,
      modelName
    }
  });

  if (error) {
    console.error("Edge Function Error:", error);
    throw new Error(error.message || "Failed to invoke AI assistant.");
  }

  if (!data || !data.response) {
    throw new Error("Invalid response format from AI Edge Function.");
  }

  return data.response;
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
       (Each conjugation must include "form", "explanation", and "example": { "jp", "ruby", "zh" })
    6. "examples": An array of 3 objects. Each object: { "jp", "ruby", "zh" }.

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
    5. "conjugations": { "polite": {...}, "negative": {...}, ... } 
       Each conjugation: { "form", "explanation", "example": { "jp", "ruby", "zh" } }
    6. "examples": Array of 3 objects: { "jp", "ruby", "zh" }.

    **CRITICAL**: Every "ruby" field MUST contain the Japanese sentence with HTML <ruby> tags for ALL Kanji furigana.

    Ensure it's a valid JSON object.
  `;

  try {
    const responseText = await invokeAIAssistant([{ role: 'user', content: promptText }]);

    const jsonMatch = responseText.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("AI Response Text:", responseText);
      throw new Error("Invalid response format from AI (No JSON found)");
    }

    return JSON.parse(jsonMatch[0]);
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

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from AI");
    return JSON.parse(jsonMatch[0]);
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

    Please generate a natural, helpful dialogue (8-10 sentences) between two people (A and B).
    Provide the result in strict JSON format.
    **CRITICAL**: All descriptions and translations must be in **Traditional Chinese (繁體中文)**.

    1. "scenario": The scenario name.
    2. "description": A brief summary of the conversation.
    3. "dialogues": An array of objects, each representing one line:
       - "role": "A" or "B".
       - "jp": The Japanese sentence.
       - "ruby": The Japanese sentence with <ruby> tags for Kanji furigana.
       - "zh": The Traditional Chinese translation.

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

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from AI");
    return JSON.parse(jsonMatch[0]);
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

    const jsonMatch = responseText.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from AI");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("AI Adjective Generation Error:", error);
    throw error;
  }
}
