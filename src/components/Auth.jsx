import React, { useState } from 'react';
import { LogIn, Sparkles, Languages, Save, Database, Key } from 'lucide-react';
import { getSupabaseClient, setSupabaseConfig } from '../services/supabase';
import { APP_VERSION } from '../app-version';

export function Auth({ onSession }) {
    const [loading, setLoading] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
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
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 flex items-center justify-center mb-8 animate-float">
                <Languages size={40} className="text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nihongo Memo</h1>
            <p className="text-gray-500 mb-10 max-w-xs">
                您的專屬日文學習隨身本。登入即可同步所有單字與文法。
            </p>

            {showConfig ? (
                <div className="w-full max-w-sm glass-card p-6 animate-in slide-in-from-bottom-5 fade-in">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                        <Database size={18} />
                        設定資料庫連線
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 text-left">
                        檢測到缺少 Supabase 設定（可能是清除快取導致）。請手動輸入以恢復連線。
                    </p>
                    <div className="flex flex-col gap-3 mb-4">
                        <div className="text-left">
                            <label className="text-xs font-bold text-gray-600 ml-1">Project URL</label>
                            <input
                                type="text"
                                value={supabaseUrl}
                                onChange={(e) => setSupabaseUrl(e.target.value)}
                                placeholder="https://your-project.supabase.co"
                                className="w-full p-2 rounded-lg border border-gray-200 text-sm bg-white/50"
                            />
                        </div>
                        <div className="text-left">
                            <label className="text-xs font-bold text-gray-600 ml-1">Anon Key</label>
                            <input
                                type="password"
                                value={supabaseKey}
                                onChange={(e) => setSupabaseKey(e.target.value)}
                                placeholder="your-anon-key"
                                className="w-full p-2 rounded-lg border border-gray-200 text-sm bg-white/50"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSaveConfig}
                        className="btn btn-primary w-full py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                        <Save size={16} />
                        儲存並繼續
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="btn btn-primary w-full max-w-sm py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <LogIn size={20} />
                            使用 Google 帳號登入
                        </>
                    )}
                </button>
            )}

            <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="glass-card p-4 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Sparkles size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">AI 自動解析</span>
                </div>
                <div className="glass-card p-4 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                        <LogIn size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">跨裝置同步</span>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
                v{APP_VERSION} 登入即代表您同意本工具存取您的公開個人資訊以進行身分識別。
            </p>
        </div>
    );
}
