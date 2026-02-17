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
                <div style={{
                    marginBottom: '2rem', padding: '1.25rem',
                    background: '#fff', borderRadius: '1rem',
                    boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e0e7ff'
                }}>
                    <h4 style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontWeight: 700, marginBottom: '12px',
                        color: '#4338ca', textTransform: 'uppercase',
                        letterSpacing: '0.05em', fontSize: '0.75rem'
                    }}>
                        <Volume2 size={16} /> 形容詞變化表
                    </h4>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%', fontSize: '0.875rem',
                            textAlign: 'left', borderCollapse: 'collapse',
                            border: '1px solid #c7d2fe'
                        }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>變化形</th>
                                    <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>日文</th>
                                    <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>例句</th>
                                    <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>中文翻譯</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(adjective.conjugations).map(([key, data]) => {
                                    if (!data) return null;
                                    return (
                                        <tr key={key}>
                                            <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                                {ADJ_CONJUGATION_MAP[key] || key}
                                            </td>
                                            <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#374151', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                                {data.form}
                                            </td>
                                            <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#374151', whiteSpace: 'nowrap' }}>
                                                {data.example?.ruby ? (
                                                    <span dangerouslySetInnerHTML={{ __html: data.example.ruby }} />
                                                ) : (
                                                    data.example?.jp || <span style={{ opacity: 0.5 }}>-</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#6b7280', whiteSpace: 'nowrap' }}>
                                                {data.example?.zh || <span style={{ opacity: 0.5 }}>-</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#6366f1', opacity: 0.75, textAlign: 'right' }}>
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
