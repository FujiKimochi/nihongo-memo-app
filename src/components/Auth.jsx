import React, { useState } from 'react';
import { LogIn, Sparkles, Languages, Save, Database, Key, HelpCircle } from 'lucide-react';
import { getSupabaseClient, setSupabaseConfig } from '../services/supabase';
import { APP_VERSION } from '../app-version';
import { SetupGuide } from './SetupGuide';

export function Auth({ onSession }) {
    const [loading, setLoading] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [supabaseUrl, setSupabaseUrl] = useState('');
    const [supabaseKey, setSupabaseKey] = useState('');

    const handleGoogleLogin = async () => {
        const supabase = getSupabaseClient();
        if (!supabase) {
            setShowConfig(true);
            return;
        }

        try {
            setLoading(true);
            const redirectTo = window.location.origin + window.location.pathname;
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectTo
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error('Login error:', error.message);
            alert('登入失敗: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfig = () => {
        if (!supabaseUrl || !supabaseKey) {
            alert('請完整填寫 URL 和 Key');
            return;
        }
        setSupabaseConfig(supabaseUrl, supabaseKey);
        setShowConfig(false);
        // Automatically try to login again or just let user click
        alert('設定已儲存，請再次點擊登入按鈕');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'linear-gradient(135deg, #f5f7ff 0%, #fff 100%)',
            textAlign: 'center'
        }}>
            {/* Logo and Header */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} className="animate-float">
                    <Languages size={40} style={{ color: '#fff' }} />
                </div>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>
                    Nihongo Memo
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                    您的專屬日文學習隨身本。<br />
                    登入即可同步所有單字與文法。
                </p>
            </div>

            {/* Main Action Area */}
            <div style={{ width: '100%', maxWidth: '400px', marginBottom: '48px' }}>
                {showConfig ? (
                    <div style={{
                        background: '#fff',
                        padding: '28px',
                        borderRadius: '24px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #e5e7eb',
                        textAlign: 'left'
                    }} className="animate-in slide-in-from-bottom-5 fade-in">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                                <Database size={18} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                                設定資料庫連線
                            </h3>
                        </div>

                        <div style={{ padding: '12px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fee2e2', color: '#991b1b', fontSize: '0.75rem', marginBottom: '20px', lineHeight: 1.5 }}>
                            <strong>連線中斷：</strong> 檢測到缺少 Supabase 設定（可能是清除快取導致）。請手動輸入以恢復連線。
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '6px', marginLeft: '4px' }}>PROJECT URL</label>
                                <input
                                    type="text"
                                    value={supabaseUrl}
                                    onChange={(e) => setSupabaseUrl(e.target.value)}
                                    placeholder="https://your-project.supabase.co"
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #d1d5db',
                                        fontSize: '0.875rem', background: '#f9fafb', outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '6px', marginLeft: '4px' }}>ANON KEY</label>
                                <input
                                    type="password"
                                    value={supabaseKey}
                                    onChange={(e) => setSupabaseKey(e.target.value)}
                                    placeholder="your-anon-key"
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #d1d5db',
                                        fontSize: '0.875rem', background: '#f9fafb', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSaveConfig}
                            style={{
                                width: '100%', background: '#4f46e5', color: '#fff',
                                padding: '14px', borderRadius: '12px', border: 'none',
                                fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: '8px', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#4338ca'}
                            onMouseOut={e => e.currentTarget.style.background = '#4f46e5'}
                        >
                            <Save size={18} />
                            儲存並繼續
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{
                            width: '100%', background: '#4f46e5', color: '#fff',
                            padding: '18px', borderRadius: '20px', border: 'none',
                            fontSize: '1rem', fontWeight: 700, letterSpacing: '0.025em',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '12px', cursor: loading ? 'default' : 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                            transition: 'all 0.2s', opacity: loading ? 0.8 : 1
                        }}
                        className="hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? (
                            <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} className="animate-spin" />
                        ) : (
                            <>
                                <LogIn size={20} />
                                使用 Google 帳號登入
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Setup Guide Banner - Highly Prominent */}
            <div
                onClick={() => setShowGuide(true)}
                style={{
                    width: '100%', maxWidth: '400px',
                    margin: '0 auto 40px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7ff 100%)',
                    borderRadius: '24px',
                    border: '1px solid #c7d2fe',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.1)'
                }}
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(79, 70, 229, 0.15)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 70, 229, 0.1)';
                }}
            >
                <div style={{
                    width: '48px', height: '48px',
                    background: '#fff',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4f46e5',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    flexShrink: 0
                }}>
                    <HelpCircle size={24} />
                </div>
                <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '2px' }}>
                        第一次使用此App？
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#4338ca', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        點此查看新手設定指南 <ChevronRight size={14} />
                    </div>
                </div>
            </div>

            {/* Features Info */}
            <div style={{
                width: '100%', maxWidth: '500px',
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px',
                marginBottom: '40px'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    padding: '20px',
                    borderRadius: '24px',
                    border: '1px solid #eef2ff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{ width: '48px', height: '48px', background: '#e0e7ff', color: '#4338ca', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1f2937' }}>AI 自動解析</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>自動生成語法與例句</div>
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    padding: '20px',
                    borderRadius: '24px',
                    border: '1px solid #fdf2f8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{ width: '48px', height: '48px', background: '#fce7f3', color: '#be185d', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LogIn size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1f2937' }}>跨裝置同步</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>隨地複習，雲端存取</div>
                    </div>
                </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: 1.6 }}>
                <span style={{
                    display: 'inline-block', padding: '2px 8px', background: '#f3f4f6',
                    borderRadius: '6px', color: '#4b5563', fontWeight: 600, marginRight: '8px'
                }}>
                    v{APP_VERSION}
                </span>
                登入即代表您同意本工具存取您的公開個人資訊以進行身分識別。
            </p>

            {showGuide && <SetupGuide onClose={() => setShowGuide(false)} />}
        </div>
    );
}
