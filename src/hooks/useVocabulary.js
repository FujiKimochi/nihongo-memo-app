import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nihongo-memo-data';

export function useVocabulary() {
    const [words, setWords] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    }, [words]);

    const addWord = (newWord) => {
        const wordEntry = {
            id: Date.now().toString(),
            kanji: newWord.kanji,
            kana: newWord.kana,
            meaning: newWord.meaning,
            example: newWord.example, // Legacy simple example
            type: newWord.type,
            conjugations: newWord.conjugations, // New AI Data
            examples: newWord.examples, // New AI Data
            addedAt: new Date().toISOString(),
            memorized: false,
        };
        setWords(prev => [wordEntry, ...prev]);
    };

    const deleteWord = (id) => {
        setWords(prev => prev.filter(w => w.id !== id));
    };

    const toggleMemorized = (id) => {
        setWords(prev => prev.map(w =>
            w.id === id ? { ...w, memorized: !w.memorized } : w
        ));
    };

    return { words, addWord, deleteWord, toggleMemorized };
}
