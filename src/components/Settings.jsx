import React, { useState, useEffect } from 'react';
import { getModelName, setModelName, fetchAvailableModels, checkAIHealth } from '../services/ai';
import { getSupabaseConfig, setSupabaseConfig, getSupabaseClient, settingsSupabaseService } from '../services/supabase';
import { Database, Cloud, RefreshCw, CheckCircle, AlertCircle, Save, Bot, LogOut, User } from 'lucide-react';

import { APP_VERSION } from '../app-version';

export function Settings() {
    const [model, setModel] = useState('');
    const [saved, setSaved] = useState(false);

    // Supabase config
    const [supabaseUrl, setSupabaseUrl] = useState('');
    const [supabaseKey, setSupabaseKey] = useState('');

    // New state for model fetching
    const [availableModels, setAvailableModels] = useState([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [user, setUser] = useState(null);

    // AI Health state
    const [healthStatus, setHealthStatus] = useState(null); // null, 'testing', 'success', 'error'
    const [healthData, setHealthData] = useState(null);

    useEffect(() => {
        const client = getSupabaseClient();
        if (client) {
            client.auth.getUser().then(({ data: { user } }) => {
                setUser(user);
            });
        }
        setModel(getModelName());

        const sbc = getSupabaseConfig();
        setSupabaseUrl(sbc.url);
        setSupabaseKey(sbc.key);

        // Fetch cloud settings if logged in
        if (client) {
            settingsSupabaseService.fetchSettings().then(cloudSettings => {
                if (cloudSettings) {
                    if (cloudSettings.ai_model) {
                        setModel(cloudSettings.ai_model);
                        setModelName(cloudSettings.ai_model);
                    }
                }
            });
        }
    }, []);

    const handleSave = async () => {
        setModelName(model);
        setSupabaseConfig(supabaseUrl, supabaseKey);

        // Also sync to cloud
        try {
            await settingsSupabaseService.upsertSettings({
                aiModel: model
            });
        } catch (err) {
            console.error('Failed to sync settings to cloud:', err);
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleFetchModels = async () => {
        setIsLoadingModels(true);
        setFetchError(null);
        try {
            const models = await fetchAvailableModels();
            setAvailableModels(models.map(m => m.name)); // Update state with model names
            // If current model is not in list (and list is not empty), maybe suggest the first one?
            // For now just show the list
        } catch (err) {
            setFetchError(err.message);
            setAvailableModels([]);
        } finally {
            setIsLoadingModels(false);
        }
    };
    const handleTestHealth = async () => {
        setHealthStatus('testing');
        setHealthData(null);
        try {
            const res = await checkAIHealth();
            if (res.status === 'ok') {
                setHealthStatus('success');
                setHealthData(res);
            } else {
                setHealthStatus('error');
                setHealthData(res);
            }
        } catch (err) {
            setHealthStatus('error');
            setHealthData({ message: err.message });
        }
    };
    const handleLogout = async () => {
        const client = getSupabaseClient();
        if (client) {
            await client.auth.signOut();
            window.location.reload(); // Hard reload to clear all states
        }
    };

    return (
        <div className="flex flex-col gap-6" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-end mb-4">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Settings</h2>
                <span className="text-sm text-gray-400">v{APP_VERSION}</span>
            </div>

            {/* User Account Section */}
            {user && (
                <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid var(--indigo-100)', background: 'linear-gradient(to bottom right, #ffffff, #f5f3ff)' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">目前登入帳戶</p>
                                <p className="text-gray-900 font-medium">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors tooltip"
                            title="登出"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            )}

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 className="flex items-center gap-2" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                    <Bot size={20} className="text-indigo-500" />
                    AI Model Settings
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Choose the backend AI model for word generation and analysis.
                </p>

                <div className="flex flex-col gap-3">
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        If you encounter slow responses, try switching to a different model like gemini-1.5-flash.
                    </p>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="e.g. gemini-1.5-flash"
                        list="model-suggestions"
                        style={{
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'rgba(255,255,255,0.5)',
                            fontFamily: 'monospace'
                        }}
                    />

                    {/* Model Fetching Controls */}
                    <div className="flex gap-2 items-center" style={{ marginTop: '0.5rem' }}>
                        <button
                            onClick={handleFetchModels}
                            disabled={isLoadingModels}
                            className="btn btn-sm"
                            style={{
                                fontSize: '0.8rem',
                                padding: '0.4rem 0.8rem',
                                background: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-color)'
                            }}
                        >
                            {isLoadingModels ? <RefreshCw className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                            {availableModels.length > 0 ? 'Refresh Models' : 'Fetch Available Models'}
                        </button>

                        {fetchError && (
                            <span className="text-red-500 flex items-center gap-1" style={{ fontSize: '0.8rem' }}>
                                <AlertCircle size={14} /> Error
                            </span>
                        )}

                        {availableModels.length > 0 && (
                            <span className="text-green-500 flex items-center gap-1" style={{ fontSize: '0.8rem' }}>
                                <CheckCircle size={14} /> Found {availableModels.length} models
                            </span>
                        )}
                    </div>

                    {/* Dropdown for found models */}
                    {availableModels.length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <select
                                onChange={(e) => setModel(e.target.value)}
                                value={availableModels.includes(model) ? model : ''}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-color)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <option value="" disabled>Select a valid model...</option>
                                {availableModels.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        borderRadius: '1rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div className="flex justify-between items-center mb-2">
                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>Backend Connection Test</span>
                            <button
                                onClick={handleTestHealth}
                                disabled={healthStatus === 'testing'}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                {healthStatus === 'testing' ? <RefreshCw className="animate-spin" size={12} /> : <RefreshCw size={12} />}
                                Run Test
                            </button>
                        </div>

                        {healthStatus === 'testing' && <p className="text-xs text-gray-500">Connecting to Supabase Edge Function...</p>}

                        {healthStatus === 'success' && (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-green-600 font-bold text-xs">
                                    <CheckCircle size={14} /> {healthData?.message}
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <div className="bg-white p-2 rounded border border-green-100 text-[10px]">
                                        <div className="text-gray-400 uppercase font-bold">Gemini Key</div>
                                        <div className={healthData?.config?.hasGeminiKey ? "text-green-600" : "text-red-500"}>
                                            {healthData?.config?.hasGeminiKey ? "✅ 已設定" : "❌ 未設定"}
                                        </div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-green-100 text-[10px]">
                                        <div className="text-gray-400 uppercase font-bold">Timestamp</div>
                                        <div className="text-gray-600 truncate">{healthData?.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {healthStatus === 'error' && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                                <div className="flex items-center gap-2 font-bold mb-1">
                                    <AlertCircle size={14} /> 測試失敗 {healthData?.statusCode && `(Status: ${healthData.statusCode})`}
                                </div>
                                <p className="font-mono break-all">{healthData?.message}</p>
                                {healthData?.details && (
                                    <div className="mt-2 p-2 bg-red-100/50 rounded border border-red-200 overflow-auto max-h-24">
                                        <p className="font-bold text-[10px] uppercase text-red-400 mb-1">Raw Details:</p>
                                        <pre className="text-[10px] whitespace-pre-wrap">{healthData.details}</pre>
                                    </div>
                                )}
                                <p className="mt-2 text-red-400 text-[10px]">請確認已部署 Edge Function 且設定了 GEMINI_API_KEY。</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                    >
                        {saved ? 'Saved!' : 'Save Settings'}
                        <Save size={18} />
                    </button>

                </div>
            </div>

            {/* Supabase Sync Section */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 className="flex items-center gap-2" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                    <Cloud size={20} className="text-blue-500" />
                    Supabase 雲端同步
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    輸入 Supabase 設定以啟用跨裝置自動同步功能。
                    <br />
                    (URL 通常為 https://[ref].supabase.co)
                </p>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>Project URL</label>
                        <input
                            type="text"
                            value={supabaseUrl}
                            onChange={(e) => setSupabaseUrl(e.target.value)}
                            placeholder="https://your-project.supabase.co"
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'rgba(255,255,255,0.5)',
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>Anon Key / API Key</label>
                        <input
                            type="password"
                            value={supabaseKey}
                            onChange={(e) => setSupabaseKey(e.target.value)}
                            placeholder="your-anon-key"
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'rgba(255,255,255,0.5)',
                            }}
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ alignSelf: 'flex-start', background: 'var(--indigo-600)' }}
                    >
                        {saved ? '已儲存！' : '儲存同步設定'}
                        <Save size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
