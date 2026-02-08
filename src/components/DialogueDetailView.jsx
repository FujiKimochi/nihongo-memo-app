import React from 'react';
import { Volume2, User } from 'lucide-react';

export function DialogueDetailView({ dialogue, onSpeak }) {
    if (!dialogue) return null;

    return (
        <div className="w-full animate-fade-in text-left">
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">場景描述</h4>
                <p className="text-indigo-900 font-medium">{dialogue.description}</p>
            </div>

            <div className="flex flex-col gap-4">
                {dialogue.dialogueData?.map((line, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-3 ${line.role === 'B' ? 'flex-row-reverse text-right' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${line.role === 'A' ? 'bg-indigo-600 text-white' : 'bg-rose-500 text-white'
                            }`}>
                            <span className="text-xs font-bold">{line.role}</span>
                        </div>

                        <div className={`flex-1 max-w-[85%] group`}>
                            <div
                                className={`inline-block p-3 rounded-2xl shadow-sm border ${line.role === 'A'
                                    ? 'bg-white border-gray-100 rounded-tl-none'
                                    : 'bg-rose-50 border-rose-100 rounded-tr-none text-left'
                                    }`}
                                onClick={() => onSpeak(line.jp)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="text-gray-900 text-base leading-[2.2] mb-1">
                                    {line.ruby ? (
                                        <span dangerouslySetInnerHTML={{ __html: line.ruby }} />
                                    ) : (
                                        line.jp
                                    )}
                                </div>
                                <div className={`text-xs ${line.role === 'A' ? 'text-gray-400' : 'text-rose-400'}`}>
                                    {line.zh}
                                </div>
                            </div>

                            <div className={`mt-1 flex ${line.role === 'B' ? 'justify-end' : 'justify-start'}`}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSpeak(line.jp);
                                    }}
                                    className="p-1 text-gray-300 hover:text-indigo-500 transition-colors"
                                >
                                    <Volume2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
