import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, X, Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { WordDetailView } from './WordDetailView';

export function FlashcardDeck({ words }) {
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [finished, setFinished] = useState(false);
    const { speak } = useSpeech();

    // Initialize queue
    useEffect(() => {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        setQueue(shuffled);
    }, [words]);

    const currentWord = queue[currentIndex];

    const handleNext = (known) => {
        setIsFlipped(false);
        setTimeout(() => {
            if (currentIndex < queue.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setFinished(true);
            }
        }, 200);
    };

    const restart = () => {
        setFinished(false);
        setCurrentIndex(0);
        setIsFlipped(false);
        setQueue([...words].sort(() => Math.random() - 0.5));
    };

    if (words.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center" style={{ color: 'var(--text-muted)' }}>
                <p>還沒有單字喔，先去新增一些吧！</p>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎉 複習完成！</h2>
                <button onClick={restart} className="btn btn-primary">
                    <RotateCcw size={20} />
                    再複習一次
                </button>
            </div>
        );
    }

    if (!currentWord) return null;

    return (
        <div className="flex flex-col items-center h-full max-h-screen overflow-hidden" style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem', flexShrink: 0 }}>
                {currentIndex + 1} / {queue.length}
            </div>

            {/* Card Container */}
            <div
                className="glass-card"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    width: '100%',
                    maxWidth: '1600px', // Full width for desktop
                    flex: 1, // Allow card to take available space
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    background: isFlipped ? 'white' : 'rgba(255,255,255,0.8)',
                    transition: 'transform 0.3s',
                    overflow: 'hidden', // Contain content
                    marginBottom: '1rem' // Space for buttons
                }}
            >
                {/* content-wrapper to handle scrolling within the card */}
                <div className="w-full h-full overflow-y-auto custom-scrollbar">

                    {/* Front */}
                    <div style={{
                        display: isFlipped ? 'none' : 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100%',
                        padding: '2rem',
                        textAlign: 'center'
                    }}>
                        <div className="mb-8">
                            <ruby style={{ fontSize: '4rem', fontWeight: 700 }}>
                                {currentWord.kanji}
                                <rt style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 400 }}>{currentWord.kana}</rt>
                            </ruby>
                        </div>

                        <div style={{ color: 'var(--sakura-500)', fontSize: '0.875rem', marginTop: 'auto' }}>
                            (點擊查看詳細解析)
                        </div>
                    </div>

                    {/* Back */}
                    <div style={{
                        display: isFlipped ? 'block' : 'none',
                        padding: '1.5rem',
                        textAlign: 'left'
                    }}>
                        <WordDetailView word={currentWord} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 w-full max-w-[1600px] justify-center flex-shrink-0 z-10 bg-gradient-to-t from-white via-white to-transparent pt-2">
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                    className="btn flex-1 py-4 text-base shadow-lg border-gray-200"
                    style={{ background: '#fff', color: '#6b7280' }}
                >
                    <X size={20} /> 還在學習
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                    className="btn btn-primary flex-1 py-4 text-base shadow-lg shadow-indigo-200"
                >
                    <Check size={20} /> 記住了
                </button>
            </div>
        </div>
    );
}
