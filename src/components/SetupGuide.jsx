import React, { useState } from 'react';
import { Database, Key, Sparkles, ChevronRight, X, ArrowRight, ExternalLink } from 'lucide-react';

export function SetupGuide({ onClose }) {
    const [step, setStep] = useState(1);

    const steps = [
        {
            title: "歡迎！如何開始使用？",
            icon: <Sparkles size={32} className="text-indigo-500" />,
            content: (
                <div className="space-y-4">
                    <p>Nihongo Memo 是一個完全免費、無需伺服器維護的日文學習工具。</p>
                    <p>為了保障您的資料隱私與擁有權，我們採用<b>「自帶資料庫 (BYOD)」</b>模式。</p>
                    <p>這代表您需要申請兩個免費的服務來驅動這個 App：</p>
                    <ol className="list-decimal list-inside space-y-2 text-left ml-4 font-medium">
                        <li><b>Supabase</b>：免費的雲端資料庫，用來儲存您的單字與文法。</li>
                        <li><b>Google Gemini</b>：免費的 AI 模型，用來自動生成例句與變化。</li>
                    </ol>
                    <div className="bg-indigo-50 p-3 rounded-lg text-sm text-indigo-700">
                        別擔心！這兩個服務都有永久免費額度，且申請過程只需約 5 分鐘。
                    </div>
                </div>
            )
        },
        {
            title: "步驟一：取得 Supabase 資料庫",
            icon: <Database size={32} className="text-green-500" />,
            content: (
                <div className="space-y-4 text-left">
                    <p>用來同步所有裝置上的學習紀錄。</p>
                    <ol className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">1</span>
                            <div>
                                前往 <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold flex items-center gap-1 inline-flex">
                                    Supabase 官網 <ExternalLink size={12} />
                                </a> 並註冊/登入。
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">2</span>
                            <div>點擊 <b>"New Project"</b>，輸入任意名稱 (例如 NihongoMemo) 與密碼。</div>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">3</span>
                            <div>
                                等待專案建立完成後，點擊左側選單的 <b>"Project Settings"</b> (齒輪圖示) &gt; <b>"API"</b>。
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">4</span>
                            <div className="bg-gray-50 p-2 rounded w-full border border-gray-200">
                                複製以下兩項資訊：<br />
                                1. <b>Project URL</b> (網址)<br />
                                2. <b>anon public key</b> (金鑰)
                            </div>
                        </li>
                    </ol>
                </div>
            )
        },
        {
            title: "步驟二：取得 Google AI 金鑰",
            icon: <Key size={32} className="text-blue-500" />,
            content: (
                <div className="space-y-4 text-left">
                    <p>用來自動分析單字、生成例句。</p>
                    <ol className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">1</span>
                            <div>
                                前往 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold flex items-center gap-1 inline-flex">
                                    Google AI Studio <ExternalLink size={12} />
                                </a>。
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">2</span>
                            <div>登入您的 Google 帳號。</div>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">3</span>
                            <div>
                                點擊 <b>"Create API Key"</b> &gt; <b>"Create API key in new project"</b>。
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 fw-bold">4</span>
                            <div className="bg-gray-50 p-2 rounded w-full border border-gray-200">
                                複製生成的 <b>API Key</b> (以 AIza 開頭的字串)。
                            </div>
                        </li>
                    </ol>
                </div>
            )
        },
        {
            title: "完成！開始設定",
            icon: <Sparkles size={32} className="text-yellow-500" />,
            content: (
                <div className="space-y-4">
                    <p>您現在已經準備好所有需要的資訊了！</p>
                    <div className="bg-green-50 p-4 rounded-xl space-y-2 text-green-900">
                        <p className="font-bold">接下來：</p>
                        <ol className="list-decimal list-inside text-sm">
                            <li>如果是第一次登入，系統會請您輸入 <b>Supabase URL</b> 與 <b>Key</b>。</li>
                            <li>登入後，在「設定」頁面輸入您的 <b>Google API Key</b>。</li>
                        </ol>
                    </div>
                    <p className="text-sm text-gray-500">
                        這些設定只會儲存在您自己的瀏覽器中，我們不會留存任何資料。
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2 font-bold text-gray-700">
                        {steps[step - 1].icon}
                        <span>新手教學 ({step}/{steps.length})</span>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[300px] flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-gray-900">{steps[step - 1].title}</h2>
                    <div className="text-gray-600 flex-1">
                        {steps[step - 1].content}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                    <button
                        onClick={() => setStep(s => Math.max(1, s - 1))}
                        className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${step === 1 ? 'invisible' : 'text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        上一頁
                    </button>

                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${i + 1 === step ? 'bg-indigo-500' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (step < steps.length) {
                                setStep(s => s + 1);
                            } else {
                                onClose();
                            }
                        }}
                        className="bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                    >
                        {step === steps.length ? '我知道了' : '下一步'}
                        {step < steps.length && <ArrowRight size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
