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
                        <div style={{ fontSize: '1.25rem', color: 'hsl(var(--indigo-600))', fontWeight: 600, marginTop: '0.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                            {word.meaning}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {word.transitivity && (
                                    <span style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '8px', background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', color: '#4338ca', border: '1px solid #c7d2fe', fontWeight: 800, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        {word.transitivity}
                                    </span>
                                )}
                                {word.verbGroup && (
                                    <span style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '8px', background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)', color: '#e53e3e', border: '1px solid #feb2b2', fontWeight: 800, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        {word.verbGroup}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            speak(word.kanji);
                        }}
                        className="p-4 rounded-2xl hover:bg-indigo-50 transition-all active:scale-90"
                        style={{ color: 'hsl(var(--indigo-500))', background: '#f8fafc', border: '1px solid #e2e8f0' }}
                    >
                        <Volume2 size={32} />
                    </button>
                </div>
            )}

            {/* Conjugation Table */}
            {word.conjugations ? (
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
                        <Volume2 size={16} /> 動詞變化表
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
                                    <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>日文例句</th>
                                    <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>中文翻譯</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(word.conjugations).map(([key, data]) => (
                                    <tr key={key}>
                                        <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                            {CONJUGATION_MAP[key] || data.explanation || key}
                                        </td>
                                        <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#374151', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                            {data.form}
                                        </td>
                                        <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#374151', whiteSpace: 'nowrap' }}>
                                            {renderExample(data.example)}
                                        </td>
                                        <td style={{ padding: '10px 14px', border: '1px solid #c7d2fe', color: '#6b7280', whiteSpace: 'nowrap' }}>
                                            {data.example ? data.example.zh : <span style={{ opacity: 0.5 }}>-</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#6366f1', opacity: 0.75, textAlign: 'right' }}>
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
