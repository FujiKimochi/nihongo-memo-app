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

    // Only re-create if config changed or not exists
    if (!supabaseClient) {
        supabaseClient = createClient(url, key);
    }
    return supabaseClient;
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

        const { error } = await client
            .from('vocabulary')
            .upsert(mapToDb(word));

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
