import React, { useState } from 'react';
import { Trash2, MessageSquare, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { DialogueDetailView } from './DialogueDetailView';

export function DialogueList({ items, onDelete, onAddClick }) {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-gray-300">
                    <MessageSquare size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">尚無情境對話</h3>
                <p className="text-gray-400 text-sm mb-6">點擊下方的 + 按鈕，讓 AI 為您生成專屬對話情境吧！</p>
                <button onClick={onAddClick} className="btn btn-primary px-6">
                    <Plus size={18} /> 開始練習
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {items.map((item) => {
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
                                <MessageSquare size={24} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-lg truncate">{item.scenario}</h3>
                                <p className="text-gray-400 text-xs truncate">{item.description}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('確定要刪除這個對話嗎？')) {
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
                            <div className="px-4 pb-6 border-t border-gray-50 pt-4 bg-gray-50/50">
                                <DialogueDetailView dialogue={item} onSpeak={handleSpeak} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
