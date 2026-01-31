import React, { useState, useEffect } from 'react';
import { Save, Key, Bot, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { getApiKey, setApiKey, getModelName, setModelName, fetchAvailableModels } from '../services/ai';

import { version } from '../../package.json';

export function Settings() {
    const [key, setKey] = useState('');
    const [model, setModel] = useState('');
    const [saved, setSaved] = useState(false);

    // New state for model fetching
    const [availableModels, setAvailableModels] = useState([]);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const storedKey = getApiKey();
        if (storedKey) setKey(storedKey);
        setModel(getModelName());
    }, []);

    const handleSave = () => {
        setApiKey(key);
        setModelName(model);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleFetchModels = async () => {
        if (!key) return;
        setIsLoadingModels(true);
        setFetchError(null);
        try {
            const models = await fetchAvailableModels(key);
            setAvailableModels(models);
            // If current model is not in list (and list is not empty), maybe suggest the first one?
            // For now just show the list
        } catch (err) {
            setFetchError(err.message);
            setAvailableModels([]);
        } finally {
            setIsLoadingModels(false);
        }
    };

    return (
        <div className="flex flex-col gap-6" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-end mb-4">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Settings</h2>
                <span className="text-sm text-gray-400">v{version}</span>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 className="flex items-center gap-2" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                    <Key size={20} className="text-indigo-500" />
                    Google Gemini API Key
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    To enable automatic verb conjugation and examples, please enter your free Gemini API Key.
                    <br />
                    (Stored locally on your device)
                </p>

                <div className="flex flex-col gap-3">
                    <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter your API Key here..."
                        style={{
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'rgba(255,255,255,0.5)',
                            fontFamily: 'monospace'
                        }}
                    />

                    <div className="flex items-center gap-2 mt-4" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        <Bot size={20} className="text-indigo-500" />
                        AI Model
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        If you encounter 404 errors, try changing this. (e.g. gemini-1.5-flash, gemini-pro)
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
                            disabled={!key || isLoadingModels}
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

                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ alignSelf: 'flex-start' }}
                    >
                        {saved ? 'Saved!' : 'Save Key'}
                        <Save size={18} />
                    </button>
                </div>

                <div style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'hsl(var(--indigo-500))', textDecoration: 'underline' }}
                    >
                        Get a free API Key →
                    </a>
                </div>
            </div>
        </div>
    );
}
