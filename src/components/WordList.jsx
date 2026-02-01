import React, { useState } from 'react';
import { PlusCircle, Volume2, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { WordDetailView } from './WordDetailView';

export function WordList({ words, onDelete, onAddClick }) {
    const [expandedId, setExpandedId] = useState(null);

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

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-4">
            {words.map(word => {
                const isExpanded = expandedId === word.id;
                return (
                    <div
                        key={word.id}
                        className="glass-card overflow-hidden transition-all duration-300"
                        style={{
                            padding: isExpanded ? '0' : '1rem',
                            cursor: 'pointer',
                        }}
                        onClick={() => toggleExpand(word.id)}
                    >
                        {!isExpanded ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{word.kanji}</div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                speak(word.kanji);
                                            }}
                                            className="btn-ghost"
                                            style={{ padding: '0.25rem', color: 'var(--text-muted)' }}
                                        >
                                            <Volume2 size={16} />
                                        </button>
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{word.kana}</div>
                                    <div style={{ marginTop: '0.25rem' }}>{word.meaning}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(word.id);
                                        }}
                                        className="btn-ghost p-2 text-sakura-500 hover:bg-sakura-50 rounded-full"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <ChevronDown size={20} className="text-gray-400" />
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-white">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <div className="text-xs text-gray-400 font-mono">ID: {word.id}</div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(word.id);
                                            }}
                                            className="btn-ghost p-2 text-sakura-500 hover:bg-sakura-50 rounded-full"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <ChevronUp size={20} className="text-indigo-500" />
                                    </div>
                                </div>
                                <WordDetailView word={word} />
                            </div>
                        )}
                    </div>
                );
            })}

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
