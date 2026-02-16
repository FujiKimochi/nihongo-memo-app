import React, { useState } from 'react';
import { Sparkles, Loader2, X, AlertCircle } from 'lucide-react';
import { generateAdjectiveDetails, getApiKey, getModelName } from '../services/ai';

export function AddAdjectiveForm({ onAdd, onCancel }) {
    const [kanjiInput, setKanjiInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle', 'generating', 'preview', 'success', 'error'
    const [previews, setPreviews] = useState([]);
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
        try {
            const data = await generateAdjectiveDetails(kanjiInput.trim(), apiKey, getModelName());
            const results = Array.isArray(data) ? data : [data];

            // Automatically save
            onAdd(results);

            setStatus('success');
            setKanjiInput('');

            setTimeout(() => {
                setStatus('idle');
                if (onCancel) onCancel();
            }, 1000);
        } catch (error) {
            console.error(error);
            alert(`AI 分析失敗：${error.message}`);
            setStatus('error');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="glass-card animate-slide-up" style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">批次新增形容詞 / 副詞</h2>
                {onCancel && (
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">請輸入形容詞或副詞 (可用空白或逗號分開)</label>
                    <div className="flex gap-2">
                        <input
                            required
                            className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="如：熱い、綺麗、ゆっくり"
                            value={kanjiInput}
                            onChange={e => setKanjiInput(e.target.value)}
                            disabled={isGenerating || status === 'preview'}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary shadow-lg shadow-indigo-100"
                            disabled={isGenerating || !apiKey || !kanjiInput.trim() || status === 'preview'}
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={20} /> AI 分析並儲存</>}
                        </button>
                    </div>
                </div>

                {!apiKey && (
                    <div className="bg-yellow-50 text-yellow-700 p-3 rounded-xl text-xs border border-yellow-100 flex items-center gap-2">
                        <AlertCircle size={14} /> 請先至設定頁面輸入 API Key
                    </div>
                )}

                {/* Previews removed for automated flow */}

                {status === 'success' && (
                    <div className="text-green-600 text-center font-bold animate-bounce mt-4">✨ 儲存成功！</div>
                )}
            </form>
        </div>
    );
}
