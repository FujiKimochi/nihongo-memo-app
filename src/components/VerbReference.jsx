import React from 'react';
import { Book, ChevronRight, Info, AlertCircle, ArrowRight } from 'lucide-react';

export function VerbReference() {
    const categories = [
        {
            title: '動詞三類分類法',
            icon: <Info size={20} className="text-blue-500" />,
            content: (
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2">第一類動詞 (五段動詞)</h4>
                        <ul className="text-sm space-y-1 text-blue-700">
                            <li>• 辭書形結尾為 <strong>u 段音</strong></li>
                            <li>• 非「る」結尾 (如：書く、話す、買うま)</li>
                            <li>• 「る」結尾，但「る」的前一個字是 <strong>a / u / o 段音</strong> (如：終わる、作る、登る)</li>
                            <li className="mt-2 p-2 bg-white rounded border border-blue-200">
                                <strong>⚠️ 特殊例外 (外表像二類，實為一類)：</strong><br/>
                                帰る (かえる)、入る (はいる)、走る (はしる)、滑る (すべる)、喋る (しゃべる)、蹴る (ける)、切る (きる)、知る (しる)、要る (いる)、混る (まじる)、煎る (いる)
                            </li>
                        </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2">第二類動詞 (一段動詞)</h4>
                        <ul className="text-sm space-y-1 text-green-700">
                            <li>• 結尾為 <strong>る</strong></li>
                            <li>• 「る」的前一個字是 <strong>i / e 段音</strong> (如：起きる、食べる、見る)</li>
                        </ul>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-purple-800 mb-2">第三類動詞 (不規則活用)</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-purple-700">
                            <div><strong>する</strong> (做)</div>
                            <div><strong>来(く)る</strong> (來)</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '活用形變換規則 (12種變形)',
            icon: <Book size={20} className="text-indigo-500" />,
            content: (
                <div className="space-y-6">
                    {/* 意志形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-orange-400 rounded-full"></span>
                            意志形 (推測、邀請、打算)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>o 段 + う</strong> (行こう、買おう)</p>
                            <p>二類：去 る <strong>+ よう</strong> (寝よう、食べよう)</p>
                            <p>三類：する → <strong>しよう</strong> / 来る → <strong>来(こ)よう</strong></p>
                        </div>
                    </section>

                    {/* 命令形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-red-400 rounded-full"></span>
                            命令形 (強烈命令)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>e 段</strong> (話せ、書け)</p>
                            <p>二類：去 る <strong>+ ろ</strong> (見ろ、起きろ)</p>
                            <p>三類：する → <strong>しろ</strong> / 来る → <strong>来(こ)い</strong></p>
                        </div>
                    </section>

                    {/* 假定形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-teal-400 rounded-full"></span>
                            假定形 (如果...的話)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>e 段 + ば</strong> (泳げば、書けば)</p>
                            <p>二類：去 る <strong>+ れば</strong> (教えれば、食べれば)</p>
                            <p>三類：する → <strong>すれば</strong> / 来る → <strong>来(く)れば</strong></p>
                        </div>
                    </section>

                    {/* て形 / た形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-blue-400 rounded-full"></span>
                            て形 / た形 (連接、過去)
                        </h4>
                        <div className="text-xs space-y-2 text-gray-600 pl-4">
                            <div className="bg-gray-50 p-2 rounded">
                                <strong>一類口訣：</strong><br/>
                                う、つ、る → <strong>って / った</strong><br/>
                                ぬ、む、ぶ → <strong>んで / んだ</strong><br/>
                                く → <strong>いて / いた</strong> (例外：行く → 行って)<br/>
                                ぐ → <strong>いで / いだ</strong><br/>
                                す → <strong>して / した</strong>
                            </div>
                            <p>二類：去 る <strong>+ て / た</strong></p>
                            <p>三類：する → <strong>して</strong> / 来る → <strong>来(き)て</strong></p>
                        </div>
                    </section>

                    {/* 可能形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-green-400 rounded-full"></span>
                            可能形 (能力、可以)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>e 段 + る</strong> (書ける、飲める)</p>
                            <p>二類：去 る <strong>+ られる</strong> (食べられる、見られる)</p>
                            <p>三類：する → <strong>できる</strong> / 来る → <strong>来(こ)られる</strong></p>
                        </div>
                    </section>

                    {/* 使役形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-indigo-400 rounded-full"></span>
                            使役形 (讓某人做、許可)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>a 段 + せる</strong> (行かせる)</p>
                            <p>二類：去 る <strong>+ させる</strong> (食べさせる)</p>
                            <p>三類：する → <strong>させる</strong> / 来る → <strong>来(こ)させる</strong></p>
                        </div>
                    </section>

                    {/* 被動形 */}
                    <section className="border-b pb-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-pink-400 rounded-full"></span>
                            被動形 (遭受、受身)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>a 段 + れる</strong> (踏まれる、書かれる)</p>
                            <p>二類：去 る <strong>+ られる</strong> (褒められる、見られる)</p>
                            <p>三類：する → <strong>される</strong> / 来る → <strong>来(こ)られる</strong></p>
                        </div>
                    </section>

                    {/* 使役被動 */}
                    <section className="pb-2">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                            使役被動 (被迫做...)
                        </h4>
                        <div className="text-xs space-y-1 text-gray-600 pl-4">
                            <p>一類：u 段變 <strong>a 段 + される</strong> (待たされる)</p>
                            <p className="text-[10px] text-gray-400">※「す」結尾用「〜せられる」</p>
                            <p>二類：去 る <strong>+ させられる</strong> (食べさせられる)</p>
                            <p>三類：する → <strong>させられる</strong> / 来る → <strong>来(こ)させられる</strong></p>
                        </div>
                    </section>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ padding: '1.5rem' }}>
            <div className="flex flex-col gap-2">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Book className="text-indigo-500" size={28} />
                    動詞活用解析筆記
                </h2>
                <p className="text-sm text-gray-500">基於手寫筆記數位化整理，隨時複習動詞核心規則。</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {categories.map((cat, idx) => (
                    <div key={idx} className="glass-card overflow-hidden">
                        <div className="p-4 border-b bg-gray-50/50 flex items-center gap-3">
                            {cat.icon}
                            <h3 className="font-bold text-gray-800">{cat.title}</h3>
                        </div>
                        <div className="p-5">
                            {cat.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                <AlertCircle className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                <div className="text-sm text-indigo-800 leading-relaxed">
                    <strong>學習小技巧：</strong><br/>
                    第一類動詞的「特殊例外」最容易出錯，它們看起來像二類（以 iru/eru 結尾），但實際變形時要依照一類規則處理（如：帰る → 帰ります）。
                </div>
            </div>
        </div>
    );
}
