import { useCallback } from 'react';

export function useSpeech() {
    const speak = useCallback((text) => {
        if (!window.speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';

        // Optional: Try to find a Japanese voice
        // Note: voices are loaded asynchronously, so this might not always pick the best one immediately on first load
        const voices = window.speechSynthesis.getVoices();
        const japaneseVoice = voices.find(voice => voice.lang.includes('ja'));
        if (japaneseVoice) {
            utterance.voice = japaneseVoice;
        }

        window.speechSynthesis.speak(utterance);
    }, []);

    return { speak };
}
