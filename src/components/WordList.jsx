import React from 'react';
import { PlusCircle, Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

export function WordList({ words, onDelete, onAddClick }) {
    if (words.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
                <p>還沒有單字喔。<br />試著加入第一個單字吧！</p>
                <button
                    onClick={onAddClick}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem' }}
                >
                    新增單字
                </button>
            </div>
        );
    }

    const { speak } = useSpeech();

    return (
        <div className="flex flex-col gap-4">
            {words.map(word => (
                <div key={word.id} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div className="flex items-center gap-2">
                            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{word.kanji}</div>
                            <button
                                onClick={() => speak(word.kanji)}
                                className="btn-ghost"
                                style={{ padding: '0.25rem', color: 'var(--text-muted)' }}
                            >
                                <Volume2 size={16} />
                            </button>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{word.kana}</div>
                        <div style={{ marginTop: '0.25rem' }}>{word.meaning}</div>
                    </div>
                    <button
                        onClick={() => onDelete(word.id)}
                        className="btn-ghost"
                        style={{ padding: '0.5rem', color: 'var(--sakura-500)' }}
                    >
                        ×
                    </button>
                </div>
            ))}

            <button
                onClick={onAddClick}
                className="btn btn-primary"
                style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '24px',
                    borderRadius: '50%',
                    width: '56px',
                    height: '56px',
                    padding: 0,
                    boxShadow: 'var(--shadow-lg)'
                }}
            >
                <PlusCircle size={24} />
            </button>
        </div>
    );
}
