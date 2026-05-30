import React from 'react';
import { Book, Info, ArrowRight } from 'lucide-react';

export function ParticleReference() {
    const categories = [
        {
            title: '格助詞 (提示關係)',
            content: (
                <div className="space-y-4">
                    {/* は vs が */}
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                            は (主題) <ArrowRight size={14} /> が (主語)
                        </h4>
                        <div className="text-sm space-y-2 text-blue-700">
                            <p><strong>は：</strong> 提示主題。用來描述某事物的性質或狀態（已知資訊，重點在後）。</p>
                            <p className="pl-4 border-l-2 border-blue-200 py-1">
                                <span className="font-medium">例：</span>私は学生です。<br/>
                                <span className="text-xs opacity-80">(我是學生。重點在於我是「什麼」)</span>
                            </p>
                            <p><strong>が：</strong> 提示主語。用來區別或強調對象（新資訊，重點在前）。</p>
                            <p className="pl-4 border-l-2 border-blue-200 py-1">
                                <span className="font-medium">例：</span>私が学生です。<br/>
                                <span className="text-xs opacity-80">(我才是學生。重點在於「誰」是學生)</span>
                            </p>
                        </div>
                    </div>
                    {/* を */}
                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <h4 className="font-bold text-indigo-800 mb-2">を (受詞 / 移動)</h4>
                        <div className="text-sm space-y-2 text-indigo-700">
                            <p>1. <strong>賓語：</strong> 動作直接影響的對象。</p>
                            <p className="pl-4 italic">例：リンゴを食べる。(吃蘋果)</p>
                            <p>2. <strong>移動：</strong> 穿越、離開某個場所。</p>
                            <p className="pl-4 italic">例：公園を散歩する、家を出則。</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '場所、時間與目標',
            content: (
                <div className="space-y-4">
                    {/* に */}
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2">に (時間 / 目標 / 對象)</h4>
                        <div className="text-sm space-y-2 text-green-700">
                            <p>1. <strong>時間：</strong> 精確的時間點 (加數字時使用)。</p>
                            <p className="pl-4 italic">例：九時に寝る。</p>
                            <p>2. <strong>目標/場所：</strong> 動作抵達的目的地或存在的場所。</p>
                            <p className="pl-4 italic">例：日本に行く、房間及いる。</p>
                            <p>3. <strong>對象：</strong> 動作朝向的對象。</p>
                            <p className="pl-4 italic">例：先生に聞く、友達に會う。</p>
                        </div>
                    </div>
                    {/* で */}
                    <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                        <h4 className="font-bold text-teal-800 mb-2">で (地點 / 方法 / 範圍)</h4>
                        <div className="text-sm space-y-2 text-teal-700">
                            <p>1. <strong>地點：</strong> 動作發生的場所。</p>
                            <p className="pl-4 italic">例：餐廳で食べる。</p>
                            <p>2. <strong>方法：</strong> 使用的工具、手段、材料。</p>
                            <p className="pl-4 italic">例：計程車で行く、木で作る。</p>
                            <p>3. <strong>範圍：</strong> 比較的範圍或期限。</p>
                            <p className="pl-4 italic">例：世界で一番、三日で終わる。</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '關聯與連接',
            content: (
                <div className="space-y-4">
                    {/* の */}
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <h4 className="font-bold text-amber-800 mb-2">の (所有 / 屬性 / 名詞化)</h4>
                        <div className="text-sm space-y-2 text-amber-700">
                            <p>1. <strong>所有：</strong> 我的、你的、某人的。</p>
                            <p className="pl-4 italic">例：私の本。</p>
                            <p>2. <strong>屬性：</strong> A類型的B。</p>
                            <p className="pl-4 italic">例：日本語の先生。</p>
                        </div>
                    </div>
                    {/* と vs も */}
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-purple-800 mb-2">と (和) & も (也)</h4>
                        <div className="text-sm space-y-2 text-purple-700">
                            <p><strong>と：</strong> 連接兩個名詞 (完全列舉)。</p>
                            <p className="pl-4 italic">例：咖啡と紅茶。</p>
                            <p><strong>も：</strong> 表示同樣的情況、強調程度。</p>
                            <p className="pl-4 italic">例：私も好きです。(我也喜歡)</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="text-indigo-900">
                    <Info className="text-indigo-500" size={24} />
                    常用助詞邏輯解析
                </h2>
                <p className="text-sm text-gray-500">理解助詞的「邏輯關係」，而非死背翻譯。</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {categories.map((cat, idx) => (
                    <div key={idx} className="glass-card overflow-hidden" style={{ background: 'white' }}>
                        <div className="p-4 border-b bg-gray-50/50">
                            <h3 className="font-bold text-gray-800">{cat.title}</h3>
                        </div>
                        <div className="p-5">
                            {cat.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
