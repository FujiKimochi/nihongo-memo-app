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
            meaning: newGrammar.meaning || '',
            explanation: newGrammar.explanation || '',
            connection: newGrammar.connection || '',
            examples: newGrammar.examples || [],
            // New comparison fields
            is_comparison: newGrammar.is_comparison || false,
            comparison_analysis: newGrammar.comparison_analysis || '',
            items: newGrammar.items || [],
            addedAt: new Date().toISOString(),
            memorized: false,
        };

        setGrammarItems(prev => {
            const updated = [item, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        try {
            await grammarSupabaseService.upsert(item);
        } catch (err) {
            console.error('Failed to sync grammar to cloud:', err);
        }
    };

    const deleteGrammar = async (id) => {
        setGrammarItems(prev => {
            const updated = prev.filter(item => item.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        try {
            await grammarSupabaseService.delete(id);
        } catch (err) {
            console.error('Failed to delete grammar from cloud:', err);
        }
    };

    const toggleMemorized = async (id) => {
        let target = null;
        setGrammarItems(prev => {
            const updated = prev.map(item => {
                if (item.id === id) {
                    target = { ...item, memorized: !item.memorized };
                    return target;
                }
                return item;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

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
