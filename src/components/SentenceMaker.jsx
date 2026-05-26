import React, { useState } from 'react';
import { PenTool, Languages, Volume2, Upload, Sparkles, Loader2, CheckCircle, AlertCircle, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { generateFiveSentences, correctGrammarFromImage } from '../services/ai';
import { useSpeech } from '../hooks/useSpeech';

export function SentenceMaker() {
    const [activeSubTab, setActiveSubTab] = useState('generate'); // 'generate', 'correct'
    const { speak } = useSpeech();

    // Tab 1: Generate Sentences States
    const [wordInput, setWordInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSentences, setGeneratedSentences] = useState([]);
    const [genError, setGenError] = useState('');

    // Tab 2: Correct Grammar States
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [correctionResult, setCorrectionResult] = useState(null);
    const [correctError, setCorrectError] = useState('');

    // Handle Word Generation
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!wordInput.trim()) return;

        setIsGenerating(true);
        setGenError('');
        setGeneratedSentences([]);

        try {
            const data = await generateFiveSentences(wordInput.trim());
            setGeneratedSentences(data || []);
        } catch (err) {
            console.error(err);
            setGenError(err.message || 'AI 生成例句失敗，請重試。');
        } finally {
            setIsGenerating(false);
        }
    };

    // Handle Image Selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setCorrectionResult(null);
        setCorrectError('');

        // Preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Convert to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            setSelectedImage({
                base64: base64Data,
                mimeType: file.type
            });
        };
        reader.readAsDataURL(file);
    };

    // Handle Image Analysis/Correction
    const handleCorrectGrammar = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        setCorrectError('');
        setCorrectionResult(null);

        try {
            const result = await correctGrammarFromImage(selectedImage.base64, selectedImage.mimeType);
            setCorrectionResult(result);
        } catch (err) {
            console.error(err);
            setCorrectError(err.message || 'AI 圖片分析失敗，請確認已設定 API 密鑰且圖片清晰。');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex flex-col gap-6" style={{ padding: '1rem', pb: '5rem' }}>
            {/* Header Area */}
            <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--indigo-100)' }}>
                <h2 className="flex items-center gap-2 text-indigo-800" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <PenTool size={22} className="text-indigo-500" />
                    AI 造句與文法糾錯
                </h2>
                <p className="text-sm text-gray-500">
                    輸入單字由 AI 生成實用日文例句，或上傳圖片辨識並批改手寫或列印句子的文法。
                </p>

                {/* Sub Tab Navigation */}
                <div className="flex bg-gray-100 p-1 rounded-xl mt-4">
                    <button
                        onClick={() => setActiveSubTab('generate')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-bold transition-all ${
                            activeSubTab === 'generate'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Languages size={15} />
                        單字造句
                    </button>
                    <button
                        onClick={() => setActiveSubTab('correct')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-bold transition-all ${
                            activeSubTab === 'correct'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Sparkles size={15} />
                        圖片文法批改
                    </button>
                </div>
            </div>

            {/* TAB 1: AI 單字造句 */}
            {activeSubTab === 'generate' && (
                <div className="flex flex-col gap-4">
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <form onSubmit={handleGenerate} className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-color)' }}>
                                    請輸入字詞或片語
                                </label>
                                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--indigo-500))', fontWeight: 500 }}>
                                    ⚡️ 已優化短句生成，約 3 秒內完成
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    required
                                    className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-lg"
                                    placeholder="如：遠慮、散歩、お疲れ様"
                                    value={wordInput}
                                    onChange={e => setWordInput(e.target.value)}
                                    disabled={isGenerating}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary shadow-lg shadow-indigo-100"
                                    disabled={isGenerating || !wordInput.trim()}
                                >
                                    {isGenerating ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            生成例句
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {genError && (
                            <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <span>{genError}</span>
                            </div>
                        )}
                    </div>

                    {/* Result list */}
                    {generatedSentences.length > 0 && (
                        <div className="flex flex-col gap-3 animate-slide-up">
                            <h3 className="text-sm font-bold text-gray-500 px-1 uppercase tracking-wider">
                                AI 推薦例句
                            </h3>
                            {generatedSentences.map((sentence, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <p 
                                            className="text-[17px] font-medium text-gray-900 mb-2 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: sentence.ruby || sentence.jp }} 
                                        />
                                        <p className="text-[14px] text-gray-500">
                                            {sentence.zh}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => speak(sentence.jp)}
                                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors flex-shrink-0"
                                        title="播放語音"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: 圖片文法批改 */}
            {activeSubTab === 'correct' && (
                <div className="flex flex-col gap-4">
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div className="flex flex-col gap-4">
                            {/* File Upload Dropzone */}
                            <label className="border-2 border-dashed border-indigo-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50/30 transition-colors relative overflow-hidden min-h-[160px]">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={isAnalyzing}
                                />
                                {imagePreview ? (
                                    <div className="w-full flex flex-col items-center gap-2">
                                        <img 
                                            src={imagePreview} 
                                            alt="Uploaded Preview" 
                                            style={{ maxHeight: '180px', borderRadius: '8px', objectFit: 'contain' }} 
                                        />
                                        <span className="text-xs text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded">
                                            更換圖片
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-400">
                                        <Upload size={32} className="text-indigo-400" />
                                        <span className="font-medium text-sm text-gray-600">點擊或拖曳圖片至此上傳</span>
                                        <span className="text-xs text-gray-400">支援 PNG、JPG、JPEG</span>
                                    </div>
                                )}
                            </label>

                            <button
                                onClick={handleCorrectGrammar}
                                className="btn btn-primary w-full shadow-lg"
                                disabled={isAnalyzing || !selectedImage}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        AI 分析中，請稍候...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={18} />
                                        開始文法批改
                                    </>
                                )}
                            </button>
                        </div>

                        {correctError && (
                            <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <span>{correctError}</span>
                            </div>
                        )}
                    </div>

                    {/* Correction Results */}
                    {correctionResult && (
                        <div className="flex flex-col gap-4 animate-slide-up">
                            {/* Detected Raw Text */}
                            {correctionResult.detected_text && (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                                        <ImageIcon size={12} /> 辨識到的原文內容
                                    </h4>
                                    <p className="text-sm text-slate-700 font-mono whitespace-pre-wrap">
                                        {correctionResult.detected_text}
                                    </p>
                                </div>
                            )}

                            {/* Corrections Cards */}
                            <h3 className="text-sm font-bold text-gray-500 px-1 uppercase tracking-wider">
                                文法批改結果
                            </h3>

                            {correctionResult.corrections && correctionResult.corrections.length > 0 ? (
                                correctionResult.corrections.map((corr, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                                        {/* Status Header */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                                句子 {idx + 1}
                                            </span>
                                            {corr.has_error ? (
                                                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-600 border border-red-100 text-xs font-extrabold rounded-full">
                                                    <AlertCircle size={12} /> 有文法錯誤
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-600 border border-green-100 text-xs font-extrabold rounded-full">
                                                    <CheckCircle size={12} /> 文法正確
                                                </span>
                                            )}
                                        </div>

                                        {/* Original and Corrected */}
                                        <div className="flex flex-col gap-2 mt-1">
                                            <div className="bg-red-50/30 p-3 rounded-lg border border-red-100/40">
                                                <p className="text-xs font-bold text-red-500 uppercase tracking-tight mb-1">
                                                    原句 (Original)
                                                </p>
                                                <p className="text-gray-800 font-medium">
                                                    {corr.original}
                                                </p>
                                            </div>

                                            {corr.has_error && (
                                                <>
                                                    <div className="flex justify-center text-indigo-400">
                                                        <ArrowRight size={18} className="transform rotate-90 sm:rotate-0" />
                                                    </div>
                                                    <div className="bg-green-50/30 p-3 rounded-lg border border-green-100/40">
                                                        <p className="text-xs font-bold text-green-600 uppercase tracking-tight mb-1">
                                                            建議修改後 (Corrected)
                                                        </p>
                                                        <p className="text-indigo-900 font-semibold flex items-center gap-2">
                                                            {corr.corrected}
                                                            <button
                                                                onClick={() => speak(corr.corrected)}
                                                                className="p-1 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"
                                                                title="播放語音"
                                                            >
                                                                <Volume2 size={14} />
                                                            </button>
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Explanation */}
                                        {corr.explanation && (
                                            <div className="mt-2 pt-3 border-t border-gray-100">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tight mb-1">
                                                    批改說明 (Explanation)
                                                </p>
                                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                    {corr.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center text-gray-400">
                                    沒有在圖片中辨識出任何可以分析的日文句子。
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
