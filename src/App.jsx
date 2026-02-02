import { useState } from 'react';
import { BookOpen, PlusCircle, Brain, Settings as SettingsIcon, Languages, FileText } from 'lucide-react';
import { useVocabulary } from './hooks/useVocabulary';
import { useGrammar } from './hooks/useGrammar';
import { AddWordForm } from './components/AddWordForm';
import { AddGrammarForm } from './components/AddGrammarForm';
import { FlashcardDeck } from './components/FlashcardDeck';
import { GrammarFlashcards } from './components/GrammarFlashcards';
import { WordList } from './components/WordList';
import { GrammarList } from './components/GrammarList';
import { Settings } from './components/Settings';

function App() {
    const { words, addWord, deleteWord } = useVocabulary();
    const { grammarItems, addGrammar, deleteGrammar } = useGrammar();

    const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'review', 'settings'
    const [activeCategory, setActiveCategory] = useState('vocabulary'); // 'vocabulary', 'grammar'

    const handleAddWord = (word) => {
        addWord(word);
        setActiveTab('list');
    };

    const handleAddGrammar = (grammar) => {
        addGrammar(grammar);
        setActiveTab('list');
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
                        {activeCategory === 'vocabulary' ? `${words.length} 單字` : `${grammarItems.length} 文法`}
                    </div>
                </div>

                {/* Category Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveCategory('vocabulary')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === 'vocabulary'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Languages size={18} />
                        單字變化
                    </button>
                    <button
                        onClick={() => setActiveCategory('grammar')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === 'grammar'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <FileText size={18} />
                        文法筆記
                    </button>
                </div>
            </header>

            <main className="app-main">
                {activeTab === 'add' && (
                    activeCategory === 'vocabulary' ? (
                        <AddWordForm onAdd={handleAddWord} onCancel={() => setActiveTab('list')} />
                    ) : (
                        <AddGrammarForm onAdd={handleAddGrammar} onCancel={() => setActiveTab('list')} />
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
                    ) : (
                        <GrammarList
                            items={grammarItems}
                            onDelete={deleteGrammar}
                            onAddClick={() => setActiveTab('add')}
                        />
                    )
                )}

                {activeTab === 'review' && (
                    activeCategory === 'vocabulary' ? (
                        <FlashcardDeck words={words} />
                    ) : (
                        <GrammarFlashcards items={grammarItems} />
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
