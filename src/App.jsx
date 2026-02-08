import { useState } from 'react';
import { BookOpen, PlusCircle, Brain, Settings as SettingsIcon, Languages, FileText, MessageSquare } from 'lucide-react';
import { useVocabulary } from './hooks/useVocabulary';
import { useGrammar } from './hooks/useGrammar';
import { useDialogues } from './hooks/useDialogues';
import { AddWordForm } from './components/AddWordForm';
import { AddGrammarForm } from './components/AddGrammarForm';
import { AddDialogueForm } from './components/AddDialogueForm';
import { FlashcardDeck } from './components/FlashcardDeck';
import { GrammarFlashcards } from './components/GrammarFlashcards';
import { WordList } from './components/WordList';
import { GrammarList } from './components/GrammarList';
import { DialogueList } from './components/DialogueList';
import { Settings } from './components/Settings';

function App() {
    const { words, addWord, deleteWord } = useVocabulary();
    const { grammarItems, addGrammar, deleteGrammar } = useGrammar();
    const { dialogues, addDialogue, deleteDialogue } = useDialogues();

    const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'review', 'settings'
    const [activeCategory, setActiveCategory] = useState('vocabulary'); // 'vocabulary', 'grammar', 'dialogue'

    const handleAddWord = (word) => {
        addWord(word);
        setActiveTab('list');
    };

    const handleAddGrammar = (grammar) => {
        addGrammar(grammar);
        setActiveTab('list');
    };

    const handleAddDialogue = (dialogue) => {
        addDialogue(dialogue);
        setActiveTab('list');
    };

    const getCountDisplay = () => {
        switch (activeCategory) {
            case 'vocabulary': return `${words.length} 單字`;
            case 'grammar': return `${grammarItems.length} 文法`;
            case 'dialogue': return `${dialogues.length} 情境`;
            default: return '';
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="app-header flex-col items-stretch gap-3">
                <div className="flex justify-between items-center">
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'hsl(var(--sakura-500))' }}>✿</span>
                        Nihongo Memo
                    </h1>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {getCountDisplay()}
                    </div>
                </div>

                {/* Category Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveCategory('vocabulary')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-bold transition-all ${activeCategory === 'vocabulary'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Languages size={16} />
                        單字
                    </button>
                    <button
                        onClick={() => setActiveCategory('grammar')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-bold transition-all ${activeCategory === 'grammar'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <FileText size={16} />
                        文法
                    </button>
                    <button
                        onClick={() => setActiveCategory('dialogue')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-bold transition-all ${activeCategory === 'dialogue'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <MessageSquare size={16} />
                        情境
                    </button>
                </div>
            </header>

            <main className="app-main">
                {activeTab === 'add' && (
                    activeCategory === 'vocabulary' ? (
                        <AddWordForm onAdd={handleAddWord} onCancel={() => setActiveTab('list')} />
                    ) : activeCategory === 'grammar' ? (
                        <AddGrammarForm onAdd={handleAddGrammar} onCancel={() => setActiveTab('list')} />
                    ) : (
                        <AddDialogueForm onAdd={handleAddDialogue} onCancel={() => setActiveTab('list')} />
                    )
                )}

                {activeTab === 'settings' && (
                    <Settings />
                )}

                {activeTab === 'list' && (
                    activeCategory === 'vocabulary' ? (
                        <WordList
                            words={words}
                            onDelete={deleteWord}
                            onAddClick={() => setActiveTab('add')}
                        />
                    ) : activeCategory === 'grammar' ? (
                        <GrammarList
                            items={grammarItems}
                            onDelete={deleteGrammar}
                            onAddClick={() => setActiveTab('add')}
                        />
                    ) : (
                        <DialogueList
                            items={dialogues}
                            onDelete={deleteDialogue}
                            onAddClick={() => setActiveTab('add')}
                        />
                    )
                )}

                {activeTab === 'review' && (
                    activeCategory === 'vocabulary' ? (
                        <FlashcardDeck words={words} />
                    ) : activeCategory === 'grammar' ? (
                        <GrammarFlashcards items={grammarItems} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-400">
                            <MessageSquare size={48} className="mb-4 opacity-20" />
                            <p>情境對話目前建議在「列表」中展開閱讀與發音練習喔！</p>
                        </div>
                    )
                )}
            </main>

            <nav className="app-nav">
                <button
                    className="flex flex-col items-center gap-1"
                    style={{ color: activeTab === 'list' ? 'hsl(var(--indigo-500))' : 'var(--text-muted)' }}
                    onClick={() => setActiveTab('list')}
                >
                    <BookOpen size={24} />
                    <span style={{ fontSize: '0.75rem' }}>列表</span>
                </button>

                <button
                    className="flex flex-col items-center gap-1"
                    style={{ color: activeTab === 'add' ? 'hsl(var(--indigo-500))' : 'var(--text-muted)' }}
                    onClick={() => setActiveTab('add')}
                >
                    <PlusCircle size={24} />
                    <span style={{ fontSize: '0.75rem' }}>新增</span>
                </button>

                <button
                    className="flex flex-col items-center gap-1"
                    style={{ color: activeTab === 'review' ? 'hsl(var(--indigo-500))' : 'var(--text-muted)' }}
                    onClick={() => setActiveTab('review')}
                >
                    <Brain size={24} />
                    <span style={{ fontSize: '0.75rem' }}>複習</span>
                </button>

                <button
                    className="flex flex-col items-center gap-1"
                    style={{ color: activeTab === 'settings' ? 'hsl(var(--indigo-500))' : 'var(--text-muted)' }}
                    onClick={() => setActiveTab('settings')}
                >
                    <SettingsIcon size={24} />
                    <span style={{ fontSize: '0.75rem' }}>設定</span>
                </button>
            </nav>
        </div>
    );
}

export default App;
