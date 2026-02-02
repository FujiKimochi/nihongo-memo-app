import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, X, BookOpen, Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { GrammarDetailView } from './GrammarDetailView';

export function GrammarFlashcards({ items }) {
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [finished, setFinished] = useState(false);
    const { speak } = useSpeech();

    useEffect(() => {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        setQueue(shuffled);
    }, [items]);

    const currentItem = queue[currentIndex];

    const handleNext = () => {
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
        setQueue([...items].sort(() => Math.random() - 0.5));
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center" style={{ color: 'var(--text-muted)' }}>
                <p>還沒有文法喔，先去新增一些吧！</p>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
                <div className="bg-indigo-50 p-6 rounded-full mb-6">
                    <BookOpen size={48} className="text-indigo-500" />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>🎉 文法複習完成！</h2>
                <button onClick={restart} className="btn btn-primary">
                    <RotateCcw size={20} />
                    再複習一次
                </button>
            </div>
        );
    }

    if (!currentItem) return null;

    return (
        <div className="flex flex-col items-center h-full max-h-screen overflow-hidden" style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem', flexShrink: 0 }}>
                {currentIndex + 1} / {queue.length}
            </div>

            <div
                className="glass-card"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    width: '100%',
                    maxWidth: '1600px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    background: isFlipped ? 'white' : 'rgba(255,255,255,0.8)',
                    transition: 'transform 0.3s',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                }}
            >
                <div className="w-full h-full overflow-y-auto custom-scrollbar">
                    {!isFlipped ? (
                        <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
                            <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">GRAMMAR POINT</div>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--indigo-600)', lineHeight: 1.2 }}>
                                {currentItem.grammarPoint}
                            </h2>
                            <div className="mt-12 text-sakura-400 text-sm animate-pulse">
                                (點擊查看詳細解析與例句)
                            </div>
                        </div>
                    ) : (
                        <div className="p-6">
                            <GrammarDetailView grammar={currentItem} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4 w-full max-w-[1600px] justify-center flex-shrink-0 z-10 pt-2">
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="btn flex-1 py-4 text-base shadow-lg border-gray-200"
                    style={{ background: '#fff', color: '#6b7280' }}
                >
                    <X size={20} /> 待加強
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="btn btn-primary flex-1 py-4 text-base shadow-lg shadow-indigo-200"
                >
                    <Check size={20} /> 記住了
                </button>
            </div>
        </div>
    );
}
