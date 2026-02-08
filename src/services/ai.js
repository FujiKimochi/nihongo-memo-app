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

export async function generateVerbDetails(verb, apiKey, modelName) {
  if (!apiKey) throw new Error("API Key is missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  // Use provided model name or default
  const selectedModel = modelName || getModelName();
  const model = genAI.getGenerativeModel({ model: selectedModel });

  const prompt = `
    You are a Japanese language tutor specialized in teaching Traditional Chinese speakers.
    The user has provided a Japanese verb: "${verb}".
    
    Please provide the following information in strict JSON format.
    **CRITICAL**: All explanations and meanings must be in **Traditional Chinese (繁體中文)**.

    1. "kanji": The dictionary form of the verb (with Kanji).
    2. "kana": The reading in Hiragana (for Furigana usage).
    3. "meaning": Meaning in Traditional Chinese.
    4. "type": Verb type (e.g., Godan, Ichidan, Irregular).
    5. "conjugations": An object containing the following keys. Each key must calculate the form, provide a Chinese explanation, AND provide a short Japanese example sentence using that specific form with its Chinese translation.
       
       Required keys:
       - "polite": { "form": "...", "explanation": "丁寧語 (ます形)", "example": { "jp": "...", "ruby": "HTML formatted string with <ruby>...", "zh": "..." } }
       - "negative": { "form": "...", "explanation": "否定形 (ない形)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "te": { "form": "...", "explanation": "て形 (連接)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "potential": { "form": "...", "explanation": "可能形 (能...)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "passive": { "form": "...", "explanation": "被動形 (被...)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "causative": { "form": "...", "explanation": "使役形 (讓...)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "causativePassive": { "form": "...", "explanation": "使役被動 (被迫...)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "imperative": { "form": "...", "explanation": "命令形", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "volitional": { "form": "...", "explanation": "意向形 (吧/打算)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "conditionalBa": { "form": "...", "explanation": "假定形 (ば)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "conditionalTara": { "form": "...", "explanation": "假定形 (たら)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }
       - "dictionary": { "form": "...", "explanation": "辭書形 (原形)", "example": { "jp": "...", "ruby": "...", "zh": "..." } }

    6. "examples": An array of 3 general example sentences using the verb. Each object should have "japanese" and "chinese".

    Example output structure:
    {
      "kanji": "食べる",
      "kana": "たべる",
      "meaning": "吃",
      "type": "一段動詞",
      "conjugations": {
        "polite": { "form": "食べます", "explanation": "丁寧語 (ます形)", "example": { "jp": "明日、寿司を食べます。", "zh": "明天要吃壽司。" } },
        "negative": { "form": "食べない", "explanation": "否定形", "example": { "jp": "納豆は食べない。", "zh": "我不吃納豆。" } },
        "dictionary": { "form": "食べる", "explanation": "辭書形 (原形)", "example": { "jp": "食べることは生きることだ。", "zh": "吃就是活著。" } }
      },
      "examples": [
        { "japanese": "私は寿司を食べます。", "chinese": "我吃壽司。" },
        { "japanese": "野菜も食べてください。", "chinese": "請也吃蔬菜。" },
        { "japanese": "よく食べるね。", "chinese": "你真能吃呢。" }
      ]
    }
    
    Ensure the JSON is valid and contains no markdown formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Improve JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("AI Response Text:", text);
      throw new Error("Invalid response format from AI (No JSON found)");
    }

    const jsonString = jsonMatch[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("AI Generation Error (Primary):", error);

    // If it's the specific 404 error, try fallbacks
    if (error.message.includes('404') || error.message.includes('not found')) {
      const fallbacks = ['gemini-pro', 'gemini-1.5-pro'];
      const currentModel = modelName || getModelName();

      // Remove current model from fallbacks if present
      const retries = fallbacks.filter(m => m !== currentModel);

      for (const fallbackName of retries) {
        console.log(`Trying fallback model: ${fallbackName}`);
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: fallbackName });
          const result = await fallbackModel.generateContent(prompt);
          const response = await result.response;
          const text = response.text();

          // Helper to extract JSON (duplicated logic, but safe)
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            // Update the saved model preference if this works
            setModelName(fallbackName);
            return JSON.parse(jsonMatch[0]);
          }
        } catch (fallbackError) {
          console.warn(`Fallback ${fallbackName} failed:`, fallbackError);
        }
      }
    }

    // If all fallbacks fail, throw original error
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
