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
        setPreviews([]);

        try {
            const modelName = getModelName();
            const data = await generateVerbDetails(kanjiInput.trim(), apiKey, modelName);

            // AI might return a single object or an array - normalize to array
            const results = Array.isArray(data) ? data : [data];

            // Map to word entries format
            const wordEntries = results.map(p => ({
                kanji: p.kanji,
                kana: p.kana,
                meaning: p.meaning,
                type: p.type || 'Verb',
                conjugations: p.conjugations,
                examples: p.examples
            }));

            // Automatically save
            onAdd(wordEntries);

            setStatus('success');
            setKanjiInput('');

            // Success feedback and auto-close
            setTimeout(() => {
                setStatus('idle');
                if (onCancel) onCancel();
            }, 1000);

        } catch (error) {
            console.error(error);
            const msg = error.message || "Unknown error";
            alert(`AI 分析失敗: ${msg}`);
            setStatus('error');
        } finally {
            setIsGenerating(false);
        }
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
                                    AI 分析並儲存
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

                {/* Previews removed in automation mode to keep UI clean during success */}

                {status === 'success' && (
                    <div className="text-green-600 text-center font-bold animate-bounce mt-4">
                        ✨ 批次新增成功！
                    </div>
                )}
            </form>
        </div>
    );
}
