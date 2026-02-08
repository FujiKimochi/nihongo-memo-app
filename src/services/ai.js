import { GoogleGenerativeAI } from "@google/generative-ai";

const STORAGE_KEY_API = 'nihongo-memo-api-key';
const STORAGE_KEY_MODEL = 'nihongo-memo-model-name';

export const getApiKey = () => localStorage.getItem(STORAGE_KEY_API);
export const setApiKey = (key) => localStorage.setItem(STORAGE_KEY_API, key);

export const getModelName = () => localStorage.getItem(STORAGE_KEY_MODEL) || 'gemini-1.5-flash';
export const setModelName = (name) => localStorage.setItem(STORAGE_KEY_MODEL, name);

export async function fetchAvailableModels(apiKey) {
  if (!apiKey) throw new Error("API Key is missing");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.models) return [];

  // Filter for models that support generateContent
  return data.models
    .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
    .map(m => m.name.replace('models/', '')); // Remove 'models/' prefix for cleaner display if desired, but keep full name for API usage if needed. actually API accepts both. let's prefer short name for display
}

export async function generateVerbDetails(verbInput, apiKey, modelName) {
  if (!apiKey) throw new Error("API Key is missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const selectedModel = modelName || getModelName();
  const model = genAI.getGenerativeModel({ model: selectedModel });

  // Detect multiple verbs
  const items = verbInput.split(/[\s,，、]+/).filter(i => i.trim().length > 0);
  const isBatch = items.length > 1;

  const prompt = isBatch ? `
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
    6. "examples": An array of 3 general example sentences (japanese, chinese).

    Return only a valid JSON array: [ {...}, {...} ]. No markdown.
  ` : `
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user has provided a Japanese verb: "${verbInput}".
    
    Please provide the following information in strict JSON format.
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "kanji": The dictionary form of the verb (with Kanji).
    2. "kana": The reading in Hiragana (for Furigana usage).
    3. "meaning": Meaning in Traditional Chinese.
    4. "type": Verb type (e.g., Godan, Ichidan, Irregular).
    5. "conjugations": { "polite": {...}, "negative": {...}, "te": {...}, "potential": {...}, "passive": {...}, "causative": {...}, "causativePassive": {...}, "imperative": {...}, "volitional": {...}, "conditionalBa": {...}, "conditionalTara": {...}, "dictionary": {...} }
    6. "examples": An array of 3 general example sentences (japanese, chinese).

    Ensure it's a valid JSON object. No markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("AI Response Text:", text);
      throw new Error("Invalid response format from AI (No JSON found)");
    }

    const data = JSON.parse(jsonMatch[0]);
    // Normalize to array for easier handling in caller if batch, but keep object if single for compatibility?
    // Let's return exactly what AddWordForm expects: either a single object or an array.
    // Actually, AddWordForm will be updated to handle multiple results if we return an array.
    return data;
  } catch (error) {
    console.error("AI Generation Error (Primary):", error);

    if (error.message.includes('404') || error.message.includes('not found')) {
      const fallbacks = ['gemini-pro', 'gemini-1.5-pro'];
      const currentModel = modelName || getModelName();
      const retries = fallbacks.filter(m => m !== currentModel);

      for (const fallbackName of retries) {
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: fallbackName });
          const result = await fallbackModel.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
          if (jsonMatch) {
            setModelName(fallbackName);
            return JSON.parse(jsonMatch[0]);
          }
        } catch (fallbackError) {
          console.warn(`Fallback ${fallbackName} failed:`, fallbackError);
        }
      }
    }
    throw error;
  }
}

/**
 * Generates details for Japanese grammar point(s) using AI.
 * Supports single grammar point or comparison of multiple points (separated by space or comma).
 */
export async function generateGrammarDetails(grammarInput, apiKey, modelName) {
  if (!apiKey) throw new Error("API Key is missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const selectedModel = modelName || getModelName();
  const model = genAI.getGenerativeModel({ model: selectedModel });

  // Detect multiple grammar points
  const items = grammarInput.split(/[\s,，、]+/).filter(i => i.trim().length > 0);
  const isComparison = items.length > 1;

  const prompt = isComparison ? `
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user wants to compare multiple grammar points: "${items.join(', ')}".

    Please provide the following information in strict JSON format.
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "grammar_point": A summary string of the compared items (e.g., "${items.join(' vs ')}").
    2. "is_comparison": true
    3. "comparison_analysis": A detailed explanation of the differences, nuances, and usage scenarios between these grammar points.
    4. "items": An array of objects for EACH grammar point. Each object MUST have:
       - "grammar_point": The specific grammar point.
       - "meaning": Concise meaning.
       - "explanation": Detailed usage explanation.
       - "connection": Connection rules.
       - "examples": An array of 5 example sentences (jp, ruby, zh).

    Ensure valid JSON and no markdown formatting.
  ` : `
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user is learning the grammar point: "${grammarInput}".

    Please provide the following information in strict JSON format.
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "grammar_point": The grammar point itself.
    2. "is_comparison": false
    3. "meaning": Concise meaning in Traditional Chinese.
    4. "explanation": Detailed usage explanation.
    5. "connection": Connection rules (e.g., V-te + ...).
    6. "examples": An array of 5 example sentences. Each object MUST have:
       - "jp": The Japanese sentence.
       - "ruby": The Japanese sentence with <ruby> tags for Kanji furigana.
       - "zh": The Traditional Chinese translation.

    Ensure valid JSON and no markdown formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
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
export async function generateDialogueContext(scenario, apiKey, modelName) {
  if (!apiKey) throw new Error("API Key is missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const selectedModel = modelName || getModelName();
  const model = genAI.getGenerativeModel({ model: selectedModel });

  const prompt = `
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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from AI");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("AI Dialogue Generation Error:", error);
    throw error;
  }
}
