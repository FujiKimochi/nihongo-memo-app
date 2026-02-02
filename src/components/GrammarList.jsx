import React, { useState } from 'react';
import { PlusCircle, Info, ChevronDown, ChevronUp, Trash2, BookOpen } from 'lucide-react';
import { GrammarDetailView } from './GrammarDetailView';

export function GrammarList({ items, onDelete, onAddClick }) {
    const [expandedId, setExpandedId] = useState(null);

    if (items.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
                <p>還沒有文法喔。<br />試著加入第一個文法筆記吧！</p>
                <button
                    onClick={onAddClick}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem' }}
                >
                    新增文法
                </button>
            </div>
        );
    }

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-4">
            {items.map(item => {
                const isExpanded = expandedId === item.id;
                return (
                    <div
                        key={item.id}
                        className="glass-card overflow-hidden transition-all duration-300"
                        style={{
                            padding: isExpanded ? '0' : '1rem',
                            cursor: 'pointer',
                            borderLeft: isExpanded ? '4px solid hsl(var(--indigo-500))' : '1px solid var(--border-color)'
                        }}
                        onClick={() => toggleExpand(item.id)}
                    >
                        {!isExpanded ? (
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--indigo-600)' }}>{item.grammarPoint}</div>
                                        <span className="bg-indigo-50 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded border border-indigo-100 uppercase font-bold">Grammar</span>
                                    </div>
                                    <div style={{ color: 'var(--text-color)', marginTop: '0.25rem', fontWeight: 500 }}>{item.meaning}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id);
                                        }}
                                        className="btn-ghost p-2 text-sakura-500 hover:bg-sakura-50 rounded-full"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <ChevronDown size={20} className="text-gray-400" />
                                </div>
                            </div>
                        ) : (
                            <div className="p-5 bg-white">
                                <div className="flex justify-between items-center mb-6 border-b pb-3">
                                    <div className="flex items-center gap-2 text-indigo-600">
                                        <BookOpen size={20} />
                                        <span className="font-bold">文法詳細解析</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(item.id);
                                            }}
                                            className="btn-ghost p-2 text-sakura-500 hover:bg-sakura-50 rounded-full"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <ChevronUp size={20} className="text-indigo-500" />
                                    </div>
                                </div>
                                <GrammarDetailView grammar={item} />
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
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 100
                }}
            >
                <PlusCircle size={24} />
            </button>
        </div>
    );
}
