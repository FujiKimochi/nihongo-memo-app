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
                <div style={{
                    marginBottom: '2rem', padding: '1.25rem',
                    background: '#fff',
                    color: '#1f2937', borderRadius: '1rem',
                    boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e0e7ff'
                }}>
                    <h4 style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontWeight: 700, marginBottom: '12px',
                        color: '#4338ca', textTransform: 'uppercase',
                        letterSpacing: '0.05em', fontSize: '0.75rem'
                    }}>
                        <Volume2 size={16} /> 文法差異比較
                    </h4>

                    {(() => {
                        // Helper: parse markdown table string
                        const parseMarkdownTable = (text) => {
                            const lines = text.trim().split('\n').filter(l => l.trim());
                            if (lines.length < 3) return null; // need header, separator, at least 1 row

                            const parseLine = (line) => line.split('|').map(c => c.trim()).filter(c => c);
                            const headers = parseLine(lines[0]);

                            // Check if line[1] is a separator (contains ---)
                            if (!lines[1].includes('---')) return null;

                            const rows = lines.slice(2).map(line => {
                                const cells = parseLine(line);
                                const obj = {};
                                headers.forEach((h, i) => { obj[h] = cells[i] || ''; });
                                return obj;
                            });

                            return { headers, rows };
                        };

                        try {
                            let analysisData = null;

                            if (typeof grammar.comparison_analysis === 'string') {
                                // Try JSON first
                                try {
                                    analysisData = JSON.parse(grammar.comparison_analysis);
                                } catch (jsonErr) {
                                    // Try markdown table
                                    analysisData = parseMarkdownTable(grammar.comparison_analysis);
                                }
                            } else {
                                analysisData = grammar.comparison_analysis;
                            }

                            if (analysisData && analysisData.headers && analysisData.rows) {
                                return (
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{
                                            width: '100%', fontSize: '0.875rem',
                                            textAlign: 'left', borderCollapse: 'collapse',
                                            border: '1px solid #c7d2fe'
                                        }}>
                                            <thead>
                                                <tr>
                                                    {analysisData.headers.map((header, idx) => (
                                                        <th key={idx} style={{
                                                            padding: '10px 14px', fontWeight: 700,
                                                            whiteSpace: 'nowrap', color: '#312e81',
                                                            background: '#eef2ff',
                                                            border: '1px solid #c7d2fe',
                                                            fontSize: '0.75rem', textTransform: 'uppercase'
                                                        }}>
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {analysisData.rows.map((row, rowIdx) => (
                                                    <tr key={rowIdx}>
                                                        {analysisData.headers.map((header, colIdx) => {
                                                            let cellContent = '';
                                                            if (colIdx === 0) {
                                                                cellContent = row['item'] || row[header] || row['項目'] || '';
                                                            } else {
                                                                cellContent = row[header] || '';
                                                            }

                                                            return (
                                                                <td key={colIdx} style={{
                                                                    padding: '10px 14px',
                                                                    border: '1px solid #c7d2fe',
                                                                    color: colIdx === 0 ? '#312e81' : '#374151',
                                                                    fontWeight: colIdx === 0 ? 700 : 400,
                                                                    whiteSpace: colIdx === 0 ? 'nowrap' : 'normal'
                                                                }}>
                                                                    {cellContent}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#6366f1', opacity: 0.75 }}>
                                            * 表格由 AI 生成，向右滑動可查看更多
                                        </div>
                                    </div>
                                );
                            }

                            // Fallback if parsed but not table structure
                            return <p style={{ lineHeight: 1.6, fontWeight: 500, whiteSpace: 'pre-wrap' }}>{typeof analysisData === 'string' ? analysisData : JSON.stringify(analysisData)}</p>;

                        } catch (e) {
                            // Fallback if not JSON
                            return <p style={{ lineHeight: 1.6, fontWeight: 500, whiteSpace: 'pre-wrap' }}>{grammar.comparison_analysis}</p>;
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
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap', width: '10%' }}>
                                    比較項目
                                </th>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap', width: '15%' }}>
                                    用法說明
                                </th>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                    接續方式
                                </th>
                                <th style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#eef2ff', color: '#312e81', fontWeight: 700, whiteSpace: 'nowrap', width: '45%' }}>
                                    例句
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {grammar.items?.map((item, idx) => (
                                <tr key={idx}>
                                    {/* Grammar Point Name */}
                                    <td style={{ padding: '12px 16px', border: '1px solid #c7d2fe', background: '#fff', verticalAlign: 'top', width: '10%' }}>
                                        <span style={{ color: '#4338ca', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap' }}>
                                            {idx + 1}. {item.grammar_point || item.grammarPoint}
                                        </span>
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
