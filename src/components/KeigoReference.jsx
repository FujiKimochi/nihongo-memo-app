import React from 'react';
import { Award, Languages, Info, Book, ShieldAlert } from 'lucide-react';

export function KeigoReference() {
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
                normal: "今、担当の人が来るから、ちょっと待ってください。",
                analysis: "自己的員工「者（もの）」對外人而言屬於己方，因此動作用謙讓語「参ります」；要求對方等待則使用尊敬語公式的變形「少々お待ちください」。"
            },
            {
                jp: "こちらの資料をご覧になり、ご検討いただけますと幸いです。",
                ruby: "こちらの資料<rt>しりょう</rt>をご覧<rt>らん</rt>になり、ご検討<rt>けんとう</rt>いただけますと幸<rt>さいわ</rt>いです。",
                zh: "若您能參閱這份資料並予以考慮，我將不勝榮幸。",
                normal: "この資料を見て、考えてくれると嬉しいです。",
                analysis: "對客戶的動作使用尊敬語「ご覧になる」，並將思考的動作加上「ご+漢語+いただく」表示請求對方考慮，結尾「幸いです」是極為得體的商務委婉語。"
            }
        ],
        dining: [
            {
                jp: "ご注文はお決まりになりましたでしょうか。",
                ruby: "ご注文<rt>ちゅうもん</rt>はお決<rt>き</rt>まりになりましたでしょうか。",
                zh: "請問您決定好要點什麼了嗎？",
                normal: "注文は決まった？",
                analysis: "將對方的「注文」冠上美化語「ご」，並將動詞改為尊敬公式「お+連用形+になる」以表達服務業的崇高敬意。"
            },
            {
                jp: "それでは、こちらのランチセットを一ついただきます。",
                ruby: "それでは、こちらのランチセットを一<rt>ひと</rt>ついただきます。",
                zh: "那麼，我要點一份這個午間套餐。",
                normal: "じゃあ、このランチセットを一つ食べるよ。",
                analysis: "顧客點餐說「我要吃/喝這個」時，在店員面前應使用謙讓語「いただきます」以展現有教養的禮貌談吐。"
            },
            {
                jp: "お席へご案内いたします。こちらへどうぞ。",
                ruby: "お席<rt>せき</rt>へご案内<rt>あんない</rt>いたします。こちらへどうぞ。",
                zh: "我為您帶位。請往這邊走。",
                normal: "席に案内するよ。こっちへおいで。",
                analysis: "服務人員為顧客帶路是自己提供的動作，使用謙讓公式「ご+サ變動詞語幹+いたします」，表現極高敬意。"
            }
        ],
        everyday: [
            {
                jp: "先生、昨日の宿題についてお聞きしたいことがございます。",
                ruby: "先生<rt>せんせい</rt>、昨日<rt>きのう</rt>の宿題<rt>しゅくだい</rt>についてお聞き<rt>き</rt>したいことがございます。",
                zh: "老師，關於昨天的作業，我有想請教（問）您的地方。",
                normal: "先生、昨日の宿題について聞きたいことがあるんだけど。",
                analysis: "向老師提問是單向動作，使用「お+連用形+したい」謙讓表達想請教；結尾的「ある」換成丁寧語「ございます」展現學生禮儀。"
            },
            {
                jp: "課長がその計画についておっしゃったことは本当ですか。",
                ruby: "課長<rt>かちょう</rt>がその計画<rt>けいかく</rt>についておっしゃったことは本当<rt>ほんとう</rt>ですか。",
                zh: "課長之前提到的關於那個計劃的事是真的嗎？",
                normal: "課長がその計画について言ったことは本当？",
                analysis: "談論上司「說（言う）」的內容時，必須改用尊敬動詞「おっしゃる」，以向旁人展現對長輩的尊重。"
            },
            {
                jp: "明日は何時に学校にいらっしゃいますか。",
                ruby: "明日<rt>あした</rt>は何時<rt>なんじ</rt>に学校<rt>がっこう</rt>にいらっしゃいますか。",
                zh: "您明天幾點會到學校呢？",
                normal: "明日は何時に学校に来る（いる）？",
                analysis: "詢問老師「來學校」或「在學校」時，使用萬用的尊敬語「いらっしゃる」，能同時涵蓋行、來、在三種情境。"
            }
        ],
        interview: [
            {
                jp: "私は大学で日本語と言語学を専攻しておりました。",
                ruby: "私<rt>わたし</rt>は大学<rt>だいがく</rt>で日本語<rt>にほんご</rt>と言語学<rt>げんごがく</rt>を専攻<rt>せんこう</rt>しておりました。",
                zh: "我以前在大學專攻日語與語言學。",
                normal: "私は大学で日本語と言語学を専攻していた。",
                analysis: "面試時陳述自我經歷，要將狀態動詞「〜ている」改為謙讓語「〜ておる」，並加上「ます」的過去式「〜ておりました」以求沉穩。"
            },
            {
                jp: "御社の経営理念を拝見し、深く共感いたしました。",
                ruby: "御社<rt>おんしゃ</rt>の経営理念<rt>けいえいりねん</rt>を拝見<rt>はいけん</rt>し、深く共感<rt>きょうかん</rt>いたしました。",
                zh: "在閱讀了貴公司的經營理念後，我深受共鳴與感動。",
                normal: "あなたの会社の経営理念を見て、とても共感した。",
                analysis: "對面試官的公司稱「御社（貴公司）」，看經營理念使用謙讓語「拝見する」，自己的心意共鳴使用「共感いたしました（いたしました是する的謙讓）」。"
            },
            {
                jp: "前職では主に新規開拓の営業を担当しておりました。",
                ruby: "前職<rt>ぜんしょく</rt>では主<rt>おも</rt>に新規開拓<rt>しんきかいたく</rt>の営業<rt>えいぎょう</rt>を担当<rt>たんとう</rt>しておりました。",
                zh: "在上一份工作中，我主要負責開拓新客戶的業務。",
                normal: "前の仕事では主に新規開拓の営業を担当していた。",
                analysis: "向面試官有禮貌地說明過去工作經歷，使用「〜ておりました」取代一般的「〜ていました」，營造專業踏實的感覺。"
            }
        ]
    };

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
                    ruby: "お飲<rt>の</rt>み物<rt>mono</rt>何<rt>なに</rt>を召<rt>め</rt>し上が<rt>あ</rt>りますか。",
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
                    jp: "こちらの溫かいお茶をいただきます。",
                    ruby: "こちらの溫<rt>あたた</rt>かいお茶<rt>ちゃ</rt>調<rt>ちょう</rt>いただきます。",
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
            verb: "4. 言說 / 言う (說)",
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
                    ruby: "その件<rt>けん</rt>につきましては、私<rt>わたし</rt>加<rt>が</rt>担当<rt>たんとう</rt>いたします。",
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
                    ruby: "この映畫<rt>えいが</rt>はもうご覧<rt>らん</rt>になりましたか。",
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
                    normal: "昨日送ってくれたメールを見ました。"
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
                    normal: "少し話を聞いてもいいですか。"
                },
                {
                    jp: "詳しいお話を伺いに、明日オフィスへ参ります。",
                    ruby: "詳<rt>くわ</rt>しいお話<rt>はなし</rt>を伺<rt>うかが</rt>いに、明日<rt>あした</rt>オフィスへ參<rt>まい</rt>ります。",
                    zh: "為了向您請教詳細情況，我明天會前往您的辦公室。",
                    type: "kenjou",
                    normal: "詳しい話を聞きに、明日オフィスへ行きます。"
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
                    ruby: "ご質問<rt>しつもん</rt>は電話<rt>でんわ</rt>防<rt>で</rt>も承<rt>うけたまわ</rt>っております。",
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
                    normal: "この歴史的な事件を知っていますか。"
                },
                {
                    jp: "先生はそのことをご存じないようです。",
                    ruby: "先生<rt>せんせい</rt>はそのことをご存<rt>ぞん</rt>じないようです。",
                    zh: "老師似乎並不知道那一件事。",
                    type: "sonkei",
                    normal: "先生はそのことを知らないようです。"
                },
                {
                    jp: "はい、そのお名前はよく存じております。",
                    ruby: "はい、そのお名前<rt>なまえ</rt>はよく存<rt>ぞん</rt>じております。",
                    zh: "是的，我非常清楚地知道那個名字。",
                    type: "kenjou",
                    normal: "はい、その名前はよく知っています。"
                },
                {
                    jp: "社長の奥様を存じ上げております。",
                    ruby: "社長<rt>しゃちょう</rt>の奥様<rt>おくさま</rt>を存<rt>ぞん</rt>じ上げております。",
                    zh: "我認識（知道）總經理的夫人。",
                    type: "kenjou",
                    normal: "社長の奥さんを知っています。"
                },
                {
                    jp: "あいにくその計画は存じ上げませんでした。",
                    ruby: "あいにくその計画<rt>けいかく</rt>は存<rt>ぞん</rt>じ上げませんでした。",
                    zh: "不湊巧，我之前並不知道那個計畫。",
                    type: "kenjou",
                    normal: "残念ながらその計画は知りませんでした。"
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
                    normal: "先生が私に本をくれました。"
                },
                {
                    jp: "お客様にお茶を差し上げてください。",
                    ruby: "お客様<rt>きゃくさま</rt>にお茶<rt>ちゃ</rt>を差し上げてください。",
                    zh: "請給客人端上一杯茶。",
                    type: "kenjou",
                    normal: "客にお茶をあげてください。"
                },
                {
                    jp: "先輩が親切に教えてくださいました。",
                    ruby: "先輩<rt>せんぱい</rt>が親切<rt>しんせつ</rt>に教<rt>おし</rt>えてくださいました。",
                    zh: "前輩非常熱心地教導（給我）了我。",
                    type: "sonkei",
                    normal: "先輩が親切に教えてくれました。"
                },
                {
                    jp: "何かお手伝いできることがあれば、お電話差し上げます。",
                    ruby: "何かお手伝<rt>てつだ</rt>いできることがあれば、お電話<rt>でんわ</rt>差し上げます。",
                    zh: "如果有任何我可以幫忙的地方，我會撥電話給您聯絡。",
                    type: "kenjou",
                    normal: "何か手伝うことがあれば、電話します。"
                },
                {
                    jp: "貴重なご意見をくださり、感謝いたします。",
                    ruby: "貴重<rt>きちょう</rt>なご意見<rt>いけん</rt>をくださり、感謝<rt>かんしゃ</rt>いたします。",
                    zh: "非常感謝您提供寶貴的意見。",
                    type: "sonkei",
                    normal: "貴重な意見をくれて、感謝します。"
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
                    normal: "このきれいな花は、先生にもらいました。"
                },
                {
                    jp: "お名刺を頂戴できますでしょうか。",
                    ruby: "お名刺<rt>めいし</rt>を頂戴<rt>ちょうだい</rt>できますでしょうか。",
                    zh: "能方便請教您得到（收下）一張名片嗎？（能與您交換名片嗎？）",
                    type: "kenjou",
                    normal: "名刺をもらえますか。"
                },
                {
                    jp: "本日ご説明をいただき、よくわかりました。",
                    ruby: "本日<rt>ほんじつ</rt>ご説明<rt>せつめい</rt>をいただき、よくわかりました。",
                    zh: "今天得到您的說明，我非常清楚了。",
                    type: "kenjou",
                    normal: "今日説明してもらって、よくわかりました。"
                },
                {
                    jp: "お客様から貴重なお時間を頂戴しました。",
                    ruby: "お客様<rt>きゃくさま</rt>から貴重<rt>きちょう</rt>なお時間<rt>じかん</rt>を頂戴<rt>ちょうだい</rt>しました。",
                    zh: "我從顧客那裡得到了寶貴的時間。",
                    type: "kenjou",
                    normal: "客から貴重な時間をもらいました。"
                },
                {
                    jp: "明日はお休みをいただいております。",
                    ruby: "明日<rt>あした</rt>はお休み<rt>やす</rt>みをいただいております。",
                    zh: "明天我已經得到（請好）休假了。",
                    type: "kenjou",
                    normal: "明日は休みをもらっています。"
                }
            ]
        }
    ];

    return (
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
                            <em>例</em>：連絡する → <strong>ご連絡になる</strong>；案内する → <strong>ご案内 menjadi</strong>。
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
                            <em>例</em>：紹介する → <strong>ご紹介する / 介紹いたします</strong>（為您介紹）。
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
                    在一個動詞上重複使用同性質的敬語，稱為雙重敬語。例如將「召し上がる」套用規則形寫成「お召し上がりになる」（召し上がる已經是尊敬語，不需再加上お…變成之類）。這是日本商務上也常犯的錯誤，學習時需特別留意！
                </div>
            </div>
        </div>
    );
}
