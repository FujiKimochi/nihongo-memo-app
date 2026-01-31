import React, { useState } from 'react';
import { Plus, X, Sparkles, Loader2 } from 'lucide-react';
import { generateVerbDetails, getApiKey, getModelName } from '../services/ai';

export function AddWordForm({ onAdd, onCancel }) {
    const [formData, setFormData] = useState({
        kanji: ''
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState(''); // 'idle', 'generating', 'success', 'error'
    const [rawResult, setRawResult] = useState(null); // Store AI result for display
    const apiKey = getApiKey();



    const handleAnalyzeAndSave = async (e) => {
        e.preventDefault();
        if (!formData.kanji) return;
        if (!apiKey) {
            alert("請先在設定頁面輸入 API Key");
            return;
        }

        setIsGenerating(true);
        setStatus('generating');
        try {
            const modelName = getModelName();
            const data = await generateVerbDetails(formData.kanji, apiKey, modelName);

            // Construct word entry
            const wordEntry = {
                kanji: data.kanji,
                kana: data.kana,
                meaning: data.meaning,
                type: data.type || 'Verb',
                conjugations: data.conjugations,
                examples: data.examples
            };

            onAdd(wordEntry);
            setStatus('success');
            setRawResult(wordEntry); // Show the result
            setFormData({ kanji: '' }); // Clear input

            // Optional: reset success status after delay
            setTimeout(() => setStatus('idle'), 2000);

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
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>新單字 (New Word)</h2>
                {onCancel && (
                    <button onClick={onCancel} className="btn-ghost" style={{ padding: '0.5rem' }}>
                        <X size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleAnalyzeAndSave} className="flex flex-col gap-4">
                {/* Simplified Input */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        請輸入動詞 (Verb)
                    </label>
                    <input
                        required
                        className="w-full"
                        style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            fontSize: '1.25rem',
                            background: 'rgba(255,255,255,0.8)'
                        }}
                        placeholder="e.g. 食べる"
                        value={formData.kanji}
                        onChange={e => setFormData({ ...formData, kanji: e.target.value })}
                        disabled={isGenerating}
                    />
                </div>

                {!apiKey && (
                    <div className="bg-yellow-50 text-yellow-700 p-3 rounded text-sm mb-2">
                        ⚠️ 請先至設定頁面輸入 API Key 以啟用 AI 自動分析
                    </div>
                )}

                <button
                    type="submit"
                    className="btn"
                    disabled={isGenerating || !apiKey || !formData.kanji}
                    style={{
                        marginTop: '0.5rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        color: 'white',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            AI 正在分析中...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            AI 自動分析並儲存
                        </>
                    )}
                </button>

                {status === 'success' && (
                    <div className="text-green-600 text-center font-medium animate-fade-in">
                        ✨ 新增成功！
                    </div>
                )}

                {rawResult && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', fontSize: '0.8rem', overflowX: 'auto' }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#666' }}>AI生成內容預覽:</div>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {JSON.stringify(rawResult, null, 2)}
                        </pre>
                    </div>
                )}
            </form>
        </div>
    );
}
