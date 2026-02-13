import { createClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'nihongo-memo-supabase-url';
const STORAGE_KEY_KEY = 'nihongo-memo-supabase-key';

export const getSupabaseConfig = () => ({
    url: localStorage.getItem(STORAGE_KEY_URL) || '',
    key: localStorage.getItem(STORAGE_KEY_KEY) || ''
});

export const setSupabaseConfig = (url, key) => {
    localStorage.setItem(STORAGE_KEY_URL, url);
    localStorage.setItem(STORAGE_KEY_KEY, key);
};

let supabaseClient = null;

export const getSupabaseClient = () => {
    const { url, key } = getSupabaseConfig();
    if (!url || !key) return null;

    if (!supabaseClient) {
        supabaseClient = createClient(url, key, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }
    return supabaseClient;
};

export const onAuthStateChange = (callback) => {
    const client = getSupabaseClient();
    if (!client) return { data: { subscription: null } };
    return client.auth.onAuthStateChange(callback);
};

// Map DB row to local word object
const mapFromDb = (row) => ({
    id: row.id,
    kanji: row.kanji,
    kana: row.kana,
    meaning: row.meaning,
    type: row.type,
    conjugations: row.conjugations,
    examples: row.examples,
    addedAt: row.added_at,
    memorized: row.memorized
});

// Map local word to DB row
const mapToDb = (word) => ({
    id: word.id,
    kanji: word.kanji,
    kana: word.kana,
    meaning: word.meaning,
    type: word.type,
    conjugations: word.conjugations,
    examples: word.examples,
    added_at: word.addedAt,
    memorized: word.memorized
});

export const supabaseService = {
    async fetchAll() {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data, error } = await client
            .from('vocabulary')
            .select('*')
            .order('added_at', { ascending: false });

        if (error) throw error;
        return data.map(mapFromDb);
    },

    async upsert(word) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data: { user } } = await client.auth.getUser();
        if (!user) return null;

        const { error } = await client
            .from('vocabulary')
            .upsert({ ...mapToDb(word), user_id: user.id });

        if (error) throw error;
    },

    async delete(id) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { error } = await client
            .from('vocabulary')
            .delete()
            .match({ id });

        if (error) throw error;
    }
};

export const grammarSupabaseService = {
    async fetchAll() {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data, error } = await client
            .from('grammar')
            .select('*')
            .order('added_at', { ascending: false });

        if (error) throw error;
        return data.map(row => ({
            id: row.id,
            grammarPoint: row.grammar_point,
            meaning: row.meaning,
            explanation: row.explanation,
            connection: row.connection,
            examples: row.examples,
            is_comparison: row.is_comparison,
            comparison_analysis: row.comparison_analysis,
            items: row.items,
            addedAt: row.added_at,
            memorized: row.memorized
        }));
    },

    async upsert(item) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data: { user } } = await client.auth.getUser();
        if (!user) return null;

        const { error } = await client
            .from('grammar')
            .upsert({
                id: item.id,
                grammar_point: item.grammarPoint,
                meaning: item.meaning,
                explanation: item.explanation,
                connection: item.connection,
                examples: item.examples,
                is_comparison: item.is_comparison,
                comparison_analysis: item.comparison_analysis,
                items: item.items,
                added_at: item.addedAt,
                memorized: item.memorized,
                user_id: user.id
            });

        if (error) throw error;
    },

    async delete(id) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { error } = await client
            .from('grammar')
            .delete()
            .match({ id });

        if (error) throw error;
    }
};

export const dialogueSupabaseService = {
    async fetchAll() {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data, error } = await client
            .from('dialogues')
            .select('*')
            .order('added_at', { ascending: false });

        if (error) throw error;

        return data.map(row => ({
            id: row.id,
            scenario: row.scenario,
            description: row.description,
            dialogueData: row.dialogue_data,
            addedAt: row.added_at,
            memorized: row.memorized
        }));
    },

    async upsert(item) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data: { user } } = await client.auth.getUser();
        if (!user) return null;

        const { error } = await client
            .from('dialogues')
            .upsert({
                id: item.id,
                scenario: item.scenario,
                description: item.description,
                dialogue_data: item.dialogueData,
                added_at: item.addedAt,
                memorized: item.memorized,
                user_id: user.id
            });

        if (error) throw error;
    },

    async delete(id) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { error } = await client
            .from('dialogues')
            .delete()
            .match({ id });

        if (error) throw error;
    }
};

export const adjectiveSupabaseService = {
    async fetchAll() {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data, error } = await client
            .from('adjectives')
            .select('*')
            .order('added_at', { ascending: false });

        if (error) throw error;

        return data.map(row => ({
            id: row.id,
            kanji: row.kanji,
            kana: row.kana,
            meaning: row.meaning,
            type: row.type,
            conjugations: row.conjugations,
            examples: row.examples,
            addedAt: row.added_at,
            memorized: row.memorized
        }));
    },

    async upsert(item) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data: { user } } = await client.auth.getUser();
        if (!user) return null;

        const { error } = await client
            .from('adjectives')
            .upsert({
                id: item.id,
                kanji: item.kanji,
                kana: item.kana,
                meaning: item.meaning,
                type: item.type,
                conjugations: item.conjugations,
                examples: item.examples,
                added_at: item.addedAt,
                memorized: item.memorized,
                user_id: user.id
            });

        if (error) throw error;
    },

    async delete(id) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { error } = await client
            .from('adjectives')
            .delete()
            .match({ id });

        if (error) throw error;
    }
};

export const settingsSupabaseService = {
    async fetchSettings() {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data: { user } } = await client.auth.getUser();
        if (!user) return null;

        const { data, error } = await client
            .from('user_settings')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
        return data;
    },

    async upsertSettings(settings) {
        const client = getSupabaseClient();
        if (!client) return null;

        const { data: { user } } = await client.auth.getUser();
        if (!user) return null;

        const { error } = await client
            .from('user_settings')
            .upsert({
                user_id: user.id,
                gemini_api_key: settings.geminiApiKey,
                ai_model: settings.aiModel,
                updated_at: new Date().toISOString()
            });

        if (error) throw error;
    }
};
