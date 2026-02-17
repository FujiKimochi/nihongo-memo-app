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
                <div className="mb-8 p-5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl shadow-lg border border-indigo-400/20">
                    <h4 className="flex items-center gap-2 font-bold mb-3 text-indigo-100 uppercase tracking-wider text-xs">
                        <Volume2 size={16} /> 形容詞變化表
                    </h4>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm text-left text-indigo-100">
                            <thead className="text-xs text-indigo-200 uppercase bg-indigo-800/30">
                                <tr>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">變化形</th>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">日文</th>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">例句</th>
                                    <th className="px-4 py-2 font-bold whitespace-nowrap">中文翻譯</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-indigo-500/30">
                                {Object.entries(adjective.conjugations).map(([key, data]) => (
                                    <tr key={key} className="border-b border-indigo-500/30 hover:bg-indigo-600/50 transition-colors">
                                        <td className="px-4 py-2 font-bold text-white whitespace-nowrap">
                                            {ADJ_CONJUGATION_MAP[key] || key}
                                        </td>
                                        <td className="px-4 py-2 font-medium text-indigo-50 whitespace-nowrap">
                                            {data.form}
                                        </td>
                                        <td className="px-4 py-2 text-indigo-100 whitespace-nowrap">
                                            {data.example?.ruby ? (
                                                <span dangerouslySetInnerHTML={{ __html: data.example.ruby }} />
                                            ) : (
                                                data.example?.jp || <span className="opacity-50">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-indigo-300 whitespace-nowrap">
                                            {data.example?.zh || <span className="opacity-50">-</span>}
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
