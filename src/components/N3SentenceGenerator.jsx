import React, { useState } from 'react';
import { PenTool, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { generateN3Sentences } from '../services/ai';

export function N3SentenceGenerator() {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, generating, success, error
    const [error, setError] = useState('');
    const [sentences, setSentences] = useState([]);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setStatus('generating');
        setError('');
        setSentences([]);

        try {
            const result = await generateN3Sentences(input.trim());
            setSentences(result);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setError(err.message || 'AI 生成失敗，請重試');
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50/50 p-4 pb-24">
            <div className="glass-card mb-6" style={{ padding: '1.5rem', border: '1px solid var(--indigo-100)' }}>
                <h2 className="flex items-center gap-2 text-indigo-800" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                    <PenTool size={22} className="text-indigo-500" />
                    N3 程度造句練習
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    輸入想練習的單字或文法，AI 將為你生成 5 句 N3 程度的實用例句。
                </p>

                <form onSubmit={handleGenerate} className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="例如：～たばかり / 食べる / 雖然"
                        disabled={status === 'generating'}
                        className="w-full p-3 rounded-xl border border-indigo-100 bg-white shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                    />
                    <button
                        type="submit"
                        disabled={status === 'generating' || !input.trim()}
                        className="btn btn-primary w-full shadow-md flex items-center justify-center gap-2"
                        style={{ padding: '0.75rem', fontSize: '1rem' }}
                    >
                        {status === 'generating' ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Sparkles size={20} />
                        )}
                        生成例句
                    </button>
                </form>

                {error && (
                    <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {sentences.length > 0 && (
                <div className="flex flex-col gap-3 animate-slide-up">
                    <h3 className="font-bold text-gray-700 px-1 mb-1">
                        「{input}」的 N3 例句：
                    </h3>
                    {sentences.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p 
                                className="text-lg font-medium text-gray-900 mb-2 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: item.ruby || item.jp }} 
                            />
                            <p className="text-sm text-gray-500 mb-3">
                                {item.zh}
                            </p>
                            {item.grammar_explanation && (
                                <div className="mt-3 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100/50">
                                    <h4 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-1.5">
                                        <Sparkles size={16} className="text-indigo-500" />
                                        文法解析
                                    </h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {Array.isArray(item.grammar_explanation) 
                                            ? item.grammar_explanation.join('\n') 
                                            : item.grammar_explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
