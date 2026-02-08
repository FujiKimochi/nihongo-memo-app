import { useState, useEffect } from 'react';
import { adjectiveSupabaseService } from '../services/supabase';

const STORAGE_KEY = 'nihongo-memo-adjectives';

export function useAdjectives() {
    const [adjectives, setAdjectives] = useState([]);

    useEffect(() => {
        const loadAdjectives = async () => {
            // Load from LocalStorage first
            const local = localStorage.getItem(STORAGE_KEY);
            if (local) {
                setAdjectives(JSON.parse(local));
            }

            // Sync from Supabase
            try {
                const cloudData = await adjectiveSupabaseService.fetchAll();
                if (cloudData) {
                    setAdjectives(cloudData);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
                }
            } catch (error) {
                console.error("Supabase load failed:", error);
            }
        };

        loadAdjectives();
    }, []);

    const addAdjective = async (adjective) => {
        const newAdj = {
            ...adjective,
            id: adjective.id || crypto.randomUUID(),
            addedAt: new Date().toISOString(),
            memorized: false
        };

        setAdjectives(prev => {
            const updated = [newAdj, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        try {
            await adjectiveSupabaseService.upsert(newAdj);
        } catch (error) {
            console.error("Supabase sync failed:", error);
        }
    };

    const addAdjectives = async (newAdjectives) => {
        const itemsWithMeta = newAdjectives.map(adj => ({
            ...adj,
            id: adj.id || crypto.randomUUID(),
            addedAt: new Date().toISOString(),
            memorized: false
        }));

        setAdjectives(prev => {
            const updated = [...itemsWithMeta, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        // Batch upsert to Supabase
        try {
            for (const item of itemsWithMeta) {
                await adjectiveSupabaseService.upsert(item);
            }
        } catch (error) {
            console.error("Supabase batch sync failed:", error);
        }
    };

    const deleteAdjective = async (id) => {
        setAdjectives(prev => {
            const updated = prev.filter(a => a.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        try {
            await adjectiveSupabaseService.delete(id);
        } catch (error) {
            console.error("Supabase sync failed:", error);
        }
    };

    const toggleMemorized = async (id) => {
        let target = null;
        setAdjectives(prev => {
            const updated = prev.map(a => {
                if (a.id === id) {
                    target = { ...a, memorized: !a.memorized };
                    return target;
                }
                return a;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });

        if (target) {
            try {
                await adjectiveSupabaseService.upsert(target);
            } catch (error) {
                console.error("Supabase sync failed:", error);
            }
        }
    };

    return {
        adjectives,
        addAdjective,
        addAdjectives,
        deleteAdjective,
        toggleMemorized
    };
}
