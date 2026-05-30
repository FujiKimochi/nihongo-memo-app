import React, { useState } from 'react';
import { Book, ChevronRight, Info, AlertCircle, ArrowRight, Languages, Award, ShieldAlert, HelpCircle } from 'lucide-react';

export function VerbReference() {
    const [activeSubTab, setActiveSubTab] = useState('verbs'); // 'verbs', 'particles', 'keigo'

    const categories = [
        {
            title: '動詞三類分類法',
            icon: <Info size={20} className="text-blue-500" />,
            content: (
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100" style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: '1rem' }}>
                        <h4 className="font-bold text-blue-800 mb-2" style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.5rem' }}>第一類動詞 (五段動詞)</h4>
                        <ul className="text-sm space-y-1 text-blue-700" style={{ fontSize: '0.875rem', color: '#1d4ed8', listStyleType: 'none', paddingLeft: 0 }}>
                            <li>• 辭書形結尾為 <strong>u 段音</strong></li>
                            <li>• 非「る」結尾 (如：書く、話す、買う)</li>
                            <li>• 「る」結尾，但「る」的前一個字是 <strong>a / u / o 段音</strong> (如：終わる、作る、登る)</li>
                            <li className="mt-2 p-2 bg-white rounded border border-blue-200" style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'white', border: '1px solid #bfdbfe', borderRadius: '6px' }}>
                                <strong>⚠️ 特殊例外 (外表像二類，實為一類)：</strong><br/>
                                帰る (かえる)、入る (はいる)、走る (はしる)、滑る (すべる)、喋る (しゃべる)、蹴る (ける)、切る (きる)、知る (しる)、要る (いる)、混る (まじる)、煎る (いる)
                            </li>
                        </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-100" style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
                        <h4 className="font-bold text-green-800 mb-2" style={{ fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>第二類動詞 (一段動詞)</h4>
                        <ul className="text-sm space-y-1 text-green-700" style={{ fontSize: '0.875rem', color: '#15803d', listStyleType: 'none', paddingLeft: 0 }}>
                            <li>• 結尾為 <strong>る</strong></li>
                            <li>• 「る」的前一個字是 <strong>i / e 段音</strong> (如：起きる、食べる、見る)</li>
                        </ul>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100" style={{ backgroundColor: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
                        <h4 className="font-bold text-purple-800 mb-2" style={{ fontWeight: 700, color: '#6b21a8', marginBottom: '0.5rem' }}>第三類動詞 (不規則活用)</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-purple-700" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.875rem', color: '#7e22ce' }}>
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
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#f97316', borderRadius: '9999px', display: 'inline-block' }}></span>
                            意志形 (推測、邀請、打算)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>一類：u 段變 <strong>o 段 + う</strong> (行こう、買おう)</p>
                            <p>二類：去 る <strong>+ よう</strong> (寝よう、食べよう)</p>
                            <p>三類：する → <strong>しよう</strong> / 来る → <strong>来(こ)よう</strong></p>
                        </div>
                    </section>

                    {/* 命令形 */}
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#ef4444', borderRadius: '9999px', display: 'inline-block' }}></span>
                            命令形 (強烈命令)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>一類：u 段變 <strong>e 段</strong> (話せ、書け)</p>
                            <p>二類：去 る <strong>+ ろ</strong> (見ろ、起きろ)</p>
                            <p>三類：する → <strong>しろ</strong> / 来る → <strong>来(こ)い</strong></p>
                        </div>
                    </section>

                    {/* 假定形 */}
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#14b8a6', borderRadius: '9999px', display: 'inline-block' }}></span>
                            假定形 (如果...的話)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>一類：u 段變 <strong>e 段 + ば</strong> (泳げば、書けば)</p>
                            <p>二類：去 る <strong>+ れば</strong> (教えれば、食べれば)</p>
                            <p>三類：する → <strong>すれば</strong> / 来る → <strong>来(く)れば</strong></p>
                        </div>
                    </section>

                    {/* て形 / た形 */}
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#3b82f6', borderRadius: '9999px', display: 'inline-block' }}></span>
                            て形 / た形 (連接、過去)
                        </h4>
                        <div className="text-xs space-y-2 text-gray-600" style={{ fontSize: '0.75rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <div className="bg-gray-50 p-2 rounded" style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
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
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#22c55e', borderRadius: '9999px', display: 'inline-block' }}></span>
                            可能形 (能力、可以)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>思考：u 段變 <strong>e 段 + る</strong> (書ける、飲める)</p>
                            <p>二類：去 る <strong>+ られる</strong> (食べられる、見られる)</p>
                            <p>三類：する → <strong>できる</strong> / 来る → <strong>来(こ)られる</strong></p>
                        </div>
                    </section>

                    {/* 使役形 */}
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#6366f1', borderRadius: '9999px', display: 'inline-block' }}></span>
                            使役形 (讓某人做、許可)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>一類：u 段變 <strong>a 段 + せる</strong> (行かせる)</p>
                            <p>二類：去 る <strong>+ させる</strong> (食べさせる)</p>
                            <p>三類：する → <strong>させる</strong> / 来る → <strong>来(こ)させる</strong></p>
                        </div>
                    </section>

                    {/* 被動形 */}
                    <section className="border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#ec4899', borderRadius: '9999px', display: 'inline-block' }}></span>
                            被動形 (遭受、受身)
                        </h4>
                        <div className="text-sm space-y-1 text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>一類：u 段變 <strong>a 段 + れる</strong> (踏まれる、書かれる)</p>
                            <p>二類：去 る <strong>+ られる</strong> (褒められる、見られる)</p>
                            <p>三類：する → <strong>される</strong> / 来る → <strong>来(こ)られる</strong></p>
                        </div>
                    </section>

                    {/* 使役被動 */}
                    <section className="pb-2">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2" style={{ fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '24px', backgroundColor: '#7c3aed', borderRadius: '9999px', display: 'inline-block' }}></span>
                            使役被動 (被迫做...)
                        </h4>
                        <div className="text-xs space-y-1 text-gray-600" style={{ fontSize: '0.75rem', color: '#4b5563', paddingLeft: '1rem' }}>
                            <p>一類：u 段變 <strong>a 段 + される</strong> (待たされる)</p>
                            <p className="text-[10px] text-gray-400" style={{ fontSize: '10px', color: '#9ca3af' }}>※「す」結尾用「〜せられる」</p>
                            <p>二類：去 る <strong>+ させられる</strong> (食べさせられる)</p>
                            <p>三類：する → <strong>させられる</strong> / 来る → <strong>来(こ)させられる</strong></p>
                        </div>
                    </section>
                </div>
            )
        }
    ];

    const keigoVerbs = [
        { basic: '語源 / 丁寧體', jp: '行く・来る\n（行きます・来ます）', sonkei: 'いらっしゃる\nおいでになる\nお越しになる', kenjou: '参（まい）る\n伺（うかが）う （拜訪）' },
        { basic: 'いる\n（います）', jp: 'いる\n（います）', sonkei: 'いらっしゃる\nおいでになる', kenjou: '居（お）る' },
        { basic: '食べる・飲む\n（食べます・飲みます）', jp: '食べる・飲む\n（食べます・飲みます）', sonkei: '召（め）し上（あ）がる', kenjou: 'いただく' },
        { basic: '言う\n（言います）', jp: '言う\n（言います）', sonkei: 'おっしゃる', kenjou: '申（もう）す\n申し上げる' },
        { basic: 'する\n（します）', jp: 'する\n（します）', sonkei: 'なさる', kenjou: 'いたす' },
        { basic: '見る\n（見ます）', jp: '見る\n（見ます）', sonkei: 'ご覧（らん）になる', kenjou: '拝見（はいけん）する' },
        { basic: '聞く\n（聞きます）', jp: '聞く\n（聞きます）', sonkei: 'お聞きになる\n（被動：聞かれる）', kenjou: '伺（うかが）う\n承（うけたまわ）る' },
        { basic: '知っている\n（知っています）', jp: '知っている\n（知っています）', sonkei: 'ご存（ぞん）じだ\nご存じである', kenjou: '存（ぞん）じている\n存じ上げる' },
        { basic: 'あげる\n（あげます）', jp: 'あげる\n（あげます）', sonkei: '（對方給我：くださる）', kenjou: '差（さ）し上（あ）げる' },
        { basic: 'もらう\n（もらいます）', jp: 'もらう\n（もらいます）', sonkei: '（無直接對照）', kenjou: 'いただく\n頂戴（ちょうだい）する' }
    ];

    const keigoExamples = {
        business: [
            {
                jp: "本日はお忙しい中、弊社にお越しいただき誠にありがとうございます。",
                ruby: "本日<rt>ほんじつ</rt>はお忙<rt>いそが</rt>しい中<rt>なか</rt>、弊社<rt>へいしゃ</rt>にお越<rt>こ</rt>しいただき誠<rt>まこと</rt>にありがとうございます。",
                zh: "非常感謝您今天在百忙之中抽空蒞臨本公司。",
                normal: "今日は忙しいのに、うちの会社に来てくれて本当にありがとう。",
                analysis: "「お越しいただく」是「来る（來）」的尊敬語「お越しになる」結合「〜てもらう（承盟他人做某事）」的謙讓語表現，常用作迎賓致謝。"
            },
            {
                jp: "ただいま担当の者が参りますので、少々お待ちください。",
                ruby: "ただいま担当<rt>たんとう</rt>の者<rt>もの</rt>が参<rt>まい</rt>りますので、少々<rt>しょうしょう</rt>お待ち<rt>ま</rt>ください。",
                zh: "負責人員現在就過來，請您稍候片刻。",
                normal: "今、担当の人が来るから、ちょっと待って。",
                analysis: "「參る」是「行く/来る」的謙讓語（丁重語），向客戶描述自己人動作時用謙讓；「お待ちください」是「待つ」的尊敬語命令式（お＋連用形＋ください）。"
            },
            {
                jp: "資料を拝見いたしました。修正して明日までにご連絡いたします。",
                ruby: "資料<rt>しりょう</rt>を拝見<rt>はいけん</rt>いたしました。修正<rt>しゅうせい</rt>して明日<rt>あした</rt>までにご連絡<rt>れんらく</rt>いたします。",
                zh: "我已經拜讀過資料了。修改好之後，會在明天前與您聯絡。",
                normal: "資料を見たよ。直して明日までに連絡するね。",
                analysis: "「拝見する」是「見る」的謙讓語，表示自己看對方的資料；「ご連絡いたします」是「ご＋サ變動詞語幹＋いたす（謙讓）」，表達己方主動聯絡的敬意。"
            },
            {
                jp: "新商品の詳細につきましては、こちらの資料をご覧ください。",
                ruby: "新商品<rt>しんしょうひん</rt>の詳細<rt>しょうさい</rt>につきましては、こちらの資料<rt>しりょう</rt>をご覧ください。",
                zh: "關於新產品的細節，請參閱這份資料。",
                normal: "新商品の詳しいことは、この資料を見て。",
                analysis: "「ご覧になる」是「見る」的尊敬語，用於請對方看；「ご覧ください」為「ご覧になる」的請託祈使型態。"
            }
        ],
        dining: [
            {
                jp: "ご注文はお決まりになりましたでしょうか。",
                ruby: "ご注文<rt>ちゅうもん</rt>はお決<rt>き</rt>まりになりましたでしょうか。",
                zh: "請問您決定好點餐了嗎？",
                normal: "注文は決まった？",
                analysis: "使用「お＋連用形＋になる（尊敬語）」的常用說法，「決まる」變為「お決まりになる」，以極度尊敬顧客的決策。"
            },
            {
                jp: "温かいお飲み物は、食後にお持ちいたします。",
                ruby: "温<rt>あたた</rt>かいお飲<rt>の</rt>み物<rt>もの</rt>は、食後<rt>しょくご</rt>にお持ち<rt>も</rt>いたします。",
                zh: "熱飲我們將在餐後為您送上。",
                normal: "温かい飲み物は、ご飯のあとに持ってくるね。",
                analysis: "「お持ちいたします」是「持ってくる」的謙讓變形（お＋連用形＋いたす），表明自己為顧客提供端送飲料的動作。"
            },
            {
                jp: "こちらの席で召し上がりますか、それともお持ち帰りになりますか。",
                ruby: "こちらの席<rt>せき</rt>で召<rt>め</rt>し上が<rt>あ</rt>りますか、それともお持ち帰<rt>も</rt>りになりますか。",
                zh: "要在這邊內用，還是要外帶呢？",
                normal: "這裡吃？還是帶走？",
                analysis: "「召し上がる」是「食べる/飲む」的專屬尊敬語；「お持ち帰りになります」是「持ち帰る」的規則尊敬語變形。"
            }
        ],
        everyday: [
            {
                jp: "先生、明日の試験について伺いたいことがございます。",
                ruby: "先生<rt>せんせい</rt>、明日<rt>あした</rt>の試験<rt>しけん</rt>について伺<rt>うかが</rt>いたいことがございます。",
                zh: "老師，關於明天的考試，我有一些事情想請教您。",
                normal: "先生、明日のテストについて聞きたいことがあるよ。",
                analysis: "「伺う」是「聞く（詢問、請教）」的謙讓語；「ございます」是「ある」的丁寧語，對老師表達高尚的禮貌。"
            },
            {
                jp: "先生のおっしゃる通り、毎日練習することが大切ですね。",
                ruby: "先生<rt>せんせい</rt>のおっしゃる通<rt>とお</rt>り、毎日練習<rt>まいにちれんしゅう</rt>することが大切<rt>たいせつ</rt>ですね。",
                zh: "正如老師所說的，每天練習真的很重要呢。",
                normal: "先生の言う通り、毎日練習することが大切だね。",
                analysis: "「おっしゃる」是「言う」的特異尊敬語，用於尊稱對象（老師）所說的話語。"
            },
            {
                jp: "昨日先生にいただいた辞書を、大切に使っております。",
                ruby: "昨日先生<rt>きのうせんせい</rt>にいただいた辞書<rt>じしょ</rt>を、大切<rt>たいせつ</rt>に使<rt>つか</rt>っております。",
                zh: "我正珍惜地使用著昨天老師送我的字典。",
                normal: "昨日先生にもらった辞書を、大事に使っているよ。",
                analysis: "「いただく」是「もらう」的謙讓語，表示自己從長輩那裡獲得；「〜ておる」是「〜ている」的謙讓語（丁重語）。"
            }
        ],
        interview: [
            {
                jp: "私の強みは、何事にも誠實に取り組むことでございます。",
                ruby: "私<rt>わたし</rt>の強<rt>つよ</rt>みは、何事<rt>なにごと</rt>にも誠實<rt>せいじつ</rt>に取<rt>と</rt>り組<rt>く</rt>むことでございます。",
                zh: "我的優勢在於不論面對何事都能誠實地面對並努力付出。",
                normal: "僕のいいところは、何にでも真面目にやることだよ。",
                analysis: "面試自我介紹時，將判斷句尾「です/である」更換為極其鄭重的「ございます」，能給面試官帶來沉穩可靠的印象。"
            },
            {
                jp: "以前から貴社の技術力に興味を抱いておりました。",
                ruby: "以前<rt>いぜん</rt>から貴社<rt>きしゃ</rt>の技術力<rt>ぎじゅつりょく</rt>に興味<rt>きょうみ</rt>を抱<rt>いだ</rt>いておりました。",
                zh: "我從以前開始，就對貴公司的技術實力抱持著極大的興趣。",
                normal: "先前對貴公司的技術有興趣。",
                analysis: "稱呼面試公司為「貴社（きしゃ）」；「抱いておりました」為「抱いていた」的自謙動作（〜ておる + 過去式）。"
            }
        ]
    };

    // New 50-sentence database
    const keigoFiftyExamples = [
        {
            verb: "1. 行く・来る (去 / 來)",
            sub: "尊敬語：いらっしゃる、お越しになる、おいでになる | 謙讓語：參る、伺う",
            sentences: [
                {
                    jp: "先生は明日、何時にいらっしゃいますか。",
                    ruby: "先生<rt>せんせい</rt>は明日<rt>あした</rt>、何時<rt>なんじ</rt>にいらっしゃいますか。",
                    zh: "老師您明天幾點會到（過來）呢？",
                    type: "sonkei",
                    normal: "先生は明日、何時に来ますか。"
                },
                {
                    jp: "遠方からお越しになり、大変嬉しく存じます。",
                    ruby: "遠方<rt>えんぽう</rt>からお越し<rt>こ</rt>になり、大変<rt>たいへん</rt>嬉<rt>うれ</rt>しく存<rt>ぞん</rt>じます。",
                    zh: "您從遠方大駕光臨，我感到非常高興。",
                    type: "sonkei",
                    normal: "遠くから来てくれて、とても嬉しいです。"
                },
                {
                    jp: "ただいま社長の代わりに私が参りました。",
                    ruby: "ただいま社長<rt>しゃちょう</rt>の代<rt>か</rt>わりに私<rt>わたし</rt>が參<rt>まい</rt>りました。",
                    zh: "剛才我代表總經理前來了。",
                    type: "kenjou",
                    normal: "今、社長の代わりに私が来ました。"
                },
                {
                    jp: "明日、午後三時に事務所へ伺います。",
                    ruby: "明日<rt>あした</rt>、午後<rt>ごご</rt>三時<rt>さんじ</rt>に事務所<rt>じむしょ</rt>へ伺<rt>うかが</rt>います。",
                    zh: "明天下午三點我會去拜訪您的辦公室。",
                    type: "kenjou",
                    normal: "明日、午後三時に事務所へ行きます。"
                },
                {
                    jp: "社長はすでに會議室においでになります。",
                    ruby: "社長<rt>しゃちょう</rt>はすでに會議室<rt>かいぎしつ</rt>においでになります。",
                    zh: "總經理已經到（在）會議室了。",
                    type: "sonkei",
                    normal: "社長はもう会議室に行きました。"
                }
            ]
        },
        {
            verb: "2. いる (在 / 存在)",
            sub: "尊敬語：いらっしゃる、おいでになる | 謙讓語：居る（おる）",
            sentences: [
                {
                    jp: "今週の土曜日はご自宅にいらっしゃいますか。",
                    ruby: "今週<rt>こんしゅう</rt>の土曜日<rt>どようび</rt>はご自宅<rt>じたく</rt>にいらっしゃいますか。",
                    zh: "這週六您會在家（在）嗎？",
                    type: "sonkei",
                    normal: "今週の土曜日は家にいますか。"
                },
                {
                    jp: "担当者はあいにく席においでになりません。",
                    ruby: "担当者<rt>たんとうしゃ</rt>はあいにく席<rt>せき</rt>においでになりません。",
                    zh: "不湊巧，負責人目前不在位子上。",
                    type: "sonkei",
                    normal: "担当者は席にいません。"
                },
                {
                    jp: "私は本日の夕方まで会社におります。",
                    ruby: "私<rt>わたし</rt>は本日<rt>ほんじつ</rt>の夕方<rt>ゆうがた</rt>まで會社<rt>かいしゃ</rt>におります。",
                    zh: "我到今天傍晚為止都會在公司。",
                    type: "kenjou",
                    normal: "私は今天的夕方まで会社にいます。"
                },
                {
                    jp: "妻はただいま外出しております。",
                    ruby: "妻<rt>つま</rt>はただいま外出<rt>がいしゅつ</rt>しております。",
                    zh: "我的內人現在正在外出中。",
                    type: "kenjou",
                    normal: "妻は今出かけています。"
                },
                {
                    jp: "ロビーにどなたかいらっしゃいます。",
                    ruby: "ロビーにどなたかいらっしゃいます。",
                    zh: "大廳那邊好像有哪位客人在。",
                    type: "sonkei",
                    normal: "ロビーに誰かいます。"
                }
            ]
        },
        {
            verb: "3. 食べる・飲む (吃 / 喝)",
            sub: "尊敬語：召し上がる | 謙讓語：いただく",
            sentences: [
                {
                    jp: "どうぞ溫かいうちに召し上がってください。",
                    ruby: "どうぞ溫<rt>あたた</rt>かいうちに召<rt>め</rt>し上が<rt>あ</rt>ってください。",
                    zh: "請趁熱享用（吃）。",
                    type: "sonkei",
                    normal: "温かいうちに食べてください。"
                },
                {
                    jp: "お飲み物は何を召し上がりますか。",
                    ruby: "お飲<rt>の</rt>み物<rt>もの</rt>何<rt>なに</rt>を召<rt>め</rt>し上が<rt>あ</rt>りますか。",
                    zh: "飲料您要喝點什麼呢？",
                    type: "sonkei",
                    normal: "飲み物は何を飲みますか。"
                },
                {
                    jp: "お土産のケーキをおいしくいただきました。",
                    ruby: "お土産<rt>みやげ</rt>のケーキをおいしくいただきました。",
                    zh: "我非常美味地享用了您送的蛋糕名產。",
                    type: "kenjou",
                    normal: "お土産のケーキをおいしく食べました。"
                },
                {
                    jp: "こちらの温かいお茶をいただきます。",
                    ruby: "こちらの溫<rt>あたた</rt>かいお茶<rt>ちゃ</rt>をいただきます。",
                    zh: "那我就喝這杯熱茶了。",
                    type: "kenjou",
                    normal: "この温かいお茶を飲みます。"
                },
                {
                    jp: "ごちそうさまでした。お腹いっぱいいただきました。",
                    ruby: "ごちそうさまでした。お腹<rt>なか</rt>いっぱいいただきました。",
                    zh: "謝謝您的款待。我吃得很飽了。",
                    type: "kenjou",
                    normal: "ごちそうさまでした。お腹いっぱい食べました。"
                }
            ]
        },
        {
            verb: "4. 言う (說)",
            sub: "尊敬語：おっしゃる | 謙讓語：申す、申し上げる",
            sentences: [
                {
                    jp: "お客様がそうおっしゃっていました。",
                    ruby: "お客様<rt>きゃくさま</rt>がそうおっしゃっていました。",
                    zh: "客人剛才是這麼說的。",
                    type: "sonkei",
                    normal: "客がそう言っていました。"
                },
                {
                    jp: "先生、もう一度おっしゃっていただけますか。",
                    ruby: "先生<rt>せんせい</rt>、もう一度<rt>いちど</rt>おっしゃっていただけますか。",
                    zh: "老師，能請您再說一次嗎？",
                    type: "sonkei",
                    normal: "先生、もう一度言ってくれますか。"
                },
                {
                    jp: "私は田中と申します。よろしくお願いいたします。",
                    ruby: "私<rt>わたし</rt>は田中<rt>たなか</rt>と申<rt>もう</rt>します。よろしくお願いいたします。",
                    zh: "我姓田中。請多指教。",
                    type: "kenjou",
                    normal: "私は田中と言います。よろしく。"
                },
                {
                    jp: "社長に伝言を申し上げました。",
                    ruby: "社長<rt>しゃちょう</rt>に伝言<rt>でんごん</rt>を申し上げました。",
                    zh: "我已經向總經理報告（傳話）了。",
                    type: "kenjou",
                    normal: "社長に伝言を言いました。"
                },
                {
                    jp: "心よりお礼申し上げます。",
                    ruby: "心<rt>こころ</rt>よりお禮<rt>れい</rt>申し上げます。",
                    zh: "由衷地向您表達謝意。",
                    type: "kenjou",
                    normal: "心からお礼を言います。"
                }
            ]
        },
        {
            verb: "5. する (做)",
            sub: "尊敬語：なさる | 謙讓語：いたす",
            sentences: [
                {
                    jp: "週末はどのようなことをなさいますか。",
                    ruby: "週末<rt>しゅうまつ</rt>はどのようなことをなさいますか。",
                    zh: "您週末都做些什麼樣的活動呢？",
                    type: "sonkei",
                    normal: "週末はどんなことをしますか。"
                },
                {
                    jp: "ご心配なさらないでください。大丈夫です。",
                    ruby: "ご心配<rt>しんぱい</rt>なさらないでください。大丈夫<rt>だいじょうぶ</rt>です。",
                    zh: "請您不要擔心。沒問題的。",
                    type: "sonkei",
                    normal: "心配しないでください。大丈夫です。"
                },
                {
                    jp: "その件につきましては、私が担当いたします。",
                    ruby: "その件<rt>けん</rt>につきましては、私<rt>わたし</rt>が担当<rt>たんとう</rt>いたします。",
                    zh: "關於那一件事，將由我來負責（做）。",
                    type: "kenjou",
                    normal: "その件については、私が担当します。"
                },
                {
                    jp: "お待たせいたしました。こちらへどうぞ。",
                    ruby: "お待<rt>ま</rt>たせいたしました。こちらへどうぞ。",
                    zh: "讓您久等了。請往這邊。",
                    type: "kenjou",
                    normal: "待たせました。こちらへどうぞ。"
                },
                {
                    jp: "お仕事は何をなさっているのですか。",
                    ruby: "お仕事<rt>しごと</rt>は何<rt>なに</rt>をなさっているのですか。",
                    zh: "您的工作是做哪一行的呢？",
                    type: "sonkei",
                    normal: "仕事は何をしているのですか。"
                }
            ]
        },
        {
            verb: "6. 見る (看)",
            sub: "尊敬語：ご覧になる | 謙讓語：拝見する",
            sentences: [
                {
                    jp: "この映画はもうご覧になりましたか。",
                    ruby: "この映畫<rt>&gがい</rt>はもうご覧<rt>らん</rt>になりましたか。",
                    zh: "這部電影您已經看過了嗎？",
                    type: "sonkei",
                    normal: "この映画はもう見ましたか。"
                },
                {
                    jp: "パンフレットをどうぞご覧ください。",
                    ruby: "パンフレットをどうぞご覧<rt>らん</rt>ください。",
                    zh: "請隨意參閱指南小冊子。",
                    type: "sonkei",
                    normal: "パンフレットをどうぞ見てください。"
                },
                {
                    jp: "昨日送っていただいたメールを拝見しました。",
                    ruby: "昨日送<rt>きのうおく</rt>っていただいたメールを拝見<rt>はいけん</rt>しました。",
                    zh: "我已經拜讀過您昨天寄給我的信件了。",
                    type: "kenjou",
                    normal: "Ref: 昨天看完了。"
                },
                {
                    jp: "お客様のパスポートを拝見いたします。",
                    ruby: "お客様<rt>きゃくさま</rt>のパスポートを拝見<rt>はいけん</rt>いたします。",
                    zh: "我需要過目一下您的護照。",
                    type: "kenjou",
                    normal: "客のパスポートを見ます。"
                },
                {
                    jp: "明日のニュースをご覧になればわかります。",
                    ruby: "明日<rt>あした</rt>のニュースをご覧<rt>らん</rt>になればわかります。",
                    zh: "您只要看了明天的電視新聞就會明白了。",
                    type: "sonkei",
                    normal: "明日のニュースを見ればわかります。"
                }
            ]
        },
        {
            verb: "7. 聞く (聽 / 問)",
            sub: "尊敬語：お聞きになる | 謙讓語：伺う、承る",
            sentences: [
                {
                    jp: "社長、こちらのニュースはお聞きになりましたか。",
                    ruby: "社長<rt>しゃちょう</rt>、こちらのニュースはお聞き<rt>き</rt>になりましたか。",
                    zh: "總經理，您聽說過這個新聞了嗎？",
                    type: "sonkei",
                    normal: "社長、このニュースは聞きましたか。"
                },
                {
                    jp: "少しお話を伺ってもよろしいでしょうか。",
                    ruby: "少<rt>すこ</rt>しお話<rt>はなし</rt>を伺<rt>うかが</rt>ってもよろしいでしょうか。",
                    zh: "能請教（聽）您說一會兒話嗎？",
                    type: "kenjou",
                    normal: "稍等一下聽說。"
                },
                {
                    jp: "詳しいお話を伺いに、明日オフィスへ参ります。",
                    ruby: "詳<rt>くわ</rt>しいお話<rt>はなし</rt>を伺<rt>うかが</rt>いに、明日<rt>あした</rt>オフィスへ參<rt>まい</rt>ります。",
                    zh: "為了向您請教詳細情況，我明天會前往您的辦公室。",
                    type: "kenjou",
                    normal: "詳細聽明天過去。"
                },
                {
                    jp: "お客様のご注文を承りました。",
                    ruby: "お客様<rt>きゃくさま</rt>のご注文<rt>ちゅうもん</rt>を承<rt>うけたまわ</rt>りました。",
                    zh: "我已為您受理了您的點單。",
                    type: "kenjou",
                    normal: "客の注文を聞きました。"
                },
                {
                    jp: "ご質問は電話でも承っております。",
                    ruby: "ご質問<rt>しつもん</rt>は電話<rt>でんわ</rt>でも承<rt>うけたまわ</rt>っております。",
                    zh: "您的提問我們也可以透過電話受理。",
                    type: "kenjou",
                    normal: "質問は電話でも聞いています。"
                }
            ]
        },
        {
            verb: "8. 知っている (知道)",
            sub: "尊敬語：ご存じだ | 謙讓語：存じている、存じ上げる",
            sentences: [
                {
                    jp: "この歴史的な事件をご存じですか。",
                    ruby: "この歴史的<rt>れきしてき</rt>な事件<rt>じけん</rt>をご存<rt>ぞん</rt>じですか。",
                    zh: "您知道這個歷史性的事件嗎？",
                    type: "sonkei",
                    normal: "這個事件你知道嗎？"
                },
                {
                    jp: "先生はそのことをご存じないようです。",
                    ruby: "先生<rt>せんせい</rt>はそのことをご存<rt>ぞん</rt>じないようです。",
                    zh: "老師似乎並不知道那一件事。",
                    type: "sonkei",
                    normal: "老師好像不知道。"
                },
                {
                    jp: "はい、そのお名前はよく存じております。",
                    ruby: "はい、そのお名前<rt>naまえ</rt>はよく存<rt>ぞん</rt>じております。",
                    zh: "是的，我非常清楚地知道那個名字。",
                    type: "kenjou",
                    normal: "我知道那個名字。"
                },
                {
                    jp: "社長の奥様を存じ上げております。",
                    ruby: "社長<rt>しゃちょう</rt>の奥様<rt>おくさま</rt>を存<rt>ぞん</rt>じ上げております。",
                    zh: "我認識（知道）總經理的夫人。",
                    type: "kenjou",
                    normal: "認識社長夫人。"
                },
                {
                    jp: "あいにくその計画は存じ上げませんでした。",
                    ruby: "あいにくその計画<rt>けいかく</rt>は存<rt>ぞん</rt>じ上げませんでした。",
                    zh: "不湊巧，我之前並不知道那個計畫。",
                    type: "kenjou",
                    normal: "不知道那個計劃。"
                }
            ]
        },
        {
            verb: "9. あげる (給 / 贈與)",
            sub: "尊敬語：くださる（對方給我） | 謙讓語：差し上げる（我給對方）",
            sentences: [
                {
                    jp: "先生が私に本をくださいました。",
                    ruby: "先生<rt>せんせい</rt>が私<rt>わたし</rt>に本<rt>ほん</rt>をくださいました。",
                    zh: "老師送（給）了我一本書。",
                    type: "sonkei",
                    normal: "老師給我書。"
                },
                {
                    jp: "お客様にお茶を差し上げてください。",
                    ruby: "お客様<rt>きゃくさま</rt>にお茶<rt>ちゃ</rt>を差し上げてください。",
                    zh: "請給客人端上一杯茶。",
                    type: "kenjou",
                    normal: "給客人端茶。"
                },
                {
                    jp: "先輩が親切に教えてくださいました。",
                    ruby: "先輩<rt>せんぱい</rt>が親切<rt>しんせつ</rt>に教<rt>おし</rt>えてくださいました。",
                    zh: "前輩非常熱心地教導（給我）了我。",
                    type: "sonkei",
                    normal: "前輩熱心教我。"
                },
                {
                    jp: "何かお手伝いできることがあれば、お電話差し上げます。",
                    ruby: "何かお手伝<rt>てつだ</rt>いできることがあれば、お電話<rt>でんわ</rt>差し上げます。",
                    zh: "如果有任何我可以幫忙的地方，我會撥電話給您聯絡。",
                    type: "kenjou",
                    normal: "有幫忙的就打電話。"
                },
                {
                    jp: "貴重なご意見をくださり、感謝いたします。",
                    ruby: "貴重<rt>きちょう</rt>なご意見<rt>いけん</rt>をくださり、感謝<rt>かんしゃ</rt>いたします。",
                    zh: "非常感謝您提供寶貴的意見。",
                    type: "sonkei",
                    normal: "感謝給我們意見。"
                }
            ]
        },
        {
            verb: "10. もらう (得到 / 收到 / 領受)",
            sub: "謙讓語：いただく、頂戴する",
            sentences: [
                {
                    jp: "この美しいお花は、先生にいただきました。",
                    ruby: "この美<rt>うつく</rt>しいお花<rt>はな</rt>は、先生<rt>せんせい</rt>にいただきました。",
                    zh: "這盆美麗的花是我從老師那裡得到（收下）的。",
                    type: "kenjou",
                    normal: "這花是老師給我的。"
                },
                {
                    jp: "お名刺を頂戴できますでしょうか。",
                    ruby: "お名刺<rt>めいし</rt>を頂戴<rt>ちょうだい</rt>できますでしょうか。",
                    zh: "能方便請教您得到（收下）一張名片嗎？（能與您交換名片嗎？）",
                    type: "kenjou",
                    normal: "能給我名片嗎？"
                },
                {
                    jp: "本日ご説明をいただき、よくわかりました。",
                    ruby: "本日<rt>ほんじつ</rt>ご説明<rt>せつめい</rt>をいただき、よくわかりました。",
                    zh: "今天得到您的說明，我非常清楚了。",
                    type: "kenjou",
                    normal: "今天聽說明懂了。"
                },
                {
                    jp: "お客様から貴重なお時間を頂戴しました。",
                    ruby: "お客様<rt>きゃくさま</rt>から貴重<rt>きちょう</rt>なお時間<rt>じかん</rt>を頂戴<rt>ちょうだい</rt>しました。",
                    zh: "我從顧客那裡得到了寶貴的時間。",
                    type: "kenjou",
                    normal: "佔用顧客時間。"
                },
                {
                    jp: "明日はお休みをいただいております。",
                    ruby: "明日<rt>あした</rt>はお休み<rt>やす</rt>みをいただいております。",
                    zh: "明天我已經得到（請好）休假了。",
                    type: "kenjou",
                    normal: "明天請假了。"
                }
            ]
        }
    ];

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
            diff: "「に」是確實會到達的終點（In/At）；「へ」是指向前進的方向（Towards），不一定強調最後的落點。"
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
                    ruby: "毎朝<rt>まいあさ</rt>七時<rt>しちじ</rt>に家<rt>いえ</rt>を出<rt>得</rt>ます。", // fixed ruby typo
                    zh: "每天早上七點出門（離開家）。 (移動的出發點)",
                },
                {
                    jp: "公園を散歩するのが好きです。",
                    ruby: "公園<rt>こうえん</rt>を散歩<rt>さんぽ</rt>するのが好き<rt>す</rt>きです。",
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
            summary: "動作场所、工具手段、原因理由、範圍限制",
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
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex flex-col gap-2">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Book className="text-indigo-500" size={28} />
                        日文學習文法筆記
                    </h2>
                    <p className="text-sm text-gray-500">整理動詞核心變化規則、核心助詞用法與敬語（尊敬、謙讓）。</p>
                </div>
            </div>

            {/* Sub-tab Switcher Container */}
            <div className="subtab-container" style={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
                <button 
                    className={`subtab-button ${activeSubTab === 'verbs' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('verbs')}
                >
                    動詞活用解析
                </button>
                <button 
                    className={`subtab-button ${activeSubTab === 'particles' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('particles')}
                >
                    助詞用法對比
                </button>
                <button 
                    className={`subtab-button ${activeSubTab === 'keigo' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('keigo')}
                >
                    敬語入門指南
                </button>
            </div>

            {/* Sub-tab 1: Verbs (Original content) */}
            {activeSubTab === 'verbs' && (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="glass-card overflow-hidden">
                                <div className="p-4 border-b bg-gray-50/50 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                                    {cat.icon}
                                    <h3 className="font-bold text-gray-800" style={{ fontWeight: 700 }}>{cat.title}</h3>
                                </div>
                                <div className="p-5" style={{ padding: '1.25rem' }}>
                                    {cat.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3" style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '16px', display: 'flex', gap: '0.75rem' }}>
                        <AlertCircle className="text-indigo-500 mt-1 flex-shrink-0" size={18} style={{ color: '#4f46e5', flexShrink: 0, marginTop: '2px' }} />
                        <div className="text-sm text-indigo-800 leading-relaxed" style={{ fontSize: '0.875rem', color: '#3730a3', lineHeight: 1.5 }}>
                            <strong>學習小技巧：</strong><br/>
                            第一類動詞的「特殊例外」最容易出錯，它們看起來像二類（以 iru/eru 結尾），但實際變形時要依照一類規則處理（如：帰る → 帰ります）。
                        </div>
                    </div>
                </>
            )}

            {/* Sub-tab 2: Particles (New content) */}
            {activeSubTab === 'particles' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                    
                    {/* Part 1: Core Particle Comparisons */}
                    <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            <HelpCircle className="text-indigo-500" size={20} />
                            五大核心助詞對比辨析
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
            )}

            {/* Sub-tab 3: Keigo (Original Keigo tab) */}
            {activeSubTab === 'keigo' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                    
                    {/* Concept Card */}
                    <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            <Award className="text-indigo-500" size={20} />
                            敬語三大支柱觀念
                        </h3>
                        <p className="text-sm text-gray-600 mb-4" style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6 }}>
                            日文敬語的核心在於**「劃清說話者、主詞與聽話者之間的角色界線」**，主要可區分為三大類別：
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <span className="keigo-badge badge-sonkei" style={{ flexShrink: 0, width: '70px' }}>尊敬語</span>
                                <div style={{ fontSize: '0.875rem' }}>
                                    <strong style={{ color: '#ef4444' }}>抬高他人</strong>。用來描述「對方」或「長輩/客戶」的動作、物品或狀態。絕對不用於描述自己。
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <span className="keigo-badge badge-kenjou" style={{ flexShrink: 0, width: '70px' }}>謙讓語</span>
                                <div style={{ fontSize: '0.875rem' }}>
                                    <strong style={{ color: '#22c55e' }}>降低自己</strong>。用來描述「自己」或「我方人員」與對方產生交集的行為，以示對對方的敬意。
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <span className="keigo-badge badge-teinei" style={{ flexShrink: 0, width: '70px' }}>丁寧語</span>
                                <div style={{ fontSize: '0.875rem' }}>
                                    <strong>展現禮貌</strong>。不論涉及動作的主體是誰，純粹向聽話者表達禮貌（如 `です`、`ます`、`ございます` 等）。
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparative Table */}
                    <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Languages className="text-indigo-500" size={20} />
                            常用敬語動詞對照表
                        </h3>
                        <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>※ 特異/不規則形最為常用，是敬語學習的核心基礎。</p>
                        
                        <div className="keigo-table-wrapper">
                            <table className="keigo-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '25%' }}>普通體 / 丁寧體</th>
                                        <th style={{ width: '38%' }}>尊敬語（抬高對方）</th>
                                        <th style={{ width: '37%' }}>謙讓語（降低自己）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {keigoVerbs.map((v, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 600, color: '#374151' }}>
                                                {v.jp.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                                            </td>
                                            <td style={{ color: '#dc2626', whiteSpace: 'pre-wrap' }}>
                                                {v.sonkei.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                                            </td>
                                            <td style={{ color: '#16a34a', whiteSpace: 'pre-wrap' }}>
                                                {v.kenjou.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Rule Cards */}
                    <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info className="text-indigo-500" size={20} />
                            敬語的規則活用公式
                        </h3>
                        
                        {/* Sonkei Rule */}
                        <div className="keigo-rule-card bg-sonkei-card">
                            <h4 style={{ fontWeight: 700, color: '#b91c1c', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                ✿ 尊敬語（對他人的動作）
                            </h4>
                            <ul style={{ fontSize: '0.875rem', color: '#7f1d1d', paddingLeft: '1.25rem', listStyleType: 'disc', lineHeight: 1.6 }}>
                                <li>
                                    <strong>公式一</strong>：<code>お + 動詞連用形(ます形去ます) + になる</code><br/>
                                    <em>例</em>：書く → <strong>お書きになる</strong>；待つ → <strong>お待ちになる</strong>。
                                </li>
                                <li>
                                    <strong>公式二</strong>：<code>ご + サ變動詞語幹(漢字部分) + になる</code><br/>
                                    <em>例</em>：連絡する → <strong>ご連絡になる</strong>；案内する → <strong>ご案内になる</strong>。
                                </li>
                                <li>
                                    <strong>公式三（被動替代）</strong>：<code>直接使用動詞被動形</code>（語氣較親近，不及公式一鄭重）<br/>
                                    <em>例</em>：先生は明日<strong>来られます</strong>（老師明天會來）。
                                </li>
                            </ul>
                        </div>

                        {/* Kenjou Rule */}
                        <div className="keigo-rule-card bg-kenjou-card" style={{ marginTop: '1rem' }}>
                            <h4 style={{ fontWeight: 700, color: '#15803d', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                ✿ 謙讓語（描述涉及對方的己方行為）
                            </h4>
                            <ul style={{ fontSize: '0.875rem', color: '#14532d', paddingLeft: '1.25rem', listStyleType: 'disc', lineHeight: 1.6 }}>
                                <li>
                                    <strong>公式一</strong>：<code>お + 動詞連用形 + する / いたす</code><br/>
                                    <em>例</em>：持つ → <strong>お持ちする / お持ちいたします</strong>（幫您提）。
                                </li>
                                <li>
                                    <strong>公式二</strong>：<code>ご + サ變動詞語幹 + する / いたす</code><br/>
                                    <em>例</em>：介紹する → <strong>ご紹介する / 介紹いたします</strong>（為您介紹）。
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Massive Example Sentences */}
                    <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Book className="text-indigo-500" size={20} />
                            四大商務日常情境例句學習
                        </h3>

                        {/* 情境 1 */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'hsl(var(--indigo-900))', paddingBottom: '0.4rem', borderBottom: '2px solid hsl(var(--indigo-500))', marginBottom: '1rem' }}>
                                一、商務會話 / 客戶接待情境 (Business Settings)
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {keigoExamples.business.map((ex, idx) => (
                                    <div key={idx} className="keigo-example-item">
                                        <div className="keigo-example-jp">
                                            <ruby dangerouslySetInnerHTML={{ __html: ex.ruby }} />
                                        </div>
                                        <div className="keigo-example-meta">
                                            <span className="keigo-badge badge-teinei">中文</span>
                                            <span className="keigo-example-zh">{ex.zh}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                                            <strong>常體對照：</strong> {ex.normal}
                                        </div>
                                        <div className="keigo-example-analysis">
                                            <strong>解析：</strong>{ex.analysis}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 情境 2 */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'hsl(var(--indigo-900))', paddingBottom: '0.4rem', borderBottom: '2px solid hsl(var(--indigo-500))', marginBottom: '1rem' }}>
                                二、餐飲服務 / 購物消費情境 (Service & Dining)
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {keigoExamples.dining.map((ex, idx) => (
                                    <div key={idx} className="keigo-example-item">
                                        <div className="keigo-example-jp">
                                            <ruby dangerouslySetInnerHTML={{ __html: ex.ruby }} />
                                        </div>
                                        <div className="keigo-example-meta">
                                            <span className="keigo-badge badge-teinei">中文</span>
                                            <span className="keigo-example-zh">{ex.zh}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                                            <strong>常體對照：</strong> {ex.normal}
                                        </div>
                                        <div className="keigo-example-analysis">
                                            <strong>解析：</strong>{ex.analysis}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 情境 3 */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'hsl(var(--indigo-900))', paddingBottom: '0.4rem', borderBottom: '2px solid hsl(var(--indigo-500))', marginBottom: '1rem' }}>
                                三、日常應對 / 學校與師長互動 (School & Senior Interactions)
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {keigoExamples.everyday.map((ex, idx) => (
                                    <div key={idx} className="keigo-example-item">
                                        <div className="keigo-example-jp">
                                            <ruby dangerouslySetInnerHTML={{ __html: ex.ruby }} />
                                        </div>
                                        <div className="keigo-example-meta">
                                            <span className="keigo-badge badge-teinei">中文</span>
                                            <span className="keigo-example-zh">{ex.zh}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                                            <strong>常體對照：</strong> {ex.normal}
                                        </div>
                                        <div className="keigo-example-analysis">
                                            <strong>解析：</strong>{ex.analysis}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 情境 4 */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'hsl(var(--indigo-900))', paddingBottom: '0.4rem', borderBottom: '2px solid hsl(var(--indigo-500))', marginBottom: '1rem' }}>
                                四、求職面試 / 自我經歷陳述 (Job Interviews)
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {keigoExamples.interview.map((ex, idx) => (
                                    <div key={idx} className="keigo-example-item">
                                        <div className="keigo-example-jp">
                                            <ruby dangerouslySetInnerHTML={{ __html: ex.ruby }} />
                                        </div>
                                        <div className="keigo-example-meta">
                                            <span className="keigo-badge badge-teinei">中文</span>
                                            <span className="keigo-example-zh">{ex.zh}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                                            <strong>常體對照：</strong> {ex.normal}
                                        </div>
                                        <div className="keigo-example-analysis">
                                            <strong>解析：</strong>{ex.analysis}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Massive 50-sentence database */}
                    <div className="glass-card p-5" style={{ padding: '1.25rem' }}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Languages className="text-indigo-500" size={20} />
                            常用敬語十類核心動詞：50 句精選例句對照
                        </h3>
                        <p className="text-sm text-gray-600 mb-4" style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6 }}>
                            點擊下方各組核心動詞以展開學習 5 個精選的敬語例句（包含尊敬語與謙讓語的實際商務與日常應用對照）。
                        </p>

                        <div className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {keigoFiftyExamples.map((item, idx) => (
                                <details key={idx} className="keigo-details">
                                    <summary className="keigo-summary">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.verb}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{item.sub}</span>
                                        </div>
                                    </summary>
                                    <div className="keigo-details-content">
                                        {item.sentences.map((s, sIdx) => (
                                            <div key={sIdx} className="keigo-example-item">
                                                <div className="keigo-example-jp">
                                                    <ruby dangerouslySetInnerHTML={{ __html: s.ruby }} />
                                                </div>
                                                <div className="keigo-example-meta">
                                                    <span className={`keigo-badge ${s.type === 'sonkei' ? 'badge-sonkei' : 'badge-kenjou'}`}>
                                                        {s.type === 'sonkei' ? '尊敬語' : '謙讓語'}
                                                    </span>
                                                    <span className="keigo-badge badge-teinei">中文</span>
                                                    <span className="keigo-example-zh" style={{ fontWeight: 500 }}>{s.zh}</span>
                                                </div>
                                                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                                                    <strong>對照一般說法：</strong> {s.normal}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* Warning Tips */}
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3" style={{ padding: '1rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', display: 'flex', gap: '0.75rem' }}>
                        <ShieldAlert className="text-red-500 mt-1 flex-shrink-0" size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                        <div className="text-sm text-indigo-800 leading-relaxed" style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: 1.5 }}>
                            <strong style={{ color: '#b91c1c' }}>⚠️ 常見敬語使用誤區（雙重敬語）：</strong><br/>
                            在一個動詞上重複使用同性質的敬語，稱為雙重敬語。例如將「召し上がる」套用規則形寫成「お召し上がりになる」（召し上がる已經是尊敬語，不需再加上お…資源之類）。這是日本商務上也常犯的錯誤，學習時需特別留意！
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
