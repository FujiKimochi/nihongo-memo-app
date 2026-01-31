import { useState } from 'react';
import { BookOpen, PlusCircle, Brain, Settings as SettingsIcon } from 'lucide-react';
import { useVocabulary } from './hooks/useVocabulary';
import { AddWordForm } from './components/AddWordForm';
import { FlashcardDeck } from './components/FlashcardDeck';
import { WordList } from './components/WordList';
import { Settings } from './components/Settings';

function App() {
    const { words, addWord, deleteWord, toggleMemorized } = useVocabulary();
    const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'review', 'settings'

    const handleAddWord = (word) => {
        addWord(word);
        setActiveTab('list');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="app-header justify-between">
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'hsl(var(--sakura-500))' }}>✿</span>
                    Nihongo Memo
                </h1>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {words.length} words
                </div>
            </header>

            <main className="app-main">
                {activeTab === 'add' && (
                    <AddWordForm onAdd={handleAddWord} onCancel={() => setActiveTab('list')} />
                )}

                {activeTab === 'settings' && (
                    <Settings />
                )}

                {activeTab === 'list' && (
                    <WordList
                        words={words}
                        onDelete={deleteWord}
                        onAddClick={() => setActiveTab('add')}
                    />
                )}

                {activeTab === 'review' && (
                    <FlashcardDeck words={words} />
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
