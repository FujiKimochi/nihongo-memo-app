import React from 'react';
import { Book, Info, ArrowRight } from 'lucide-react';

export function ParticleReference() {
    // Core Particle Comparison Database
    const particlesComparison = [
        {
            title: "① は vs が （主題標記 vs 主詞標記）",
            desc: "日語中最核心的混淆點。核心差別在於：『は』關注後面要說的描述（已知資訊）；『が』關注前面被指定的人事物（未知/新資訊，具排他性）。",
            a: {
                name: "は (主題 / 對比)",
                usage: "提出整句話要討論的大主題。語意重心在「は」之後的敘述。",
                jp: "私は田中です。",
                ruby: "私<rt>わたし</rt>は田中<rt>たなか</rt>です。",
                zh: "（關於我呢，）我是田中。"
            },
            b: {
                name: "が (主語 / 排他)",
                usage: "強調動作的直接主體。語意重心在「が」之前，有「就是他」的含意。",
                jp: "私が田中です。",
                ruby: "私<rt>わたし</rt>が田中<rt>たなか</rt>です。",
                zh: "我（我才是那個）田中。"
            },
            diff: "「私は田中です」是自我介紹時的常態說明；「私が田中です」通常用於回答「誰是田中？」的指認搶答情境。"
        },
        {
            title: "② に vs で （靜態存在 vs 動態行為場所）",
            desc: "表示場所時的必辨差異。關鍵在於動詞屬性：靜態存在用『に』，動態行為用『で』。",
            a: {
                name: "に (存在場所 / 動作指向)",
                usage: "接在人或物品「靜態存在、居住、放置」的位置後。常配合いる、ある、住む。",
                jp: "図書館に本があります。",
                ruby: "図書館<rt>としょかん</rt>に本<rt>ほん</rt>があります。",
                zh: "圖書館裡有書。"
            },
            b: {
                name: "で (動態動作場所)",
                usage: "接在具體「行為、動作、事件發生」的場所後。配合動詞如勉強、食す、遊ぶ。",
                jp: "図書館で勉強します。",
                ruby: "図書館<rt>としょかん</rt>で勉強<rt>べんきょう</rt>します。",
                zh: "在圖書館裡唸書。"
            },
            diff: "「に」僅僅說明某物「在」那裡（靜態）；「で」則表示主詞在那裡「做什麼行為」（動態）。"
        },
        {
            title: "③ に vs へ （終點/目的地 vs 移動方向偏向）",
            desc: "配合移動動詞（行・來・回）時的差異。核心在於：『に』是箭頭最終落點，『へ』是箭頭指向的方向。",
            a: {
                name: "に (動作終點 / 目標點)",
                usage: "著重在移動的「最終端目的地、著陸點」，結果導向。",
                jp: "日本に着きました。",
                ruby: "日本<rt>にほん</rt>に着<rt>つ</rt>きました。",
                zh: "到達日本了。"
            },
            b: {
                name: "へ (移動方向 / 過程)",
                usage: "著重在「朝向某個方向前進」的過程或指向，後面常接行、来、帰。",
                jp: "西へ向かいます。",
                ruby: "西<rt>にし</rt>へ向<rt>む</rt>かいます。",
                zh: "朝西方前進。"
            },
            diff: "「に」是確實會到達的終點（In/At）；「へ」是指指向前進的方向（Towards），不一定強調最後的落點。"
        },
        {
            title: "④ に vs と （單向指向對象 vs 雙向共同對象）",
            desc: "表示動作對象時的對比。區別在於：『に』表示我對他人做，『と』表示我和他人一起做。",
            a: {
                name: "に (單向動作對象)",
                usage: "動作從自己身上單向投射給對方（如對人諮詢、向人打聽）。",
                jp: "先生に相談します。",
                ruby: "先生<rt>せんせい</rt>に相談<rt>そうだん</rt>します。",
                zh: "向老師請教諮詢。"
            },
            b: {
                name: "と (雙向共同對象 / 互動)",
                usage: "雙方對等地「共同參與」這項行為（如雙方商量討論）。",
                jp: "友達と相談します。",
                ruby: "友達<rt>ともだち</rt>と相談<rt>そうだん</rt>します。",
                zh: "和朋友（雙方）商量討論。"
            },
            diff: "「に相談する」表示自己向對象尋求解答（單向）；「と相談する」表示兩個人一起開會討論以凝聚共識（雙向）。"
        },
        {
            title: "⑤ まで vs までに （持續終點限度 vs 完成期限）",
            desc: "表示時間限制時最常見的考試重點。關鍵在於動作是「持續」還是「瞬間完成」。",
            a: {
                name: "まで (持續的終點)",
                usage: "動作或狀態一直「不中斷地持續」進行，直到這個時間點為止。",
                jp: "五時まで待ちます。",
                ruby: "五時<rt>ごじ</rt>まで待ち<rt>ま</rt>ます。",
                zh: "（一直不間斷地）等到五點。"
            },
            b: {
                name: "までに (完成的截止期限)",
                usage: "動作只需在「這個時間點之前的任意時刻」完成即可，後面接瞬時動詞。",
                jp: "五時までに来てください。",
                ruby: "五時<rt>ごじ</rt>までに来<rt>く</rt>てください。",
                zh: "請在五點之前來（五點是底線）。"
            },
            diff: "「まで」常用於待つ（等）、働く（工作）等持續動詞；「までに」用於提出、提交、到達等瞬間完成動作。"
        }
    ];

    // Single Particle usage and examples database (8 categories)
    const singleParticlesData = [
        {
            name: "は (HA)",
            summary: "提示主題、突顯對比",
            usages: [
                "1. 提示話語的大主題：後面通常是新的敘述或對該主題的解釋說明。",
                "2. 突顯事物間的對比：將兩個事物並列，表示這一個做、那一個不做。"
            ],
            sentences: [
                {
                    jp: "今日は天気が良いです。",
                    ruby: "今日<rt>きょう</rt>は天気<rt>てんき</rt>が良い<rt>よ</rt>いです。",
                    zh: "今天天氣很好。 (提示今日作為聊天大主題)",
                },
                {
                    jp: "お酒は飲みますが、タバコは吸いません。",
                    ruby: "お酒<rt>さけ</rt>は飲み<rt>の</rt>みますが、タバコは吸<rt>す</rt>いません。",
                    zh: "酒我是喝，但香菸是不抽的。 (表示對比關係)",
                },
                {
                    jp: "英語は分かりますが、フランス語は分かりません。",
                    ruby: "英語<rt>えいご</rt>は分<rt>わ</rt>かりますが、フランス語<rt>ご</rt>は分かり<rt>わ</rt>かりません。",
                    zh: "英文我是懂，但法文我就不懂了。 (表示對比)"
                }
            ]
        },
        {
            name: "が (GA)",
            summary: "主語標記、能力喜惡對象、自然現象",
            usages: [
                "1. 表示動作的主語：特別是用於新資訊導入、問句回答或名詞修飾子句的主語。",
                "2. 能力、喜惡、希望的對象：接在上手、下手、好き、嫌い、欲しい 前面。",
                "3. 自然客觀現象：描述眼睛所看到的當下客觀景象。"
            ],
            sentences: [
                {
                    jp: "日本語が上手になりたいです。",
                    ruby: "日本語<rt>にほんご</rt>が上手<rt>じょうず</rt>になりたいです。",
                    zh: "我想讓日文變得流利。 (表示希望與能力對象)",
                },
                {
                    jp: "雨が降ってきました。",
                    ruby: "雨<rt>あめ</rt>が降<rt>ふ</rt>ってきました。",
                    zh: "下起雨來了。 (描述自然現象)",
                },
                {
                    jp: "ドアが開いています。",
                    ruby: "ドアが開<rt>あ</rt>いています。",
                    zh: "門開著。 (描述眼前客觀狀態)"
                }
            ]
        },
        {
            name: "を (WO)",
            summary: "動作直接對象、出發離開點、通過路徑",
            usages: [
                "1. 動作的直接客體：動詞所作用的目標。",
                "2. 移動的出發地或離開處：接在離開、畢業、下車等起點場所後。",
                "3. 移動的經過路徑：表示在空中、道路、公園等空間中通過、行走。"
            ],
            sentences: [
                {
                    jp: "朝ご飯を食べました。",
                    ruby: "朝<rt>あさ</rt>ご飯<rt>はん</rt>を食べ<rt>た</rt>べました。",
                    zh: "吃過早餐了。 (動作的直接對象)",
                },
                {
                    jp: "毎朝七時に家を出ます。",
                    ruby: "毎朝<rt>まいあさ</rt>七時<rt>しちじ</rt>に家<rt>いえ</rt>を出<rt>で</rt>ます。",
                    zh: "每天早上七點出門（離開家）。 (移動的出發點)",
                },
                {
                    jp: "公園を散歩するのが好きです。",
                    ruby: "公園<rt>こうえん</rt>を散歩<rt>sanpo</rt>するのが好き<rt>す</rt>きです。",
                    zh: "我喜歡在公園散步。 (移動的通過空間)"
                }
            ]
        },
        {
            name: "に (NI)",
            summary: "時間點、靜態位置、目的地、單向對象、變化結果、頻率基準",
            usages: [
                "1. 時間點：標示動作發生的精準、有數字的時間。",
                "2. 存在地點：配合いる、ある說明人事物的位置。",
                "3. 目標/目的地：移動的箭頭最終落點。",
                "4. 動作單向對象：向誰說話、給誰東西、遇見誰。",
                "5. 變化結果：表示最終成為的狀態或職業（配合 になる）。",
                "6. 頻率基準：在某個時間單位內做幾次。"
            ],
            sentences: [
                {
                    jp: "毎朝六時に起きます。",
                    ruby: "毎朝<rt>まいあさ</rt>六時<rt>ろくじ</rt>に起<rt>お</rt>きます。",
                    zh: "每天早上六點起床。 (精確時間點)",
                },
                {
                    jp: "一週間に二回ジムへ行きます。",
                    ruby: "一週間<rt>いっしゅうかん</rt>に二回<rt>にかい</rt>ジムへ行<rt>い</rt>きます。",
                    zh: "一週去兩次健身房。 (頻率基準)",
                },
                {
                    jp: "将来は有名なエンジニアになりたいです。",
                    ruby: "将来<rt>しょうらい</rt>は有名<rt>ゆうめい</rt>なエンジニアになりたいです。",
                    zh: "將來想成為有名的工程師。 (變化的結果)"
                }
            ]
        },
        {
            name: "で (DE)",
            summary: "動作場所、工具手段、原因理由、範圍限制",
            usages: [
                "1. 動作場所：發生行為的活動地點。",
                "2. 工具、手段、材料：騎車、用鉛筆、用英文、用木頭。",
                "3. 原因、理由：因為颱風、因為感冒等非人為因素產生的結果。",
                "4. 範圍、限定：數量合計、時間或空間的總界限。"
            ],
            sentences: [
                {
                    jp: "日本語で論文を書きます。",
                    ruby: "日本語<rt>にほんご</rt>で論文<rt>ろんぶん</rt>を書<rt>か</rt>きます。",
                    zh: "用日文寫論文。 (手段/工具)",
                },
                {
                    jp: "風邪で学校を休んでしまいました。",
                    ruby: "風邪<rt>かぜ</rt>で学校<rt>がっこう</rt>を休<rt>やす</rt>んでしまいました。",
                    zh: "因為感冒而向學校請假了。 (原因/理由)",
                },
                {
                    jp: "この本は全部で三千円です。",
                    ruby: "この本<rt>ほん</rt>は全部<rt>ぜんぶ</rt>で三千円<rt>さんぜんえん</rt>です。",
                    zh: "這些書總共是三千日圓。 (數量合計限定)"
                }
            ]
        },
        {
            name: "へ (HE)",
            summary: "移動方向",
            usages: [
                "1. 移動的指向：著重於前進的「大方向」，不一定強調是否實際到達（常用於帶有文學或親近感的場景）。"
            ],
            sentences: [
                {
                    jp: "北へ向かって旅に出る。",
                    ruby: "北<rt>きた</rt>へ向<rt>む</rt>かって旅<rt>たび</rt>に出<rt>で</rt>る。",
                    zh: "朝著北方踏上旅程。 (前進的方向)",
                },
                {
                    jp: "ようこそ我が家へ。",
                    ruby: "ようこそ我<rt>わ</rt>が家<rt>や</rt>へ。",
                    zh: "歡迎來到我家。 (溫暖地歡迎對方指向我家)"
                }
            ]
        },
        {
            name: "と (TO)",
            summary: "雙向對象、並列連結、引用、必然假定",
            usages: [
                "1. 共同動作對象：和某人一起做事。",
                "2. 並列事物：完全列舉所有的名詞（A和B和C）。",
                "3. 引用：表示言談、思考的具體內容（接言う、思う、考える）。",
                "4. 必然與自然結果：一……就……（自然規律或機器操作結果）。"
            ],
            sentences: [
                {
                    jp: "明日は友達と映画を見に行きます。",
                    ruby: "明日<rt>あした</rt>は友達<rt>ともだち</rt>と映画<rt>えいが</rt>を見<rt>み</rt>に行<rt>い</rt>きます。",
                    zh: "明天要和朋友一起去看電影。 (共同對象)",
                },
                {
                    jp: "春になると桜が咲きます。",
                    ruby: "春<rt>はる</rt>になると桜<rt>さくら</rt>が咲<rt>さ</rt>きます。",
                    zh: "一到春天櫻花就會盛開。 (自然規律的必然假定)"
                }
            ]
        },
        {
            name: "から・まで (KARA・MADE)",
            summary: "起點與終點、原因理由",
            usages: [
                "1. 時空的起點（から）與終點（まで）：從……到……。",
                "2. 說明主觀因果關係（から）：因為……所以……。"
            ],
            sentences: [
                {
                    jp: "九時から五時まで働きます。",
                    ruby: "九時<rt>くじ</rt>から五時<rt>ごじ</rt>まで働き<rt>はたら</rt>きます。",
                    zh: "從九點工作到五點。 (時間的起訖)",
                },
                {
                    jp: "危ないですから、離れてください。",
                    ruby: "危<rt>あぶ</rt>ないですから、離<rt>はな</rt>れてください。",
                    zh: "因為很危險，請離遠一點。 (主觀原因理由)"
                }
            ]
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            {/* Part 1: Particle Comparison Grid */}
            <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    <Info className="text-indigo-500" size={20} />
                    常用助詞核心差異對比
                </h3>
                <p className="text-sm text-gray-600 mb-4" style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6 }}>
                    日語助詞中，有幾組外表相近但語境完全不同的常用對比。以下整理出學習者最常出錯的 5 個核心差異：
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {particlesComparison.map((comp, idx) => (
                        <div key={idx} style={{ borderBottom: idx !== particlesComparison.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: idx !== particlesComparison.length - 1 ? '1.5rem' : 0 }}>
                            <h4 style={{ fontWeight: 800, fontSize: '0.975rem', color: 'hsl(var(--indigo-900))', marginBottom: '0.5rem' }}>{comp.title}</h4>
                            <p style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '1rem', lineHeight: 1.5 }}>{comp.desc}</p>
                            
                            <div className="comparison-box">
                                <div className="comparison-card">
                                    <div className="comparison-header" style={{ color: '#d97706' }}>{comp.a.name}</div>
                                    <div className="comparison-desc">{comp.a.usage}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}>
                                        <ruby dangerouslySetInnerHTML={{ __html: comp.a.ruby }} />
                                    </div>
                                    <div style={{ fontSize: '0.8125rem', color: '#4b5563' }}><strong>譯：</strong>{comp.a.zh}</div>
                                </div>
                                <div className="comparison-card">
                                    <div className="comparison-header" style={{ color: '#2563eb' }}>{comp.b.name}</div>
                                    <div className="comparison-desc">{comp.b.usage}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}>
                                        <ruby dangerouslySetInnerHTML={{ __html: comp.b.ruby }} />
                                    </div>
                                    <div style={{ fontSize: '0.8125rem', color: '#4b5563' }}><strong>譯：</strong>{comp.b.zh}</div>
                                </div>
                            </div>

                            <div className="keigo-example-analysis" style={{ marginTop: '0.5rem' }}>
                                <strong>對比總結：</strong>{comp.diff}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Part 2: Single Particle Usage Accordion */}
            <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Book className="text-indigo-500" size={20} />
                    八大常用助詞單項詳解
                </h3>
                <p className="text-sm text-gray-600 mb-4" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                    點選下方各個助詞卡片，即可展開查看該助詞的完整使用時機、文法說明與經典學習例句。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {singleParticlesData.map((part, idx) => (
                        <details key={idx} className="keigo-details">
                            <summary className="keigo-summary">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span className="particle-badge">{part.name}</span>
                                    <span style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>{part.summary}</span>
                                </div>
                            </summary>
                            <div className="keigo-details-content">
                                <div style={{ marginBottom: '1rem' }}>
                                    <h5 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>使用時機：</h5>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {part.usages.map((u, uIdx) => (
                                            <div key={uIdx} style={{ fontSize: '0.8125rem', color: '#4b5563', lineHeight: 1.5 }}>{u}</div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>精選學習例句：</h5>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {part.sentences.map((s, sIdx) => (
                                            <div key={sIdx} style={{ borderBottom: sIdx !== part.sentences.length - 1 ? '1px dashed #e5e7eb' : 'none', paddingBottom: sIdx !== part.sentences.length - 1 ? '0.75rem' : 0 }}>
                                                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'hsl(var(--indigo-900))', marginBottom: '4px' }}>
                                                    <ruby dangerouslySetInnerHTML={{ __html: s.ruby }} />
                                                </div>
                                                <div style={{ fontSize: '0.8125rem', color: '#4b5563' }}>
                                                    <strong>中文翻譯：</strong> {s.zh}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
