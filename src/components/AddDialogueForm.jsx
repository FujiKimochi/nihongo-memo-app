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
        onCancel();
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
                            AI 生成
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

                {preview && (
                    <div className="mt-4 p-5 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 animate-fade-in shadow-inner">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                                PREVIEW
                            </div>
                            <h3 className="font-bold text-indigo-900">{preview.scenario}</h3>
                        </div>

                        <p className="text-sm text-gray-500 mb-6 italic leading-relaxed">
                            "{preview.description}"
                        </p>

                        <div className="space-y-3 mb-6">
                            {preview.dialogues?.slice(0, 3).map((line, idx) => (
                                <div key={idx} className="flex gap-2 text-xs">
                                    <span className="font-bold text-indigo-600">{line.role}:</span>
                                    <span className="text-gray-600 truncate">{line.jp}</span>
                                </div>
                            ))}
                            <div className="text-[10px] text-gray-300 italic flex items-center gap-1">
                                <ChevronRight size={10} /> 還有另外 {preview.dialogues?.length - 3} 句對話...
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleConfirmAdd}
                                className="btn btn-primary w-full shadow-md"
                            >
                                確認並儲存對話
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
