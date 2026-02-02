import React from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export function GrammarDetailView({ grammar, showHeader = true }) {
    const { speak } = useSpeech();

    if (!grammar) return null;

    return (
        <div className="w-full animate-fade-in" style={{ textAlign: 'left' }}>
            {showHeader && (
                <div className="flex items-start justify-between mb-6 border-b pb-4">
                    <div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: '0.75rem', lineHeight: 1.2 }}>
                            {grammar.grammarPoint}
                        </h3>
                        <div style={{ fontSize: '1.1rem', color: 'hsl(var(--indigo-600))', fontWeight: 600, marginTop: '0.25rem' }}>
                            {grammar.meaning}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-6">
                <section>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">用法說明</h4>
                    <p className="text-gray-800 leading-relaxed">{grammar.explanation}</p>
                </section>

                <section>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">接續方式</h4>
                    <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-indigo-900 font-medium">
                        {grammar.connection}
                    </div>
                </section>

                <section>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">學習部句 ({grammar.examples?.length || 0})</h4>
                    <div className="flex flex-col gap-3">
                        {grammar.examples?.map((ex, idx) => (
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
}
