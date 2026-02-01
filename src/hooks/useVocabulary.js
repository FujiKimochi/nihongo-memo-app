import { useState, useEffect, useCallback } from 'react';
import { supabaseService, getSupabaseClient } from '../services/supabase';

const STORAGE_KEY = 'nihongo-memo-data';

export function useVocabulary() {
    const [words, setWords] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [isSyncing, setIsSyncing] = useState(false);

    // Initial sync from cloud
    useEffect(() => {
        const syncFromCloud = async () => {
            const client = getSupabaseClient();
            if (!client) return;

            try {
                setIsSyncing(true);
                const cloudWords = await supabaseService.fetchAll();
                if (cloudWords) {
                    setWords(cloudWords);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudWords));
                }
            } catch (err) {
                console.error('Initial sync failed:', err);
            } finally {
                setIsSyncing(false);
            }
        };

        syncFromCloud();
    }, []);

    // Save to local & cloud when words change
    // Note: We avoid an infinite loop by only triggering cloud save on explicit actions
    // to avoid cycles if syncFromCloud updates the state.

    const addWord = async (newWord) => {
        const wordEntry = {
            id: Date.now().toString(),
            kanji: newWord.kanji,
            kana: newWord.kana,
            meaning: newWord.meaning,
            example: newWord.example,
            type: newWord.type,
            conjugations: newWord.conjugations,
            examples: newWord.examples,
            addedAt: new Date().toISOString(),
            memorized: false,
        };

        const updatedWords = [wordEntry, ...words];
        setWords(updatedWords);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));

        try {
            await supabaseService.upsert(wordEntry);
        } catch (err) {
            console.error('Failed to sync new word to cloud:', err);
        }
    };

    const deleteWord = async (id) => {
        const updatedWords = words.filter(w => w.id !== id);
        setWords(updatedWords);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));

        try {
            await supabaseService.delete(id);
        } catch (err) {
            console.error('Failed to delete word from cloud:', err);
        }
    };

    const toggleMemorized = async (id) => {
        let targetWord = null;
        const updatedWords = words.map(w => {
            if (w.id === id) {
                targetWord = { ...w, memorized: !w.memorized };
                return targetWord;
            }
            return w;
        });

        setWords(updatedWords);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));

        if (targetWord) {
            try {
                await supabaseService.upsert(targetWord);
            } catch (err) {
                console.error('Failed to sync memorized status to cloud:', err);
            }
        }
    };

    return { words, addWord, deleteWord, toggleMemorized, isSyncing };
}
