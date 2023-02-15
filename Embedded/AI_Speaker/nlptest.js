// // 아이 대답을 받아서 감정 분석하기(긍/부정)
var a = 0;
async function nlp(text) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Instantiates a client
    const client = new language.LanguageServiceClient();

    // The text to analyze

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;

    // console.log(`Text: ${text}`);
    // console.log(`Sentiment score: ${sentiment.score}`);
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    //  a = sentiment.score;
    return sentiment.score;
}


async function STT(voice_input) {

    var arr_str = [
        ["수수께끼", "문제", "퀴즈"],
        ["세상에서 누가"],
        ["시작", "재생", "진행"],
        ["종료", "그만", "정지", "중지"],
        ["다음", "넥스트"],
        ["이전"],
        ["아니", "싫어", "맛없", "별로"],
        ["응", "좋아", "그래", "알겠어"],
        ["몰라", "모르겠어", "글쎄", "힌트", "알려줘"],
        ["사진", "촬영", "찰칵"],
        ["양치", "치카", "칫솔질"],
        ["손 씻기", "손 씻을래", "손 닦"]
    ]

    var arr_voicecmd = [
        "quiz",
        "test",
        "video_start",
        "video_stop",
        "video_next",
        "video_prev",
        "answer_negative",
        "answer_positive",
        "answer_neutral",
        "take_picture",
        "brush_teeth",
        "wash_hands"
    ];

    for (var i = 0; i < arr_str.length; i++) {

        for (var j = 0; j < arr_str[i].length; j++) {
            if (voice_input.includes(arr_str[i][j]))
                return arr_voicecmd[i];
        }
    }


    // if문에 해당되지 않는 대답은 nlp로
    const value = await nlp(voice_input);

    if (value >= 0.28) // 긍정
    {
        return "answer_positive"
    }
    else //부정
    {
        console.log("nono")
        return "answer_negative";
    }

    return voice_input;
}


STT("음 안할래")