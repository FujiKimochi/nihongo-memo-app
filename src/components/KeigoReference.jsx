import React from 'react';
import { Award, Info, ArrowRight } from 'lucide-react';

export function KeigoReference() {
    const categories = [
        {
            title: '敬語三大部分',
            content: (
                <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <h4 className="font-bold text-orange-800 mb-2">1. 尊敬語 (Sonkeigo)</h4>
                        <p className="text-sm text-orange-700 mb-2">抬高對方的地位，用於描述<strong>長輩、上司或客戶</strong>的動作。</p>
                        <div className="bg-white/50 p-2 rounded text-xs text-orange-800 font-mono">
                            お + V(連用形) + になる<br/>
                            れる / られる
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2">2. 謙讓語 (Kenjougo)</h4>
                        <p className="text-sm text-blue-700 mb-2">降低自己的地位，表示對對方的敬意。用於描述<strong>自己或己方</strong>的動作。</p>
                        <div className="bg-white/50 p-2 rounded text-xs text-blue-800 font-mono">
                            お + V(連用形) + する / 申し上げる
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">3. 丁寧語 (Teineigo)</h4>
                        <p className="text-sm text-gray-700">對說話對象表示禮貌。即常見的「です・ます」。</p>
                    </div>
                </div>
            )
        },
        {
            title: '常用特殊動詞對照表',
            content: (
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border text-left">一般</th>
                                <th className="p-2 border text-left text-orange-700">尊敬語</th>
                                <th className="p-2 border text-left text-blue-700">謙讓語</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border font-bold">行く/来る</td>
                                <td className="p-2 border text-orange-600">いらっしゃる</td>
                                <td className="p-2 border text-blue-600">伺う / 参る</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-bold">食べる/飲む</td>
                                <td className="p-2 border text-orange-600">召し上がる</td>
                                <td className="p-2 border text-blue-600">いただく</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-bold">言う</td>
                                <td className="p-2 border text-orange-600">おっしゃる</td>
                                <td className="p-2 border text-blue-600">申す / 申し上げる</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-bold">する</td>
                                <td className="p-2 border text-orange-600">なさる</td>
                                <td className="p-2 border text-blue-600">いたす</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-bold">知っている</td>
                                <td className="p-2 border text-orange-600">ご存じです</td>
                                <td className="p-2 border text-blue-600">存じている</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-bold">見る</td>
                                <td className="p-2 border text-orange-600">ご覧になる</td>
                                <td className="p-2 border text-blue-600">拝見する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="text-indigo-900">
                    <Award className="text-indigo-500" size={24} />
                    敬語體系速查
                </h2>
                <p className="text-sm text-gray-500">掌握尊敬語與謙讓語的切換，提升日語應對專業感。</p>
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
