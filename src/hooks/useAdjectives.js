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

        const updated = [newAdj, ...adjectives];
        setAdjectives(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        try {
            await adjectiveSupabaseService.upsert(newAdj);
        } catch (error) {
            console.error("Supabase sync failed:", error);
        }
    };

    const deleteAdjective = async (id) => {
        const updated = adjectives.filter(a => a.id !== id);
        setAdjectives(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        try {
            await adjectiveSupabaseService.delete(id);
        } catch (error) {
            console.error("Supabase sync failed:", error);
        }
    };

    const toggleMemorized = async (id) => {
        const updated = adjectives.map(a =>
            a.id === id ? { ...a, memorized: !a.memorized } : a
        );
        setAdjectives(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        const target = updated.find(a => a.id === id);
        try {
            await adjectiveSupabaseService.upsert(target);
        } catch (error) {
            console.error("Supabase sync failed:", error);
        }
    };

    return {
        adjectives,
        addAdjective,
        deleteAdjective,
        toggleMemorized
    };
}
