import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generateGrammarDetails, getApiKey, getModelName } from '../services/ai';

export function AddGrammarForm({ onAdd, onCancel }) {
    const [grammarPoint, setGrammarPoint] = useState('');
    const [status, setStatus] = useState('idle'); // idle, generating, error
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!grammarPoint.trim()) return;

        const apiKey = getApiKey();
        if (!apiKey) {
            setError('請先到設定頁面輸入 API Key');
            setStatus('error');
            return;
        }

        setStatus('generating');
        setError('');

        try {
            const result = await generateGrammarDetails(grammarPoint.trim(), apiKey);
            setPreview(result);
            setStatus('idle');
        } catch (err) {
            console.error(err);
            setError(err.message || 'AI 生成失敗，請重試');
            setStatus('error');
        }
    };

    const handleConfirmAdd = () => {
        if (!preview) return;
        onAdd(preview);
        onCancel(); // Close form
    };

    return (
        <div className="glass-card animate-slide-up" style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
                新增文法筆記
            </h2>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-color)' }}>
                        文法條目 (例如：～ほうがいい)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={grammarPoint}
                            onChange={(e) => setGrammarPoint(e.target.value)}
                            placeholder="輸入想學習的文法..."
                            disabled={status === 'generating'}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'white'
                            }}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'generating' || !grammarPoint.trim()}
                        >
                            {status === 'generating' ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Sparkles size={18} />
                            )}
                            AI 解析
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {preview && (
                    <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-fade-in">
                        <div className="font-bold text-indigo-900 text-lg mb-1">{preview.grammar_point}</div>
                        <div className="text-indigo-600 font-medium mb-3">{preview.meaning}</div>

                        <div className="text-xs text-gray-500 mb-4 line-clamp-2">
                            {preview.explanation}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleConfirmAdd}
                                className="btn btn-primary w-full"
                            >
                                確認加入筆記
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreview(null)}
                                className="btn btn-ghost border border-indigo-200 text-indigo-600 px-4"
                            >
                                重試
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-ghost mt-2"
                    style={{ alignSelf: 'center', color: 'var(--text-muted)' }}
                >
                    取消
                </button>
            </form>
        </div>
    );
}
