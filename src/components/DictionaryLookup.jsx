import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, Book, Volume2 } from 'lucide-react';
import { generateDictionaryLookup } from '../services/ai';

export function DictionaryLookup() {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, generating, success, error
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setStatus('generating');
        setError('');
        setResult(null);

        try {
            const data = await generateDictionaryLookup(input.trim());
            setResult(data);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setError(err.message || 'AI 查詢失敗，請重試');
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-50/50 p-4 pb-24">
            <div className="glass-card mb-6" style={{ padding: '1.5rem', border: '1px solid var(--indigo-100)' }}>
                <h2 className="flex items-center gap-2 text-indigo-800" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                    <Book size={22} className="text-indigo-500" />
                    AI 智慧字典
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    輸入任何日文單字（動詞、名詞、形容詞等），AI 會為你解析詳細用法與例句。
                </p>

                <form onSubmit={handleSearch} className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="例如：遠慮、食べる、もちろん"
                        disabled={status === 'generating'}
                        className="w-full p-3 rounded-xl border border-indigo-100 bg-white shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-lg"
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
                            <Search size={20} />
                        )}
                        查詢單字
                    </button>
                </form>

                {error && (
                    <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {result && (
                <div className="flex flex-col gap-4 animate-slide-up">
                    {/* Header Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
                        
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{result.word}</h3>
                                <p className="text-lg text-indigo-600 font-medium">{result.kana}</p>
                            </div>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-full border border-indigo-100">
                                {result.type}
                            </span>
                        </div>
                        <div className="mt-3 space-y-3">
                            <p className="text-xl text-gray-800 font-medium">
                                {result.meaning}
                            </p>
                            {result.meaning_jp && (
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">日文解釋</p>
                                    <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
                                        {result.meaning_jp}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Explanation Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
                            <Book size={16} /> 詳細解說
                        </h4>
                        <div className="text-gray-700 leading-relaxed text-[15px]">
                            {Array.isArray(result.explanation) ? (
                                <ul className="list-disc list-inside space-y-2">
                                    {result.explanation.map((item, idx) => (
                                        <li key={idx} className="pl-1">{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="whitespace-pre-wrap">{result.explanation}</p>
                            )}
                        </div>
                    </div>

                    {/* Examples */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 mb-3 px-1 uppercase tracking-wider flex items-center gap-2">
                            <Volume2 size={16} /> 實用例句
                        </h4>
                        <div className="flex flex-col gap-3">
                            {result.examples && result.examples.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <p 
                                        className="text-[17px] font-medium text-gray-900 mb-2 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: item.ruby || item.jp }} 
                                    />
                                    <p className="text-[14px] text-gray-500">
                                        {item.zh}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
