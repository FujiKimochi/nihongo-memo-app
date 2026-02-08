import React from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export const ADJ_CONJUGATION_MAP = {
    "negative": "否定形 (ない)",
    "past": "過去形 (た)",
    "pastNegative": "過去否定形 (なかった)",
    "polite": "丁寧語 (禮貌形)",
    "politeNegative": "丁寧語否定",
    "te": "て形 (中連)",
    "adverb": "副詞用法"
};

export function AdjectiveDetailView({ adjective, showHeader = true }) {
    const { speak } = useSpeech();

    if (!adjective) return null;

    const typeLabel = {
        'i-adj': 'い形容詞',
        'na-adj': 'な形容詞',
        'adv': '副詞'
    }[adjective.type] || adjective.type;

    return (
        <div className="w-full animate-fade-in" style={{ textAlign: 'left' }}>
            {showHeader && (
                <div className="flex items-start justify-between mb-6 border-b pb-4">
                    <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: '0.75rem', lineHeight: 1.2 }}>
                            {adjective.kanji}
                            <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>{adjective.kana}</span>
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${adjective.type === 'adv' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                                }`}>
                                {typeLabel}
                            </div>
                            <div style={{ fontSize: '1.25rem', color: 'hsl(var(--indigo-600))', fontWeight: 600 }}>
                                {adjective.meaning}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            speak(adjective.kanji);
                        }}
                        className="btn-ghost p-3 rounded-full hover:bg-indigo-50"
                        style={{ color: 'hsl(var(--indigo-500))' }}
                    >
                        <Volume2 size={28} />
                    </button>
                </div>
            )}

            {adjective.conjugations ? (
                <div className="w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">變化形</th>
                                <th className="text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">日文</th>
                                <th className="text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">例句</th>
                                <th className="text-gray-500 font-semibold p-3 text-left border-b whitespace-nowrap">中文翻譯</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Object.entries(adjective.conjugations).map(([key, data]) => (
                                <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-3 font-medium text-gray-600 whitespace-nowrap">
                                        {ADJ_CONJUGATION_MAP[key] || key}
                                    </td>
                                    <td className="p-3 font-bold text-indigo-600 whitespace-nowrap">
                                        {data.form}
                                    </td>
                                    <td className="p-3 text-xs text-gray-900 font-medium">
                                        {data.example?.ruby ? (
                                            <span dangerouslySetInnerHTML={{ __html: data.example.ruby }} />
                                        ) : (
                                            data.example?.jp || <span className="text-gray-300">-</span>
                                        )}
                                    </td>
                                    <td className="p-3 text-xs text-gray-500">
                                        {data.example?.zh || <span className="text-gray-300">-</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="space-y-4">
                    {!showHeader && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {typeLabel}
                            </div>
                            <div className="font-bold text-gray-700">{adjective.meaning}</div>
                        </div>
                    )}
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-tighter">例句範例</div>
                        <div className="space-y-3">
                            {adjective.examples?.map((ex, i) => (
                                <div key={i} className="border-l-2 border-indigo-200 pl-3">
                                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                                        {ex.ruby ? <span dangerouslySetInnerHTML={{ __html: ex.ruby }} /> : ex.jp}
                                    </div>
                                    <div className="text-xs text-gray-500">{ex.zh || ex.chinese}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
