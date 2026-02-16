import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, MessageSquare, ChevronRight } from 'lucide-react';
import { generateDialogueContext, getApiKey } from '../services/ai';

export function AddDialogueForm({ onAdd, onCancel }) {
    const [scenario, setScenario] = useState('');
    const [status, setStatus] = useState('idle'); // idle, generating, error
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!scenario.trim()) return;

        const apiKey = getApiKey();
        if (!apiKey) {
            setError('請先到設定頁面輸入 API Key');
            setStatus('error');
            return;
        }

        setStatus('generating');
        setError('');

        try {
            const result = await generateDialogueContext(scenario.trim(), apiKey);

            // Automatically add
            onAdd(result);

            setStatus('success');
            setScenario('');

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
            <h2 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                <MessageSquare className="text-indigo-600" />
                模擬情境對話
            </h2>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">
                        想要練習什麼情境？
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={scenario}
                            onChange={(e) => setScenario(e.target.value)}
                            placeholder="如：超市買菜、跟牙醫預約、剪頭髮..."
                            disabled={status === 'generating'}
                            className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary shadow-lg shadow-indigo-100"
                            disabled={status === 'generating' || !scenario.trim()}
                        >
                            {status === 'generating' ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Sparkles size={18} />
                            )}
                            AI 生成並儲存
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 pl-1">
                        提示：您可以輸入更具體的情境，如「在超商買冰淇淋但發現沒帶錢」。
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 text-sm animate-shake">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {/* Preview removed for automated flow */}

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
