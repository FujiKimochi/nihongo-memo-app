import React, { useState } from 'react';
import { useSpeech } from '../hooks/useSpeech';

// 50 sounds chart data - Periodic Table Style
// Rows map to a generic "color group" defined in CSS
const KANA_DATA = [
    {
        label: 'a', rowClass: 'bg-kana-vowel', items: [
            { romaji: 'a', hiragana: 'あ', katakana: 'ア' }, { romaji: 'i', hiragana: 'い', katakana: 'イ' }, { romaji: 'u', hiragana: 'う', katakana: 'ウ' }, { romaji: 'e', hiragana: 'え', katakana: 'エ' }, { romaji: 'o', hiragana: 'お', katakana: 'オ' },
        ]
    },
    {
        label: 'k', rowClass: 'bg-kana-k', items: [
            { romaji: 'ka', hiragana: 'か', katakana: 'カ' }, { romaji: 'ki', hiragana: 'き', katakana: 'キ' }, { romaji: 'ku', hiragana: 'く', katakana: 'ク' }, { romaji: 'ke', hiragana: 'け', katakana: 'ケ' }, { romaji: 'ko', hiragana: 'こ', katakana: 'コ' },
        ]
    },
    {
        label: 's', rowClass: 'bg-kana-s', items: [
            { romaji: 'sa', hiragana: 'さ', katakana: 'サ' }, { romaji: 'shi', hiragana: 'し', katakana: 'シ' }, { romaji: 'su', hiragana: 'す', katakana: 'ス' }, { romaji: 'se', hiragana: 'せ', katakana: 'セ' }, { romaji: 'so', hiragana: 'そ', katakana: 'ソ' },
        ]
    },
    {
        label: 't', rowClass: 'bg-kana-t', items: [
            { romaji: 'ta', hiragana: 'た', katakana: 'タ' }, { romaji: 'chi', hiragana: 'ち', katakana: 'チ' }, { romaji: 'tsu', hiragana: 'つ', katakana: 'ツ' }, { romaji: 'te', hiragana: 'て', katakana: 'テ' }, { romaji: 'to', hiragana: 'と', katakana: 'ト' },
        ]
    },
    {
        label: 'n', rowClass: 'bg-kana-n', items: [
            { romaji: 'na', hiragana: 'な', katakana: 'ナ' }, { romaji: 'ni', hiragana: 'に', katakana: 'ニ' }, { romaji: 'nu', hiragana: 'ぬ', katakana: 'ヌ' }, { romaji: 'ne', hiragana: 'ね', katakana: 'ネ' }, { romaji: 'no', hiragana: 'の', katakana: 'ノ' },
        ]
    },
    {
        label: 'h', rowClass: 'bg-kana-h', items: [
            { romaji: 'ha', hiragana: 'は', katakana: 'ハ' }, { romaji: 'hi', hiragana: 'ひ', katakana: 'ヒ' }, { romaji: 'fu', hiragana: 'ふ', katakana: 'フ' }, { romaji: 'he', hiragana: 'へ', katakana: 'ヘ' }, { romaji: 'ho', hiragana: 'ほ', katakana: 'ホ' },
        ]
    },
    {
        label: 'm', rowClass: 'bg-kana-m', items: [
            { romaji: 'ma', hiragana: 'ま', katakana: 'マ' }, { romaji: 'mi', hiragana: 'み', katakana: 'ミ' }, { romaji: 'mu', hiragana: 'む', katakana: 'ム' }, { romaji: 'me', hiragana: 'め', katakana: 'メ' }, { romaji: 'mo', hiragana: 'も', katakana: 'モ' },
        ]
    },
    {
        label: 'y', rowClass: 'bg-kana-y', items: [
            { romaji: 'ya', hiragana: 'や', katakana: 'ヤ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'yu', hiragana: 'ゆ', katakana: 'ユ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'yo', hiragana: 'よ', katakana: 'ヨ' },
        ]
    },
    {
        label: 'r', rowClass: 'bg-kana-r', items: [
            { romaji: 'ra', hiragana: 'ら', katakana: 'ラ' }, { romaji: 'ri', hiragana: 'り', katakana: 'リ' }, { romaji: 'ru', hiragana: 'る', katakana: 'ル' }, { romaji: 're', hiragana: 'れ', katakana: 'レ' }, { romaji: 'ro', hiragana: 'ろ', katakana: 'ロ' },
        ]
    },
    {
        label: 'w', rowClass: 'bg-kana-w', items: [
            { romaji: 'wa', hiragana: 'わ', katakana: 'ワ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'wo', hiragana: 'を', katakana: 'ヲ' },
        ]
    },
    {
        label: 'n', rowClass: 'bg-kana-n-single', items: [
            { romaji: 'n', hiragana: 'ん', katakana: 'ン' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: '', hiragana: '', katakana: '' },
        ]
    }
];

const DAKUON_DATA = [
    {
        label: 'g', rowClass: 'bg-kana-k', items: [
            { romaji: 'ga', hiragana: 'が', katakana: 'ガ' }, { romaji: 'gi', hiragana: 'ぎ', katakana: 'ギ' }, { romaji: 'gu', hiragana: 'ぐ', katakana: 'グ' }, { romaji: 'ge', hiragana: 'げ', katakana: 'ゲ' }, { romaji: 'go', hiragana: 'ご', katakana: 'ゴ' },
        ]
    },
    {
        label: 'z', rowClass: 'bg-kana-s', items: [
            { romaji: 'za', hiragana: 'ざ', katakana: 'ザ' }, { romaji: 'ji', hiragana: 'じ', katakana: 'ジ' }, { romaji: 'zu', hiragana: 'ず', katakana: 'ズ' }, { romaji: 'ze', hiragana: 'ぜ', katakana: 'ゼ' }, { romaji: 'zo', hiragana: 'ぞ', katakana: 'ゾ' },
        ]
    },
    {
        label: 'd', rowClass: 'bg-kana-t', items: [
            { romaji: 'da', hiragana: 'だ', katakana: 'ダ' }, { romaji: 'ji', hiragana: 'ぢ', katakana: 'ヂ' }, { romaji: 'zu', hiragana: 'づ', katakana: 'ヅ' }, { romaji: 'de', hiragana: 'で', katakana: 'デ' }, { romaji: 'do', hiragana: 'ど', katakana: 'ド' },
        ]
    },
    {
        label: 'b', rowClass: 'bg-kana-h', items: [
            { romaji: 'ba', hiragana: 'ば', katakana: 'バ' }, { romaji: 'bi', hiragana: 'び', katakana: 'ビ' }, { romaji: 'bu', hiragana: 'ぶ', katakana: 'ブ' }, { romaji: 'be', hiragana: 'べ', katakana: 'ベ' }, { romaji: 'bo', hiragana: 'ぼ', katakana: 'ボ' },
        ]
    },
    {
        label: 'p', rowClass: 'bg-kana-h', items: [
            { romaji: 'pa', hiragana: 'ぱ', katakana: 'パ' }, { romaji: 'pi', hiragana: 'ぴ', katakana: 'ピ' }, { romaji: 'pu', hiragana: 'ぷ', katakana: 'プ' }, { romaji: 'pe', hiragana: 'ぺ', katakana: 'ペ' }, { romaji: 'po', hiragana: 'ぽ', katakana: 'ポ' },
        ]
    },
];

// Yoon is a bit complex for a standard 5 column grid, we'll retain a simpler list for it
// but format it similarly
const YOON_DATA = [
    {
        label: 'k', rowClass: 'bg-kana-k', items: [
            { romaji: 'kya', hiragana: 'きゃ', katakana: 'キャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'kyu', hiragana: 'きゅ', katakana: 'キュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'kyo', hiragana: 'きょ', katakana: 'キョ' },
        ]
    },
    {
        label: 's', rowClass: 'bg-kana-s', items: [
            { romaji: 'sha', hiragana: 'しゃ', katakana: 'シャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'shu', hiragana: 'しゅ', katakana: 'シュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'sho', hiragana: 'しょ', katakana: 'ショ' },
        ]
    },
    {
        label: 'c', rowClass: 'bg-kana-t', items: [
            { romaji: 'cha', hiragana: 'ちゃ', katakana: 'チャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'chu', hiragana: 'ちゅ', katakana: 'チュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'cho', hiragana: 'ちょ', katakana: 'チョ' },
        ]
    },
    {
        label: 'n', rowClass: 'bg-kana-n', items: [
            { romaji: 'nya', hiragana: 'にゃ', katakana: 'ニャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'nyu', hiragana: 'にゅ', katakana: 'ニュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'nyo', hiragana: 'にょ', katakana: 'ニョ' },
        ]
    },
    {
        label: 'h', rowClass: 'bg-kana-h', items: [
            { romaji: 'hya', hiragana: 'ひゃ', katakana: 'ヒャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'hyu', hiragana: 'ひゅ', katakana: 'ヒュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'hyo', hiragana: 'ひょ', katakana: 'ヒョ' },
        ]
    },
    {
        label: 'm', rowClass: 'bg-kana-m', items: [
            { romaji: 'mya', hiragana: 'みゃ', katakana: 'ミャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'myu', hiragana: 'みゅ', katakana: 'ミュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'myo', hiragana: 'みょ', katakana: 'ミョ' },
        ]
    },
    {
        label: 'r', rowClass: 'bg-kana-r', items: [
            { romaji: 'rya', hiragana: 'りゃ', katakana: 'リャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'ryu', hiragana: 'りゅ', katakana: 'リュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'ryo', hiragana: 'りょ', katakana: 'リョ' },
        ]
    },
    {
        label: 'g', rowClass: 'bg-kana-k', items: [
            { romaji: 'gya', hiragana: 'ぎゃ', katakana: 'ギャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'gyu', hiragana: 'ぎゅ', katakana: 'ギュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'gyo', hiragana: 'ぎょ', katakana: 'ギョ' },
        ]
    },
    {
        label: 'j', rowClass: 'bg-kana-s', items: [
            { romaji: 'ja', hiragana: 'じゃ', katakana: 'ジャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'ju', hiragana: 'じゅ', katakana: 'ジュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'jo', hiragana: 'じょ', katakana: 'ジョ' },
        ]
    },
    {
        label: 'b', rowClass: 'bg-kana-h', items: [
            { romaji: 'bya', hiragana: 'びゃ', katakana: 'ビャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'byu', hiragana: 'びゅ', katakana: 'ビュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'byo', hiragana: 'びょ', katakana: 'ビョ' },
        ]
    },
    {
        label: 'p', rowClass: 'bg-kana-h', items: [
            { romaji: 'pya', hiragana: 'ぴゃ', katakana: 'ピャ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'pyu', hiragana: 'ぴゅ', katakana: 'ピュ' }, { romaji: '', hiragana: '', katakana: '' }, { romaji: 'pyo', hiragana: 'ぴょ', katakana: 'ピョ' },
        ]
    },
];

export function KanaChart() {
    const { speak } = useSpeech();
    const [mode, setMode] = useState('hiragana'); // 'hiragana' or 'katakana'
    const [section, setSection] = useState('seion'); // 'seion', 'dakuon', 'yoon'

    const getActiveData = () => {
        switch (section) {
            case 'seion': return KANA_DATA;
            case 'dakuon': return DAKUON_DATA;
            case 'yoon': return YOON_DATA;
            default: return KANA_DATA;
        }
    };

    const data = getActiveData();

    return (
        <div className="flex flex-col h-full animate-fade-in pb-8">
            <div className="flex flex-col gap-4 mb-6">
                {/* Kana Type Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setMode('hiragana')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'hiragana'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        平假名
                    </button>
                    <button
                        onClick={() => setMode('katakana')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'katakana'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        片假名
                    </button>
                </div>

                {/* Section Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setSection('seion')}
                        className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all ${section === 'seion'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        清音
                    </button>
                    <button
                        onClick={() => setSection('dakuon')}
                        className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all ${section === 'dakuon'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        濁音 / 半濁音
                    </button>
                    <button
                        onClick={() => setSection('yoon')}
                        className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all ${section === 'yoon'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        拗音
                    </button>
                </div>
            </div>

            {/* Periodic Grid Container */}
            <div className="flex flex-col gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-[280px]">
                    {/* Header Vowels */}
                    <div className="kana-grid mb-2">
                        <div></div> {/* Empty top left corner */}
                        {['a', 'i', 'u', 'e', 'o'].map(vowel => (
                            <div key={vowel} className="flex items-center justify-center font-bold text-gray-400 text-sm uppercase">
                                {vowel}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-2">
                        {data.map((row, rowIndex) => (
                            <div key={rowIndex} className="kana-grid">
                                {/* Row Header (Consonant) */}
                                <div className="flex items-center justify-center font-bold text-gray-400 text-xs sm:text-sm uppercase">
                                    {row.label === 'a' ? '' : row.label}
                                </div>

                                {/* Row Items */}
                                {row.items.map((item, itemIndex) => {
                                    const char = mode === 'hiragana' ? item.hiragana : item.katakana;

                                    if (!item.romaji) {
                                        return <div key={itemIndex} className="aspect-square opacity-50 bg-gray-50 border border-gray-100 rounded-lg"></div>;
                                    }

                                    return (
                                        <button
                                            key={itemIndex}
                                            onClick={() => speak(char)}
                                            className={`kana-card flex flex-col items-center justify-center aspect-square ${row.rowClass}`}
                                            aria-label={`Pronounce ${char} (${item.romaji})`}
                                        >
                                            <span className="text-2xl sm:text-3xl font-japanese font-medium text-gray-800">
                                                {char}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default KanaChart;
