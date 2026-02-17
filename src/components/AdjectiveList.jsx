import React, { useState } from 'react';
import { Volume2, Trash2, ChevronDown, ChevronUp, Plus, Sparkles } from 'lucide-react';
import { AdjectiveDetailView } from './AdjectiveDetailView';
import { useSpeech } from '../hooks/useSpeech';

export function AdjectiveList({ items, onDelete, onAddClick }) {
    const [expandedId, setExpandedId] = useState(null);
    const { speak } = useSpeech();

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-gray-300">
                    <Sparkles size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">還沒有形容詞紀錄</h3>
                <p className="text-gray-400 text-sm mb-6">點擊下方的按鈕開始記錄第一個日文形容詞吧！</p>
                <button onClick={onAddClick} className="btn btn-primary px-6">
                    <Plus size={18} /> 開始學習
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {items.map((item) => {
                // Safety check
                if (!item || !item.kanji) return null;

                const isExpanded = expandedId === item.id;
                return (
                    <div
                        key={item.id}
                        className={`glass-card transition-all duration-300 ${isExpanded ? 'ring-2 ring-indigo-500 ring-opacity-50' : 'hover:shadow-md'}`}
                        style={{ padding: '0', overflow: 'hidden' }}
                    >
                        <div
                            className="p-4 flex items-center gap-4 cursor-pointer"
                            onClick={() => toggleExpand(item.id)}
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                <span className="font-bold text-lg">{item.kanji[0]}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{item.kanji}</h3>
                                    <span className="text-gray-400 text-xs">{item.kana}</span>
                                </div>
                                <p className="text-gray-500 text-sm truncate">{item.meaning}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        speak(item.kanji);
                                    }}
                                    className="p-2 text-gray-300 hover:text-indigo-500 transition-colors"
                                >
                                    <Volume2 size={20} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('確定要刪除這個形容詞嗎？')) {
                                            onDelete(item.id);
                                        }
                                    }}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="text-gray-300">
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="px-5 pb-6 border-t border-gray-50 pt-6 animate-fade-in bg-white/50">
                                <AdjectiveDetailView adjective={item} showHeader={false} />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Quick Add Button */}
            <button
                onClick={onAddClick}
                className="btn btn-primary w-full py-4 rounded-2xl shadow-lg shadow-indigo-100 mt-2"
                style={{ borderStyle: 'dashed', borderWidth: '2px', background: 'transparent', color: 'var(--indigo-600)', borderColor: 'var(--indigo-200)' }}
            >
                <Plus size={20} />
                新增更多形容詞 / 副詞
            </button>
        </div>
    );
}
