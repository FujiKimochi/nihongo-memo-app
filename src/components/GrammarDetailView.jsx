import React from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export function GrammarDetailView({ grammar, showHeader = true }) {
    const { speak } = useSpeech();

    if (!grammar) return null;

    // Helper to render one grammar block
    const renderGrammarItem = (item, index = 0, isSubItem = false) => (
        <div key={index} className={isSubItem ? "bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6" : ""}>
            {isSubItem && (
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900">{item.grammar_point || item.grammarPoint}</h3>
                </div>
            )}

            <div className="flex flex-col gap-6">
                <section>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">用法說明</h4>
                    <p className="text-gray-800 leading-relaxed">{item.explanation}</p>
                </section>

                <section>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">接續方式</h4>
                    <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-indigo-900 font-medium">
                        {item.connection}
                    </div>
                </section>

                <section>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">學習語句 ({item.examples?.length || 0})</h4>
                    <div className="flex flex-col gap-3">
                        {item.examples?.map((ex, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <div className="text-gray-900 font-medium text-lg leading-relaxed">
                                            {ex.ruby ? (
                                                <span dangerouslySetInnerHTML={{ __html: ex.ruby }} />
                                            ) : (
                                                ex.jp
                                            )}
                                        </div>
                                        <div className="text-gray-500 text-sm mt-1">{ex.zh}</div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speak(ex.jp);
                                        }}
                                        className="btn-ghost p-1.5 rounded-full hover:bg-gray-200 text-gray-400"
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );

    return (
        <div className="w-full animate-fade-in" style={{ textAlign: 'left' }}>
            {showHeader && (
                <div className="flex items-start justify-between mb-6 border-b pb-4">
                    <div className="flex-1">
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: '0.75rem', lineHeight: 1.2 }}>
                            {grammar.grammarPoint}
                        </h3>
                        {!grammar.is_comparison && (
                            <div style={{ fontSize: '1.1rem', color: 'hsl(var(--indigo-600))', fontWeight: 600, marginTop: '0.25rem' }}>
                                {grammar.meaning}
                            </div>
                        )}
                        {grammar.is_comparison && (
                            <div className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded inline-flex items-center gap-1 mt-2 font-bold border border-amber-100 uppercase">
                                <Volume2 size={12} className="rotate-180" /> Comparison Mode
                            </div>
                        )}
                    </div>
                </div>
            )}

            {grammar.is_comparison && grammar.comparison_analysis && (
                <div className="mb-8 p-5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl shadow-lg border border-indigo-400/20">
                    <h4 className="flex items-center gap-2 font-bold mb-3 text-indigo-100 uppercase tracking-wider text-xs">
                        <Volume2 size={16} /> 文法差異比較
                    </h4>

                    {(() => {
                        try {
                            // Attempt to parse JSON if it's a string, or use as is if object
                            const analysisData = typeof grammar.comparison_analysis === 'string'
                                ? JSON.parse(grammar.comparison_analysis)
                                : grammar.comparison_analysis;

                            // Check if it has the expected table structure
                            if (analysisData && analysisData.headers && analysisData.rows) {
                                return (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-indigo-100">
                                            <thead className="text-xs text-indigo-200 uppercase bg-indigo-800/30">
                                                <tr>
                                                    {analysisData.headers.map((header, idx) => (
                                                        <th key={idx} className="px-4 py-2 font-bold whitespace-nowrap">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {analysisData.rows.map((row, rowIdx) => (
                                                    <tr key={rowIdx} className="border-b border-indigo-500/30 hover:bg-indigo-600/50">
                                                        {analysisData.headers.map((header, colIdx) => {
                                                            // Map header to object key. The provided JSON example uses keys matching headers or 'item' for first col
                                                            // Example: headers=["比較項目", "かなり", "めちゃくちゃ"], rows=[{item: "...", "かなり": "...", "めちゃくちゃ": "..."}]
                                                            // We need a robust way to map.

                                                            // Strategy: 
                                                            // 1. If it's the first column (header[0]), usually 'item' or the header name itself.
                                                            // 2. Otherwise assume key matches header name.

                                                            let cellContent = '';
                                                            if (colIdx === 0) {
                                                                // Try 'item' first, then the header name itself
                                                                cellContent = row['item'] || row[header] || row['項目'] || '';
                                                            } else {
                                                                cellContent = row[header] || '';
                                                            }

                                                            return (
                                                                <td key={colIdx} className={`px-4 py-2 ${colIdx === 0 ? 'font-bold text-white whitespace-nowrap' : ''}`}>
                                                                    {cellContent}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="mt-2 text-xs text-indigo-300 opacity-75">
                                            * 表格由 AI 生成，向右滑動可查看更多
                                        </div>
                                    </div>
                                );
                            }

                            // Fallback if parsed but not table structure
                            return <p className="leading-relaxed font-medium whitespace-pre-wrap">{typeof analysisData === 'string' ? analysisData : JSON.stringify(analysisData)}</p>;

                        } catch (e) {
                            // Fallback if not JSON
                            return <p className="leading-relaxed font-medium whitespace-pre-wrap">{grammar.comparison_analysis}</p>;
                        }
                    })()}
                </div>
            )}

            {grammar.is_comparison ? (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        fontSize: '0.875rem',
                        textAlign: 'left',
                        borderCollapse: 'collapse',
                        border: '1px solid #c7d2fe',
                        minWidth: '600px'
                    }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                    比較項目
                                </th>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                    用法說明
                                </th>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                    接續方式
                                </th>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                    例句
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {grammar.items?.map((item, idx) => (
                                <tr key={idx}>
                                    {/* Grammar Point Name */}
                                    <td style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#fff', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%',
                                                background: '#e0e7ff', color: '#4f46e5',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '12px', fontWeight: 700, flexShrink: 0
                                            }}>
                                                {idx + 1}
                                            </div>
                                            <span style={{ color: '#4338ca', fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
                                                {item.grammar_point || item.grammarPoint}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Explanation */}
                                    <td style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#fff', verticalAlign: 'top', color: '#1f2937', lineHeight: 1.6 }}>
                                        {item.explanation || '-'}
                                    </td>

                                    {/* Connection */}
                                    <td style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#fff', verticalAlign: 'top' }}>
                                        {item.connection ? (
                                            <span style={{
                                                display: 'inline-block', padding: '4px 10px',
                                                background: '#eef2ff', color: '#4338ca',
                                                borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
                                                border: '1px solid #e0e7ff'
                                            }}>
                                                {item.connection}
                                            </span>
                                        ) : (
                                            <span style={{ color: '#9ca3af' }}>-</span>
                                        )}
                                    </td>

                                    {/* Examples */}
                                    <td style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#fff', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {item.examples?.map((ex, exIdx) => (
                                                <div key={exIdx} style={{ paddingLeft: '10px', borderLeft: '2px solid #e0e7ff' }}>
                                                    <div style={{ color: '#111827', fontWeight: 500, marginBottom: '4px' }}>
                                                        {ex.ruby ? (
                                                            <span dangerouslySetInnerHTML={{ __html: ex.ruby }} />
                                                        ) : (
                                                            ex.jp
                                                        )}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                speak(ex.jp);
                                                            }}
                                                            style={{
                                                                marginLeft: '8px', background: 'none', border: 'none',
                                                                color: '#818cf8', cursor: 'pointer', padding: 0,
                                                                display: 'inline-flex', verticalAlign: 'middle'
                                                            }}
                                                        >
                                                            <Volume2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{ex.zh}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                renderGrammarItem(grammar)
            )}
        </div>
    );
}
