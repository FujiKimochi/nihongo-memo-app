import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, X, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

// Hardcoded mapping for reliable localization
const CONJUGATION_MAP = {
    "polite": "丁寧語 (禮貌形)",
    "negative": "否定形 (ない形)",
    "te": "て形 (連接)",
    "potential": "可能形 (能...)",
    "passive": "被動形 (被...)",
    "causative": "使役形 (讓...)",
    "causativePassive": "使役被動 (被迫...)",
    "imperative": "命令形 (命令)",
    "volitional": "意向形 (吧/打算)",
    "conditionalBa": "假定形 (ば)",
    "conditionalTara": "假定形 (たら)",
    "dictionary": "辭書形 (原形)"
};

// Helper to render Japanese example, prioritizing ruby if available
const renderExample = (example) => {
    if (!example) return <span className="text-gray-300">-</span>;
    if (example.ruby) {
        return <span dangerouslySetInnerHTML={{ __html: example.ruby }} />;
    }
    return example.jp;
};

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
                        <div className="flex items-start justify-between mb-6 border-b pb-4">
                            <div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: '0.75rem', lineHeight: 1.2 }}>
                                    {currentWord.kanji}
                                    <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>{currentWord.kana}</span>
                                </h3>
                                <div style={{ fontSize: '1.25rem', color: 'hsl(var(--indigo-600))', fontWeight: 600, marginTop: '0.25rem' }}>
                                    {currentWord.meaning}
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    speak(currentWord.kanji);
                                }}
                                className="btn-ghost p-3 rounded-full hover:bg-indigo-50"
                                style={{ color: 'hsl(var(--indigo-500))' }}
                            >
                                <Volume2 size={28} />
                            </button>
                        </div>

                        {/* Conjugation Table */}
                        <div className="w-full">
                            {currentWord.conjugations ? (
                                <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
                                    <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className=" text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">變化形</th>
                                            <th className=" text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">日文</th>
                                            <th className=" text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">日文例句</th>
                                            <th className=" text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">中文翻譯</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {Object.entries(currentWord.conjugations).map(([key, data]) => (
                                            <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-3 font-medium text-gray-600 whitespace-nowrap" style={{ verticalAlign: 'middle' }}>
                                                    {CONJUGATION_MAP[key] || data.explanation || key}
                                                </td>
                                                <td className="p-3 font-bold text-indigo-600 whitespace-nowrap" style={{ verticalAlign: 'middle' }}>
                                                    {data.form}
                                                </td>
                                                <td className="p-3 text-xs whitespace-nowrap text-gray-900 font-medium" style={{ verticalAlign: 'middle' }}>
                                                    {renderExample(data.example)}
                                                </td>
                                                <td className="p-3 text-xs whitespace-nowrap text-gray-500" style={{ verticalAlign: 'middle' }}>
                                                    {data.example ? data.example.zh : <span className="text-gray-300">-</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg">
                                    尚無詳細變化資料
                                    <div className="text-xs mt-2">請嘗試刪除此單字並重新新增</div>
                                </div>
                            )}
                        </div>

                        {/* Mobile-only note for horizontal scroll if needed, though we use flex-col for examples now */}
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
