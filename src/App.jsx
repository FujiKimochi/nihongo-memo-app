import { useState } from 'react';
import { BookOpen, PlusCircle, Brain, Settings as SettingsIcon, Languages, FileText, MessageSquare, Sparkles } from 'lucide-react';
import { useVocabulary } from './hooks/useVocabulary';
import { useGrammar } from './hooks/useGrammar';
import { useDialogues } from './hooks/useDialogues';
import { useAdjectives } from './hooks/useAdjectives';
import { AddWordForm } from './components/AddWordForm';
import { AddGrammarForm } from './components/AddGrammarForm';
import { AddDialogueForm } from './components/AddDialogueForm';
import { AddAdjectiveForm } from './components/AddAdjectiveForm';
import { FlashcardDeck } from './components/FlashcardDeck';
import { GrammarFlashcards } from './components/GrammarFlashcards';
import { WordList } from './components/WordList';
import { GrammarList } from './components/GrammarList';
import { DialogueList } from './components/DialogueList';
import { AdjectiveList } from './components/AdjectiveList';
import { Settings } from './components/Settings';

function App() {
    const { words, addWord, deleteWord } = useVocabulary();
    const { grammarItems, addGrammar, deleteGrammar } = useGrammar();
    const { dialogues, addDialogue, deleteDialogue } = useDialogues();
    const { adjectives, addAdjective, deleteAdjective } = useAdjectives();

    const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'review', 'settings'
    const [activeCategory, setActiveCategory] = useState('vocabulary'); // 'vocabulary', 'grammar', 'adjective', 'dialogue'

    const handleAddGrammar = (grammar) => {
        addGrammar(grammar);
        setActiveTab('list');
    };

    const handleAddDialogue = (dialogue) => {
        addDialogue(dialogue);
        setActiveTab('list');
    };

    const handleAddWords = (newWords) => {
        addWords(newWords);
        setActiveTab('list');
    };

    const handleAddAdjectives = (newAdjs) => {
        addAdjectives(newAdjs);
        setActiveTab('list');
    };

    const getCountDisplay = () => {
        switch (activeCategory) {
            case 'vocabulary': return `${words.length} 單字`;
            case 'grammar': return `${grammarItems.length} 文法`;
            case 'adjective': return `${adjectives.length} 形容詞`;
            case 'dialogue': return `${dialogues.length} 情境`;
            default: return '';
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="app-header h-auto py-3 flex-col items-stretch gap-3">
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
                <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
                    {[
                        { id: 'vocabulary', label: '單字', icon: Languages },
                        { id: 'grammar', label: '文法', icon: FileText },
                        { id: 'adjective', label: '形 / 副詞', icon: Sparkles },
                        { id: 'dialogue', label: '情境', icon: MessageSquare }
                    ].map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[13px] font-bold transition-all whitespace-nowrap ${activeCategory === cat.id
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <cat.icon size={14} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </header>

            <main className="app-main">
                {activeTab === 'add' && (
                    activeCategory === 'vocabulary' ? (
                        <AddWordForm onAdd={handleAddWords} onCancel={() => setActiveTab('list')} />
                    ) : activeCategory === 'grammar' ? (
                        <AddGrammarForm onAdd={handleAddGrammar} onCancel={() => setActiveTab('list')} />
                    ) : activeCategory === 'adjective' ? (
                        <AddAdjectiveForm onAdd={handleAddAdjectives} onCancel={() => setActiveTab('list')} />
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
                    ) : activeCategory === 'adjective' ? (
                        <AdjectiveList
                            items={adjectives}
                            onDelete={deleteAdjective}
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
                    ) : activeCategory === 'adjective' ? (
                        // Placeholder or reuse Word flashcards if structure is compatible
                        <FlashcardDeck words={adjectives} />
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
