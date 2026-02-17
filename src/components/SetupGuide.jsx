import React, { useState } from 'react';
import { Database, Key, Sparkles, ChevronRight, X, ArrowRight, ExternalLink } from 'lucide-react';

export function SetupGuide({ onClose }) {
    const [step, setStep] = useState(1);

    const steps = [
        {
            title: "歡迎！如何開始使用？",
            icon: <Sparkles size={32} style={{ color: '#6366f1' }} />,
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p style={{ margin: 0, lineHeight: 1.6 }}>Nihongo Memo 是一個完全免費、無需伺服器維護的日文學習工具。</p>
                    <div style={{ padding: '16px', background: '#f5f7ff', borderRadius: '16px', border: '1px solid #e0e7ff' }}>
                        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: '#4338ca' }}>「自帶資料庫 (BYOD)」模式</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>為了保障您的資料隱私與擁有權，您需要申請兩個免費的服務來驅動這個 App：</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { name: 'Supabase', desc: '雲端資料庫，儲存您的單字與文法' },
                            { name: 'Google Gemini', desc: 'AI 模型，自動生成例句與變化' }
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4f46e5' }}>{idx + 1}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '12px', fontSize: '0.8125rem', color: '#065f46', textAlign: 'center' }}>
                        ✨ 兩項服務均有<strong>永久免費額度</strong>，申請只需 5 分鐘。
                    </div>
                </div>
            )
        },
        {
            title: "步驟一：連結 Supabase 資料庫",
            icon: <Database size={32} style={{ color: '#10b981' }} />,
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>訪問官網</p>
                            <a
                                href="https://supabase.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: '#10b981', color: '#fff', textDecoration: 'none',
                                    padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem',
                                    boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
                                }}
                            >
                                前往 Supabase 官網 <ExternalLink size={16} />
                            </a>
                        </div>

                        <div style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280' }}>設定步驟</p>
                            <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>
                                註冊後點擊 <b>"New Project"</b>，建立完成後至 <b>"Project Settings" &gt; "API"</b>。
                            </p>
                        </div>
                    </div>

                    <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>🔑 複製兩項關鍵資訊</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#fff', borderRadius: '8px' }}>
                                <span style={{ color: '#6b7280' }}>1. URL</span>
                                <span style={{ fontWeight: 700, color: '#111827' }}>Project URL</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#fff', borderRadius: '8px' }}>
                                <span style={{ color: '#6b7280' }}>2. Key</span>
                                <span style={{ fontWeight: 700, color: '#111827' }}>anon public key</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "步驟二：取得 Google AI 金鑰",
            icon: <Key size={32} style={{ color: '#3b82f6' }} />,
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8' }}>取得金鑰</p>
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: '#3b82f6', color: '#fff', textDecoration: 'none',
                                    padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem',
                                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
                                }}
                            >
                                前往 Google AI Studio <ExternalLink size={16} />
                            </a>
                        </div>

                        <div style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280' }}>設定步驟</p>
                            <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>
                                點擊 <b>"Create API Key"</b> &gt; <b>"Create API key in new project"</b>。
                            </p>
                        </div>
                    </div>

                    <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>🔑 複製關鍵字串</p>
                        <div style={{ padding: '12px', background: '#fff', borderRadius: '8px', fontSize: '0.8125rem', textAlign: 'center', color: '#1d4ed8', fontWeight: 700 }}>
                            以 "AIza..." 開頭的字串
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "完成！開始享受學習",
            icon: <Sparkles size={32} style={{ color: '#f59e0b' }} />,
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ padding: '20px', background: '#ecfdf5', borderRadius: '20px', border: '1px solid #d1fae5' }}>
                        <p style={{ margin: '0 0 16px 0', fontWeight: 800, color: '#065f46', fontSize: '1rem' }}>接下來的操作：</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', background: '#34d399', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0 }}>1</div>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: '#064e3b' }}>第一次登入時，輸入 <b>Supabase</b> 的 URL 與 Key。</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', background: '#34d399', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0 }}>2</div>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: '#064e3b' }}>登入後，在 App 內的<b>「設定」</b>頁面貼上 <b>Gemini API Key</b>。</p>
                            </div>
                        </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', lineHeight: 1.5 }}>
                        所有設定皆加密儲存於您的本地瀏覽器，<br />我們絕不會收集您的任何資料。
                    </p>
                </div>
            )
        }
    ];

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
            <div style={{
                background: '#fff', borderRadius: '28px', width: '100%', maxWidth: '440px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', maxHeight: '90vh'
            }} className="animate-in zoom-in-95 duration-200">
                {/* Progress Bar */}
                <div style={{ height: '4px', background: '#f3f4f6', width: '100%' }}>
                    <div style={{
                        height: '100%', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                        width: `${(step / steps.length) * 100}%`, transition: 'width 0.3s ease'
                    }} />
                </div>

                {/* Header */}
                <div style={{ padding: '24px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#f5f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {steps[step - 1].icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                STEP {step} OF {steps.length}
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>新手教學</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ padding: '10px', background: '#f3f4f6', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}
                    >
                        <X size={20} color="#6b7280" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '0 24px 24px', overflowY: 'auto', flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111827', margin: '0 0 20px 0' }}>{steps[step - 1].title}</h3>
                    <div style={{ color: '#374151' }}>
                        {steps[step - 1].content}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '20px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
                    <button
                        onClick={() => setStep(s => Math.max(1, s - 1))}
                        style={{
                            padding: '10px 16px', borderRadius: '12px', border: 'none',
                            background: '#fff', color: '#4b5563', fontWeight: 700, fontSize: '0.875rem',
                            cursor: 'pointer', visibility: step === 1 ? 'hidden' : 'visible',
                            border: '1px solid #e5e7eb'
                        }}
                    >
                        上一頁
                    </button>

                    <button
                        onClick={() => {
                            if (step < steps.length) {
                                setStep(s => s + 1);
                            } else {
                                onClose();
                            }
                        }}
                        style={{
                            padding: '12px 24px', borderRadius: '14px', border: 'none',
                            background: step === steps.length ? '#10b981' : '#4f46e5', color: '#fff',
                            fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {step === steps.length ? '我準備好了！' : '下一步'}
                        {step < steps.length && <ArrowRight size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
