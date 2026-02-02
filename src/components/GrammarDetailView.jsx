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
                    <p className="leading-relaxed font-medium">
                        {grammar.comparison_analysis}
                    </p>
                </div>
            )}

            {grammar.is_comparison ? (
                <div className="space-y-4">
                    {grammar.items?.map((item, idx) => renderGrammarItem(item, idx, true))}
                </div>
            ) : (
                renderGrammarItem(grammar)
            )}
        </div>
    );
}
