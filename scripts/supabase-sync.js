import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Simple .env loader
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('.env file not found. Please create one using .env.example.');
    process.exit(1);
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value.trim();
    }
  });
}

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_EMAIL = process.env.SUPABASE_EMAIL;
const SUPABASE_PASSWORD = process.env.SUPABASE_PASSWORD;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const USER_ID_CONFIG = process.env.USER_ID;
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

if (!SUPABASE_URL || (!SUPABASE_ANON_KEY && !SUPABASE_SERVICE_ROLE_KEY) || !GOOGLE_SHEET_URL) {
  console.error("Missing required environment variables. Please check your .env file.");
  process.exit(1);
}

// Robust CSV Parser
function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let cell = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(cell.trim());
      if (row.length > 0 && row.some(x => x.length > 0)) {
        lines.push(row);
      }
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    lines.push(row);
  }
  return lines;
}

// Clean and Parse AI responses
function cleanAIResponse(text) {
  let cleaned = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
  const fenceMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n?```/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1];
  }
  return cleaned.trim();
}

function parseAIJson(responseText) {
  const cleaned = cleanAIResponse(responseText);
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const jsonMatch = cleaned.match(/\[\s\S]*\]|\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI (No JSON found)");
    }
    return JSON.parse(jsonMatch[0]);
  }
}

// Helper to call Edge function or local Gemini API fallback
async function invokeAIAssistant(supabase, messages) {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const lastMsg = messages[messages.length - 1];
      let responseText = "";
      
      if (messages.length > 1) {
        const history = messages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMsg.content);
        const response = await result.response;
        responseText = response.text();
      } else {
        const result = await model.generateContent(lastMsg.content);
        const response = await result.response;
        responseText = response.text();
      }
      return responseText;
    } catch (geminiErr) {
      console.warn("Local Gemini API invocation failed, falling back to Supabase Edge Function:", geminiErr.message);
    }
  }

  const modelName = 'gemini-2.5-flash';
  const { data, error } = await supabase.functions.invoke('ai-assistant', {
    body: {
      messages,
      modelName
    }
  });

  if (error) {
    console.error("DEBUG: Full Edge Function Error Object:", error);
    let errorMsg = error.message;
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
  return data.response;
}

// Classify words (Verb, Adjective, Noun)
async function classifyWord(supabase, word) {
  const promptText = `
    You are a Japanese linguistics expert. Classify the Japanese word: "${word}".
    We need to classify it into one of these three categories:
    1. "verb" (if it is a verb, e.g. 食べる, 行く, 勉強する)
    2. "adjective" (if it is an adjective or adverb, e.g. 美味しい, 静か, ゆっくり)
    3. "noun" (if it is a noun, pronoun, or other part of speech, e.g. 貓, 先生, 日本)
    
    Return a strict JSON object with a single key "class":
    {
      "class": "verb" | "adjective" | "noun"
    }
    Return JSON ONLY.
  `;
  const responseText = await invokeAIAssistant(supabase, [{ role: 'user', content: promptText }]);
  const result = parseAIJson(responseText);
  return result.class;
}

// Ported Generators from Web App ai.js
async function generateVerbDetails(supabase, verbInput) {
  const promptText = `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${verbInput}".
    Provide a JSON object. ALL Chinese text must be **Traditional Chinese**.
    Include:
    1. "kanji", "kana", "meaning", "type" (should be "動詞"), "transitivity" (自動詞/他動詞, or null if N/A), "verb_group" (第1/2/3類, or null if N/A).
    2. "conjugations": { "polite", "negative", "te", "potential", "passive", "causative", "causativePassive", "imperative", "volitional", "conditionalBa", "conditionalTara", "dictionary" }.
       - Each: { "form", "explanation", "example": { "jp", "ruby", "zh" } }.
       - **CRITICAL**: Example "jp" must be short, concise, and practical sentences.
    3. "examples": Array of 3: { "jp", "ruby", "zh" }.
    **CRITICAL RUBY FORMAT**: For ALL "ruby" fields, you MUST use strict HTML <ruby> tags for Kanji (e.g., <ruby>漢字<rt>かんじ</rt></ruby>). DO NOT output plain text like 漢かん字じ or 漢字(かんじ).
    Return JSON ONLY.
  `;
  const responseText = await invokeAIAssistant(supabase, [{ role: 'user', content: promptText }]);
  return parseAIJson(responseText);
}

async function generateAdjectiveDetails(supabase, adjInput) {
  const promptText = `
    You are a Japanese tutor for Traditional Chinese speakers. Input: "${adjInput}".
    Return a JSON object. ALL Chinese in **Traditional**.
    - "kanji", "kana", "meaning", "type" (i-adj/na-adj/adv).
    - "conjugations": If adjective: { "negative", "past", "pastNegative", "polite", "politeNegative", "te", "adverb" }. Each: { "form", "explanation", "example": { "jp", "ruby", "zh" } }. If adverb: null.
    - "examples": Array of 3: { "jp", "ruby", "zh" }.
    **CRITICAL RUBY FORMAT**: For ALL "ruby" fields, you MUST use strict HTML <ruby> tags for Kanji (e.g., <ruby>漢字<rt>かんじ</rt></ruby>). DO NOT output plain text like 漢かん字じ.
    Return JSON ONLY.
  `;
  const responseText = await invokeAIAssistant(supabase, [{ role: 'user', content: promptText }]);
  return parseAIJson(responseText);
}

async function generateDictionaryLookup(supabase, wordInput) {
  const promptText = `
    You are a Japanese dictionary/tutor for Traditional Chinese speakers. Input: "${wordInput}".
    Provide a comprehensive JSON object:
    - "word", "kana", "meaning", "meaning_jp" (simple Japanese explanation).
    - "type" (should be "Noun"), "transitivity" (null), "verb_group" (null).
    - "explanation": Array of strings (bullets). No ruby tags.
    - "examples": Array of 3: { "jp", "ruby", "zh" }.
    **CRITICAL RUBY FORMAT**: For ALL "ruby" fields, you MUST use strict HTML <ruby> tags for Kanji (e.g., <ruby>漢字<rt>かんじ</rt></ruby>). DO NOT output plain text like 漢かん字じ. ALL Chinese in **Traditional**. Return JSON ONLY.
  `;
  const responseText = await invokeAIAssistant(supabase, [{ role: 'user', content: promptText }]);
  return parseAIJson(responseText);
}

async function generateGrammarDetails(supabase, grammarInput) {
  const promptText = `
    You are a Japanese tutor for Traditional Chinese speakers. Point: "${grammarInput}".
    Provide strict JSON:
    1. "grammar_point", "meaning", "explanation", "connection".
    2. "examples": Array of 5: [ { "jp", "ruby", "zh" }, ... ]
    **CRITICAL RUBY FORMAT**: For ALL "ruby" fields, you MUST use strict HTML <ruby> tags for Kanji (e.g., <ruby>漢字<rt>かんじ</rt></ruby>). DO NOT output plain text like 漢かん字じ. ALL Chinese in **Traditional**.
    Return JSON ONLY.
  `;
  const responseText = await invokeAIAssistant(supabase, [{ role: 'user', content: promptText }]);
  return parseAIJson(responseText);
}

// MAIN EXECUTION
async function run() {
  const command = process.argv[2]; // 'fetch-new', 'import', or undefined (default auto-sync)

  // 1. Initialize Supabase
  let supabase;
  let userId;

  if (SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });
    userId = USER_ID_CONFIG;
  } else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: SUPABASE_EMAIL,
      password: SUPABASE_PASSWORD
    });
    if (authError) {
      console.error("Authentication failed:", authError.message);
      process.exit(1);
    }
    userId = authData.user.id;
  }

  // Action: IMPORT JSON
  if (command === 'import') {
    const importFilePath = process.argv[3];
    if (!importFilePath) {
      console.error("Please provide the path to the JSON file to import: node scripts/supabase-sync.js import <path>");
      process.exit(1);
    }
    console.log(`=== Importing generated JSON file: ${importFilePath} ===`);
    const fileContent = fs.readFileSync(importFilePath, 'utf8');
    const importItems = JSON.parse(fileContent);

    for (const item of importItems) {
      const { table, row } = item;
      // Set user_id dynamically
      row.user_id = userId;
      if (!row.id) {
        row.id = `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      if (!row.added_at) {
        row.added_at = new Date().toISOString();
      }
      if (row.memorized === undefined) {
        row.memorized = false;
      }

      console.log(`Inserting into [${table}] table: "${row.kanji || row.grammar_point}"...`);
      const { error } = await supabase.from(table).insert(row);
      if (error) {
        console.error(`❌ Failed to insert row:`, error.message);
      } else {
        console.log(`✨ Successfully imported!`);
      }
    }
    console.log("=== Import complete ===");
    return;
  }

  // Fetch Google Sheets CSV
  let csvText;
  try {
    let targetUrl = GOOGLE_SHEET_URL;
    const sheetIdMatch = GOOGLE_SHEET_URL.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (sheetIdMatch) {
      const sheetId = sheetIdMatch[1];
      targetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    }
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    csvText = await response.text();
  } catch (err) {
    console.error("Failed to fetch Google Sheet CSV. Make sure it is shared to 'Anyone with the link can view'.");
    console.error(err);
    process.exit(1);
  }

  // Parse CSV
  const rows = parseCSV(csvText);
  if (rows.length === 0) {
    console.log("Google Sheet is empty. No work to do.");
    return;
  }

  // Headers detection
  const firstRow = rows[0];
  const hasHeaders = firstRow.some(cell => cell.toLowerCase().includes("category") || cell.includes("類別") || cell.toLowerCase().includes("content") || cell.includes("內容"));
  const dataRows = hasHeaders ? rows.slice(1) : rows;

  if (dataRows.length === 0) {
    console.log("Google Sheet is empty or only contains headers. No work to do.");
    return;
  }

  // Fetch existing entries to prevent duplicates
  const { data: existingVocab, error: vocabErr } = await supabase
    .from('vocabulary')
    .select('kanji')
    .eq('user_id', userId);
  if (vocabErr) throw vocabErr;
  const existingVocabSet = new Set(existingVocab.map(v => v.kanji));

  const { data: existingAdjectives, error: adjErr } = await supabase
    .from('adjectives')
    .select('kanji')
    .eq('user_id', userId);
  if (adjErr) throw adjErr;
  const existingAdjSet = new Set(existingAdjectives.map(a => a.kanji));

  const { data: existingGrammar, error: grammarErr } = await supabase
    .from('grammar')
    .select('grammar_point')
    .eq('user_id', userId);
  if (grammarErr) throw grammarErr;
  const existingGrammarSet = new Set(existingGrammar.map(g => g.grammar_point));

  // Process each item
  const newItems = [];
  for (const row of dataRows) {
    if (row.length < 1) continue;
    const rawCategory = row[0] ? row[0].trim() : "";
    const content = row[1] ? row[1].trim() : (row[0] ? row[0].trim() : "");
    if (!content) continue;

    const normalizedCategory = (
      rawCategory.includes("文法") || 
      rawCategory.toLowerCase() === "grammar"
    ) ? "grammar" : "vocab";

    // Duplicate check (Global check across all tables)
    if (existingVocabSet.has(content) || existingAdjSet.has(content) || existingGrammarSet.has(content)) {
      continue;
    }

    newItems.push({ category: normalizedCategory, content });
  }

  // Action: FETCH NEW ITEMS ONLY
  if (command === 'fetch-new') {
    // Output new items as clean JSON so the agent can read and process them
    console.log(JSON.stringify({ newItems }, null, 2));
    return;
  }

  // Default Action: Full auto-sync using Edge Function
  console.log("=== Starting Nihongo Memo Auto-Sync ===");
  console.log(`Time: ${new Date().toLocaleString()}`);
  console.log(`Using CSV URL: ${GOOGLE_SHEET_URL}`);
  console.log(`Found ${dataRows.length} items in Google Sheet.`);

  if (newItems.length === 0) {
    console.log("No new items to import. Sync complete.");
    return;
  }

  console.log(`Ready to sync ${newItems.length} new items:`, newItems.map(i => i.content).join(", "));

  for (const item of newItems) {
    console.log(`\nProcessing [${item.category === "vocab" ? "單字" : "文法"}] : "${item.content}"...`);

    try {
      if (item.category === "vocab") {
        const wordClass = await classifyWord(supabase, item.content);
        console.log(`-> Classified as: ${wordClass}`);

        if (wordClass === "verb") {
          console.log("-> Generating verb details...");
          const details = await generateVerbDetails(supabase, item.content);
          const dbRow = {
            id: `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            kanji: details.kanji,
            kana: details.kana,
            meaning: details.meaning,
            type: details.type || '動詞',
            transitivity: details.transitivity,
            verb_group: details.verb_group,
            conjugations: details.conjugations,
            examples: details.examples,
            added_at: new Date().toISOString(),
            memorized: false,
            user_id: userId
          };
          const { error } = await supabase.from('vocabulary').insert(dbRow);
          if (error) throw error;
          console.log(`✨ Successfully imported Verb "${details.kanji}".`);

        } else if (wordClass === "adjective") {
          console.log("-> Generating adjective details...");
          const details = await generateAdjectiveDetails(supabase, item.content);
          const dbRow = {
            id: `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            kanji: details.kanji,
            kana: details.kana,
            meaning: details.meaning,
            type: details.type,
            conjugations: details.conjugations,
            examples: details.examples,
            added_at: new Date().toISOString(),
            memorized: false,
            user_id: userId
          };
          const { error } = await supabase.from('adjectives').insert(dbRow);
          if (error) throw error;
          console.log(`✨ Successfully imported Adjective "${details.kanji}".`);

        } else {
          console.log("-> Generating dictionary lookup for noun/other...");
          const details = await generateDictionaryLookup(supabase, item.content);
          const dbRow = {
            id: `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            kanji: details.word || item.content,
            kana: details.kana,
            meaning: details.meaning,
            type: '名詞',
            transitivity: null,
            verb_group: null,
            conjugations: { explanation: details.explanation },
            examples: details.examples,
            added_at: new Date().toISOString(),
            memorized: false,
            user_id: userId
          };
          const { error } = await supabase.from('vocabulary').insert(dbRow);
          if (error) throw error;
          console.log(`✨ Successfully imported Noun "${dbRow.kanji}".`);
        }
      } else {
        console.log("-> Generating grammar details...");
        const details = await generateGrammarDetails(supabase, item.content);
        const dbRow = {
          id: `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          grammar_point: details.grammar_point || item.content,
          meaning: details.meaning,
          explanation: details.explanation,
          connection: details.connection,
          examples: details.examples,
          is_comparison: details.is_comparison || false,
          comparison_analysis: details.comparison_analysis || null,
          items: details.items || null,
          added_at: new Date().toISOString(),
          memorized: false,
          user_id: userId
        };
        const { error } = await supabase.from('grammar').insert(dbRow);
        if (error) throw error;
        console.log(`✨ Successfully imported Grammar point "${dbRow.grammar_point}".`);
      }
    } catch (err) {
      console.error(`❌ Failed to import "${item.content}":`, err.message);
    }
  }

  console.log("\n=== Auto-Sync Finished successfully! ===");
}

run().catch(err => {
  console.error("Unexpected sync script failure:", err);
  process.exit(1);
});
