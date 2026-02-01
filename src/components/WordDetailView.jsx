import React from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

// Hardcoded mapping for reliable localization
export const CONJUGATION_MAP = {
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
export const renderExample = (example) => {
    if (!example) return <span className="text-gray-300">-</span>;
    if (example.ruby) {
        return <span dangerouslySetInnerHTML={{ __html: example.ruby }} />;
    }
    return example.jp;
};

export function WordDetailView({ word, showHeader = true }) {
    const { speak } = useSpeech();

    if (!word) return null;

    return (
        <div className="w-full animate-fade-in" style={{ textAlign: 'left' }}>
            {showHeader && (
                <div className="flex items-start justify-between mb-6 border-b pb-4">
                    <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: '0.75rem', lineHeight: 1.2 }}>
                            {word.kanji}
                            <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>{word.kana}</span>
                        </h3>
                        <div style={{ fontSize: '1.25rem', color: 'hsl(var(--indigo-600))', fontWeight: 600, marginTop: '0.25rem' }}>
                            {word.meaning}
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            speak(word.kanji);
                        }}
                        className="btn-ghost p-3 rounded-full hover:bg-indigo-50"
                        style={{ color: 'hsl(var(--indigo-500))' }}
                    >
                        <Volume2 size={28} />
                    </button>
                </div>
            )}

            {/* Conjugation Table */}
            <div className="w-full overflow-x-auto custom-scrollbar">
                {word.conjugations ? (
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
                            {Object.entries(word.conjugations).map(([key, data]) => (
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
                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                        尚無詳細變化資料
                        <div className="text-xs mt-2">請嘗試刪除此單字並重新新增</div>
                    </div>
                )}
            </div>
        </div>
    );
}
