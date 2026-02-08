import React, { useState } from 'react';
import { Plus, X, Sparkles, Loader2 } from 'lucide-react';
import { generateVerbDetails, getApiKey, getModelName } from '../services/ai';

export function AddWordForm({ onAdd, onCancel }) {
    const [kanjiInput, setKanjiInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle', 'generating', 'success', 'error'
    const [previews, setPreviews] = useState([]); // List of generated words
    const apiKey = getApiKey();

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!kanjiInput.trim()) return;
        if (!apiKey) {
            alert("請先在設定頁面輸入 API Key");
            return;
        }

        setIsGenerating(true);
        setStatus('generating');
        setPreviews([]); // Reset

        try {
            const modelName = getModelName();
            const data = await generateVerbDetails(kanjiInput.trim(), apiKey, modelName);

            // AI might return a single object or an array
            const results = Array.isArray(data) ? data : [data];
            setPreviews(results);
            setStatus('preview');
        } catch (error) {
            console.error(error);
            const msg = error.message || "Unknown error";
            alert(`AI 分析失敗: ${msg}`);
            setStatus('error');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleConfirmAll = () => {
        previews.forEach(data => {
            const wordEntry = {
                kanji: data.kanji,
                kana: data.kana,
                meaning: data.meaning,
                type: data.type || 'Verb',
                conjugations: data.conjugations,
                examples: data.examples
            };
            onAdd(wordEntry);
        });

        setStatus('success');
        setKanjiInput(''); // Clear input
        setPreviews([]); // Clear previews

        setTimeout(() => {
            setStatus('idle');
            if (onCancel) onCancel(); // Close form after batch success
        }, 1000);
    };

    return (
        <div className="glass-card animate-slide-up" style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>新增單字卡 (Batch Add)</h2>
                {onCancel && (
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-color)' }}>
                        請輸入動詞 (多個請用空白或逗號隔開)
                    </label>
                    <div className="flex gap-2">
                        <input
                            required
                            className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-lg"
                            placeholder="如：食べる、飲む、行く"
                            value={kanjiInput}
                            onChange={e => setKanjiInput(e.target.value)}
                            disabled={isGenerating || status === 'preview'}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary shadow-lg shadow-indigo-100"
                            disabled={isGenerating || !apiKey || !kanjiInput.trim() || status === 'preview'}
                        >
                            {isGenerating ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    AI 分析
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {!apiKey && (
                    <div className="bg-yellow-50 text-yellow-700 p-3 rounded-xl text-xs border border-yellow-100 flex items-center gap-2">
                        <span>⚠️ 請先至設定頁面輸入 API Key 以啟用分析功能</span>
                    </div>
                )}

                {previews.length > 0 && (
                    <div className="mt-2 animate-fade-in">
                        <div className="font-bold text-indigo-900 text-sm mb-3 flex items-center justify-between">
                            <span>🔍 AI 準備好 {previews.length} 個單字解析：</span>
                            <button
                                type="button"
                                onClick={() => { setPreviews([]); setStatus('idle'); }}
                                className="text-xs text-gray-400 font-normal hover:text-red-500"
                            >
                                清除重新輸入
                            </button>
                        </div>

                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar mb-6">
                            {previews.map((p, idx) => (
                                <div key={idx} className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center justify-between group transform transition-all">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-indigo-900">{p.kanji}</span>
                                            <span className="text-xs text-indigo-400">({p.kana})</span>
                                        </div>
                                        <div className="text-xs text-gray-500 line-clamp-1">{p.meaning}</div>
                                    </div>
                                    <div className="text-[10px] bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                                        {p.type || '動詞'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleConfirmAll}
                                className="flex-1 btn btn-primary shadow-xl"
                                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
                            >
                                確認並全部儲存 ({previews.length})
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 btn btn-ghost border border-gray-200"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-green-600 text-center font-bold animate-bounce mt-4">
                        ✨ 批次新增成功！
                    </div>
                )}
            </form>
        </div>
    );
}
