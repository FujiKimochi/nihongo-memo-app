import React, { useState } from 'react';
import { Book, FileText, Award, Info } from 'lucide-react';
import { VerbReference } from './VerbReference';
import { ParticleReference } from './ParticleReference';
import { KeigoReference } from './KeigoReference';

export function StudyNotes() {
    const [subTab, setSubTab] = useState('verbs'); // 'verbs', 'particles', 'keigo'

    const tabs = [
        { id: 'verbs', label: '動詞變化', icon: Book },
        { id: 'particles', label: '助詞邏輯', icon: Info },
        { id: 'keigo', label: '敬語速查', icon: Award }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50/50 -m-6 min-h-screen">
            {/* Sub-tab Switcher */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 p-2 pt-4 px-4">
                <div className="flex bg-gray-100/50 p-1 rounded-xl">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSubTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                                subTab === tab.id
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 pb-24">
                {subTab === 'verbs' && <VerbReference />}
                {subTab === 'particles' && <ParticleReference />}
                {subTab === 'keigo' && <KeigoReference />}
            </div>
        </div>
    );
}
