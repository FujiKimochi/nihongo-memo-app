import { useState, useEffect } from 'react';
import { dialogueSupabaseService, getSupabaseClient } from '../services/supabase';

const STORAGE_KEY = 'nihongo-memo-dialogue-data';

export function useDialogues() {
    const [dialogues, setDialogues] = useState(() => {
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
                const cloudItems = await dialogueSupabaseService.fetchAll();
                if (cloudItems) {
                    setDialogues(cloudItems);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudItems));
                }
            } catch (err) {
                console.error('Initial dialogue sync failed:', err);
            } finally {
                setIsSyncing(false);
            }
        };

        syncFromCloud();
    }, []);

    const addDialogue = async (newDialogue) => {
        const item = {
            id: Date.now().toString(),
            scenario: newDialogue.scenario,
            description: newDialogue.description,
            dialogueData: newDialogue.dialogues,
            addedAt: new Date().toISOString(),
            memorized: false,
        };

        const updated = [item, ...dialogues];
        setDialogues(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        try {
            await dialogueSupabaseService.upsert(item);
        } catch (err) {
            console.error('Failed to sync dialogue to cloud:', err);
        }
    };

    const deleteDialogue = async (id) => {
        const updated = dialogues.filter(item => item.id !== id);
        setDialogues(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        try {
            await dialogueSupabaseService.delete(id);
        } catch (err) {
            console.error('Failed to delete dialogue from cloud:', err);
        }
    };

    const toggleMemorized = async (id) => {
        let target = null;
        const updated = dialogues.map(item => {
            if (item.id === id) {
                target = { ...item, memorized: !item.memorized };
                return target;
            }
            return item;
        });

        setDialogues(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        if (target) {
            try {
                await dialogueSupabaseService.upsert(target);
            } catch (err) {
                console.error('Failed to sync dialogue status to cloud:', err);
            }
        }
    };

    return { dialogues, addDialogue, deleteDialogue, toggleMemorized, isSyncing };
}
