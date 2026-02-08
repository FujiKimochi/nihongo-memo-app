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

        setWords(prev => {
            const updated = [wordEntry, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        try {
            await supabaseService.upsert(wordEntry);
        } catch (err) {
            console.error('Failed to sync new word to cloud:', err);
        }
    };

    const addWords = async (newWords) => {
        const entries = newWords.map((w, index) => ({
            id: (Date.now() + index).toString(),
            kanji: w.kanji,
            kana: w.kana,
            meaning: w.meaning,
            example: w.example,
            type: w.type,
            conjugations: w.conjugations,
            examples: w.examples,
            addedAt: new Date().toISOString(),
            memorized: false,
        }));

        setWords(prev => {
            const updated = [...entries, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        // Sync each to cloud (could be optimized further if supabaseService.upsert supported array)
        try {
            for (const entry of entries) {
                await supabaseService.upsert(entry);
            }
        } catch (err) {
            console.error('Failed to batch sync words to cloud:', err);
        }
    };

    const deleteWord = async (id) => {
        setWords(prev => {
            const updated = prev.filter(w => w.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        try {
            await supabaseService.delete(id);
        } catch (err) {
            console.error('Failed to delete word from cloud:', err);
        }
    };

    const toggleMemorized = async (id) => {
        let targetWord = null;
        setWords(prev => {
            const updated = prev.map(w => {
                if (w.id === id) {
                    targetWord = { ...w, memorized: !w.memorized };
                    return targetWord;
                }
                return w;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        if (targetWord) {
            try {
                await supabaseService.upsert(targetWord);
            } catch (err) {
                console.error('Failed to sync memorized status to cloud:', err);
            }
        }
    };

    return { words, addWord, addWords, deleteWord, toggleMemorized, isSyncing };
}
