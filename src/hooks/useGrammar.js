import { useState, useEffect } from 'react';
import { grammarSupabaseService, getSupabaseClient } from '../services/supabase';

const STORAGE_KEY = 'nihongo-memo-grammar-data';

export function useGrammar() {
    const [grammarItems, setGrammarItems] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const syncFromCloud = async () => {
            const client = getSupabaseClient();
            if (!client) return;

            try {
                setIsSyncing(true);
                const cloudItems = await grammarSupabaseService.fetchAll();
                if (cloudItems) {
                    setGrammarItems(cloudItems);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudItems));
                }
            } catch (err) {
                console.error('Initial grammar sync failed:', err);
            } finally {
                setIsSyncing(false);
            }
        };

        syncFromCloud();
    }, []);

    const addGrammar = async (newGrammar) => {
        const item = {
            id: Date.now().toString(),
            grammarPoint: newGrammar.grammar_point,
            meaning: newGrammar.meaning,
            explanation: newGrammar.explanation,
            connection: newGrammar.connection,
            examples: newGrammar.examples,
            addedAt: new Date().toISOString(),
            memorized: false,
        };

        const updated = [item, ...grammarItems];
        setGrammarItems(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        try {
            await grammarSupabaseService.upsert(item);
        } catch (err) {
            console.error('Failed to sync grammar to cloud:', err);
        }
    };

    const deleteGrammar = async (id) => {
        const updated = grammarItems.filter(item => item.id !== id);
        setGrammarItems(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        try {
            await grammarSupabaseService.delete(id);
        } catch (err) {
            console.error('Failed to delete grammar from cloud:', err);
        }
    };

    const toggleMemorized = async (id) => {
        let target = null;
        const updated = grammarItems.map(item => {
            if (item.id === id) {
                target = { ...item, memorized: !item.memorized };
                return target;
            }
            return item;
        });

        setGrammarItems(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        if (target) {
            try {
                await grammarSupabaseService.upsert(target);
            } catch (err) {
                console.error('Failed to sync grammar status to cloud:', err);
            }
        }
    };

    return { grammarItems, addGrammar, deleteGrammar, toggleMemorized, isSyncing };
}
