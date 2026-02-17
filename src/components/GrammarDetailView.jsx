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
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr>
                                <th className="p-4 border-b-2 border-indigo-100 bg-indigo-50/50 w-24 min-w-[6rem] sticky left-0 z-10 text-indigo-900 font-bold">
                                    比較項目
                                </th>
                                {grammar.items?.map((item, idx) => (
                                    <th key={idx} className="p-4 border-b-2 border-indigo-100 bg-white min-w-[200px] text-indigo-700 font-bold text-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
                                                {idx + 1}
                                            </div>
                                            {item.grammar_point || item.grammarPoint}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Explanation Row */}
                            <tr>
                                <td className="p-4 font-bold text-gray-500 bg-gray-50/50 sticky left-0 z-10 border-r border-gray-100">
                                    用法說明
                                </td>
                                {grammar.items?.map((item, idx) => (
                                    <td key={idx} className="p-4 align-top text-gray-800 leading-relaxed bg-white">
                                        {item.explanation}
                                    </td>
                                ))}
                            </tr>

                            {/* Connection Row */}
                            <tr>
                                <td className="p-4 font-bold text-gray-500 bg-gray-50/50 sticky left-0 z-10 border-r border-gray-100">
                                    接續方式
                                </td>
                                {grammar.items?.map((item, idx) => (
                                    <td key={idx} className="p-4 align-top bg-white">
                                        <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
                                            {item.connection}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Examples Row */}
                            <tr>
                                <td className="p-4 font-bold text-gray-500 bg-gray-50/50 sticky left-0 z-10 border-r border-gray-100">
                                    例句
                                </td>
                                {grammar.items?.map((item, idx) => (
                                    <td key={idx} className="p-4 align-top bg-white">
                                        <div className="flex flex-col gap-4">
                                            {item.examples?.map((ex, exIdx) => (
                                                <div key={exIdx} className="group relative pl-3 border-l-2 border-indigo-100 hover:border-indigo-300 transition-colors">
                                                    <div className="text-gray-900 font-medium mb-1">
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
                                                            className="ml-2 inline-flex opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hover:text-indigo-600"
                                                        >
                                                            <Volume2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="text-gray-500 text-xs">{ex.zh}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                renderGrammarItem(grammar)
            )}
        </div>
    );
}
