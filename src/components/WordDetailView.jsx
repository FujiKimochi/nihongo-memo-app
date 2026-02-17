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
            {word.conjugations ? (
                <div className="mb-8 p-5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl shadow-lg border border-indigo-400/20">
                    <h4 className="flex items-center gap-2 font-bold mb-3 text-indigo-100 uppercase tracking-wider text-xs">
                        <Volume2 size={16} /> 動詞變化表
                    </h4>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm text-left text-indigo-100">
                            <thead className="text-xs text-indigo-200 uppercase bg-indigo-800/30">
                                <tr>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">變化形</th>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">日文</th>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">日文例句</th>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">中文翻譯</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-indigo-500/30">
                                {Object.entries(word.conjugations).map(([key, data]) => (
                                    <tr key={key} className="border-b border-indigo-500/30 hover:bg-indigo-600/50 transition-colors">
                                        <td className="px-4 py-2 font-bold text-white whitespace-nowrap">
                                            {CONJUGATION_MAP[key] || data.explanation || key}
                                        </td>
                                        <td className="px-4 py-2 font-medium text-indigo-50 whitespace-nowrap">
                                            {data.form}
                                        </td>
                                        <td className="px-4 py-2 text-indigo-100 whitespace-nowrap">
                                            {renderExample(data.example)}
                                        </td>
                                        <td className="px-4 py-2 text-indigo-300 whitespace-nowrap">
                                            {data.example ? data.example.zh : <span className="opacity-50">-</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-2 text-xs text-indigo-300 opacity-75 text-right">
                        * 向右滑動查看更多
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    尚無詳細變化資料
                    <div className="text-xs mt-2">請嘗試刪除此單字並重新新增</div>
                </div>
            )}
        </div>
    );
}
