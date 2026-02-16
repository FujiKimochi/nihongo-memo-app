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

            // Automatically add
            onAdd(result);

            setStatus('success');
            setGrammarPoint('');

            setTimeout(() => {
                setStatus('idle');
                if (onCancel) onCancel();
            }, 1000);
        } catch (err) {
            console.error(err);
            setError(err.message || 'AI 生成失敗，請重試');
            setStatus('error');
        }
    };

    return (
        <div className="glass-card animate-slide-up" style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
                新增文法或是比較
            </h2>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-color)' }}>
                        輸入文法 (多個請用空白或逗號隔開)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={grammarPoint}
                            onChange={(e) => setGrammarPoint(e.target.value)}
                            placeholder="如：～ほうがいい ～たらいい"
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
                            AI 分析並儲存
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {/* Preview removed for automated flow */}

                {status === 'success' && (
                    <div className="text-green-600 text-center font-bold animate-bounce mt-4">✨ 儲存成功！</div>
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
