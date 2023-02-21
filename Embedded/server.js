
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 9998 });
const rq = require('request');
var PythonShell = require('python-shell');

var dotenv = require("dotenv").config();



// Imports the Google Cloud client library
const language = require('@google-cloud/language');
// Instantiates a client
const client = new language.LanguageServiceClient();



// 퀴즈 관련
var quizMode = 0; //현재 퀴즈 상태인가?
var quizString = "";
var quizHint = "";
var quizAnswer = "";


//상태 정보
var prevKey = 0;      // 이전에 보냈던 메세지
var currentStatus = 0;     // 현재 상태.
var kidsMode = false;
var personFrontOfMirror = false;
var waitingOrders = false;
var onSpeach = false; // 현재 TTS로 음성을 출력중일시

// 유저 정보
var current_user = "";     // 유저 코드
var serialNumber = "8DLL-44yh-x7vB-VuWK"

// 유저 정보 json
var user_data = {
  "data": {
  },
};



//접속되어 있는 모든 클라이언트들에게 동일한 메세지를 보내는 함수
wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};


// 클라이언트가 서버에 소컷 접속을 했을때 돌아갑니다..
wss.on('connection', function (ws, request) {
  console.log("connected", request.socket.remoteAddress);

  //소켓 접속이 된 클라이언트한테 메세지를 수신했을때 실행됩니다
  ws.on('message', async function (msg) {
    // console.log(`수신함 : ${msg}` );

    // 받아온 메세지 파싱 후, 그거에 맞는 로직 실행
    console.log("현재 status : ", currentStatus);
    const obj = JSON.parse(msg);
    const command = obj.cmd;

    if (command == "sensor_activate") {
      if (personFrontOfMirror == true) return;
      sensor_activate();
    }

    else if (command === "person_leave") {
      person_leave();
    }


    else if (command === "voice_input") {
      if (onSpeach){
        console.log("voice input blocked!")
        return; //말하는 도중이라면 받지 않음
      } 
      const voice_input = await STT(obj.content);
      console.log("voice command : ", voice_input);
      currentStatusCheck(voice_input);
    }


    else if (command === "wash_hands_finish") {
      setTimeout(() => {
        var data = {
          "cmd": "default",
          "content": "",
        };
        wss.broadcast(JSON.stringify(data));
        currentStatus = 4;
      }, 2000);
    }

    //양치가 끝나면,3 초후 사진을 찍은 다음 평시 상황으로 돌아간다.
    else if (command === "brush_teeth_finish") {
      await takePicture();

      var data = {
        "cmd": "default",
        "content": "",
      };
      wss.broadcast(JSON.stringify(data));
      currentStatus = 4;
    }

    else if (command == "alert") {

      var str = callName_ya(user_data.nickname) + ", 우리 치카치카 제대로 해서 칭찬받자! "
      TTS(str);
    }

    else {
      console.log(obj.cmd, obj.content)
    }

  });

  //클라이언트 접속 종료
  ws.on('close', function close(code, reason) {
    console.log('close ' + code + ':' + reason);
  });
});

// 아이 대답을 받아서 감정 분석하기(긍/부정)
async function nlp(text) {

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({ document });

  const sentiment = result.documentSentiment;

  if (sentiment.score >= 0.29)
    return "answer_positive";
  else if (sentiment.score <= -0.1)
    return "answer_negative";
  else return "reply";
}




async function STT(voice_input) {

  var voicedata = {
    "cmd": null,
    "text": voice_input,
  }


  const arr_str = [
    ["안녕"],
    ["거울아", "거울"],
    ["수수께끼", "문제", "퀴즈"],
    ["세상에서 누가"],
    ["몇 시", "몇시", "몇분", "시간", "지금"],
    ["잘가", "잘 가", "종료", "잘 있어", "갈게", "바이바이", "빠이"],
    // ["종료","그만","정지","중지"],
    // ["다음","넥스트"], 
    // ["이전"],
    ["몰라", "모르겠어", "글쎄", "힌트"],
    ["사진", "촬영"],
    ["양치", "치카", "칫솔질"],
    ["손 씻기", "손 씻을래", "손 닦", "손 씻", "손씻"],
    ["아니", "싫어"],
    ["응", "좋아", "그래", "네"]
  ];

  const arr_voicecmd = [
    "hello",
    "mirrorcall",
    "quiz",
    "easteregg",
    "whattime",
    "person_leave",
    // "video_stop",
    // "video_next",
    // "video_prev",
    "answer_neutral",
    "take_picture",
    "brush_teeth",
    "wash_hands",
    "answer_negative",
    "answer_positive"
  ];


  for (var i = 0; i < arr_str.length; i++) {
    for (var j = 0; j < arr_str[i].length; j++) {
      if (voice_input.includes(arr_str[i][j])) {
        voicedata.cmd = arr_voicecmd[i];
        return voicedata;
      }

    }
  }
  var output = await nlp(voice_input);
  voicedata.cmd = output;
  return voicedata;
}



function TTS(str) {
  onSpeach = true;
  console.log("onspeach true");
  var options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    args: [str]
  };

  PythonShell.PythonShell.run('tts_streaming.py', options, async function (err, results) {
    if (err) throw err;
    // await new Promise((resolve, reject) => setTimeout(resolve, 500));
    onSpeach = false;
    console.log("onspeach false");
    
  });
}

function currentStatusCheck(voicedata) {

  const voice_input = voicedata.cmd;


  // 종료 명령어를 최우선으로 알아들음
  if (voice_input == "person_leave") {
    person_leave();
    return;
  }


  //아기 모드
  if (kidsMode == true) {
    if (currentStatus == 6 || currentStatus == 8) return;


    // 거울이 아이에게 무언가를 물어본 상태, 아이에게 yes/no 대답을 기대하는 중.
    if (currentStatus != 4) {
      if (voice_input.includes("answer")) {
        var reaction = 1;

        if (voice_input == "answer_positive")
          reaction = 1;
        else if (voice_input == "answer_negative" || voice_input == "answer_neutral")
          reaction = 0;
        answerAndReply(reaction);
      }
    }
    else { // 아기 - 평소 모드 - 4

      if (quizMode == 1) {
        quiz(voicedata);
        return;
      }


      // 아기가 '거울아'라고 이미 부른 상태임.
      if (waitingOrders == true) {
        if (voice_input == "whattime") {
          whatTime();
        }
        else if (voice_input == "quiz") {
          quiz("");
        }
        else if (voice_input == "easteregg") {
          easteregg(0);
        }
        waitingOrders = false;
        return;
      }

      // 이 밑으로는 아기가 '거울아'라고 부른 상태가 아님.

      if (voice_input == "mirrorcall") {
        mirrorCall();
        return;
      }

      if (voice_input == "quiz") {
        quiz("");
        return;
      }

      if (voice_input == "easteregg") {
        easteregg(0);
        return;
      }

      if (voice_input === "brush_teeth") {

        let options = {
          url: 'http://i8a201.p.ssafy.io/mirror/getScript',
          method: 'POST',
          body: {
            "serialNumber": serialNumber,
            "memberKey": current_user,
            "reqKey": 0,
            "type": 5,
            "reaction": 1
          },
          json: true,
        };


        rq.post(options, function (err, httpResponse, body) {
          if (err) {
            console.log("error -> ", err);
          } else {
            // console.log(options)
            console.log(body)


            const returnScript = replaceScript(body.data.script);

            prevKey = body.data.res_key;
            currentStatus = body.data.type;
            data = {
              "cmd": "message",
              "content": returnScript,
            }

            TTS(returnScript);
            wss.broadcast(JSON.stringify(data));

            afterStatusCheck();
          }
        });
        waitingOrders = false;
        return;
      } // end brush teeth

      if (voice_input === "wash_hands") {
        let options = {
          url: 'http://i8a201.p.ssafy.io/mirror/getScript',
          method: 'POST',
          body: {
            "serialNumber": serialNumber,
            "memberKey": current_user,
            "reqKey": 0,
            "type": 7,
            "reaction": 1
          },
          json: true,
        };


        rq.post(options, function (err, httpResponse, body) {
          if (err) {
            console.log("error -> ", err);
          } else {
            // console.log(options)
            console.log(body)
            const returnScript = replaceScript(body.data.script);

            prevKey = body.data.res_key;
            currentStatus = body.data.type;
            data = {
              "cmd": "message",
              "content": returnScript,
            }

            TTS(returnScript);
            wss.broadcast(JSON.stringify(data));

            afterStatusCheck();
          }
        });
        waitingOrders = false;
        return;
      }// end wash hands
    }//아기 평소모드  end
  } //아기모드 end
  else { // 어른 모드 or 인식 안된 상태

    if (voice_input == "hello") {
      if (personFrontOfMirror == true || current_user != "") return;
      sensor_activate();
      return;
    }


    if (voice_input == "mirrorcall") {
      mirrorCall();
      return;
    }

    if (waitingOrders == true) {
      if (voice_input == "whattime") {
        whatTime();
        waitingOrders = false;
        return;
      }

      if (voice_input == "easteregg") {
        easteregg(1);

        return;
      }

      waitingOrders = false;
      return;
    }

  }// / 어른 모드 end 
}

// 통신하고 현재 상태가 바뀐 후 프론트쪽으로 보낼 메세지
function afterStatusCheck() {
  if (currentStatus == 6) {
    var data = {
      "cmd": "brush_teeth",
      "content": "",
    };
    // 이제 양치를 시작해보자~ 라고 말할때 잠시 대기
    setTimeout(() => {
      wss.broadcast(JSON.stringify(data));
    }, 6000);
  }

  else if (currentStatus == 8) {
    var data = {
      "cmd": "wash_hands",
      "content": "",
    };
    // 이제 양치를 시작해보자~ 라고 말할때 잠시 대기
    setTimeout(() => {
      wss.broadcast(JSON.stringify(data));
    }, 6000);
  }

}


// 초음파 센서가 움직임을 감지 했을때
function sensor_activate() {
  personFrontOfMirror = true;

  var data = {
    "cmd": "sensor_activate",
    "content": "",
  };

  wss.broadcast(JSON.stringify(data));
}


function mirrorCall() {
  console.log("EVENT : mirror called");

  // 초음파 센서가 이미 움직임을 동작한 후에 거울아 라고 부른다면
  if (personFrontOfMirror == true && currentStatus == 0) {

    var options = {
      mode: 'text',
      pythonPath: process.env.PYTHON_PATH,
      pythonOptions: ['-u']
    };

    TTS("어서오세요. 누구신지 맞혀볼게요.");


    PythonShell.PythonShell.run('face_recog_module.py', options, function (err, results) {
      if (err) throw err;
      // console.log('results: %j', results);

      console.log("face_name => ", results);
      const face_name = results[0];
      current_user = face_name;
      // current_user = "fSBS-lCHb";


      personFrontOfMirror = true;
      person_appear();
    });
  }
  else { //그냥 평시 상황에서 불렀다면
    TTS("네 말씀하세요?");
    waitingOrders = true;
  }
}




function person_appear() {
  // http로 사람 정보를 받아와서, 프론트로 보낼 정보를 가공해서 리턴.
  var data = {
    "cmd": "person_appear",
    "content": "",
  };

  let options = {
    url: 'http://i8a201.p.ssafy.io/mirror/member',
    method: 'POST',
    body: {
      "serialNumber": serialNumber,
      "memberKey": current_user,
    },
    json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
  };
  rq.post(options, async function (err, httpResponse, body) {
    if (err) {
      console.log("error -> ", err);
    } else {
      user_data = body.data;
      console.log("userdata: ", user_data.nickname);
      if (user_data.kidsMode == true) {
        kidsMode = true;
      }
      data = {
        "cmd": "person_appear",
        "content": body.data,
      }
    }
    currentStatus = 4; // 상황 : 평시
    wss.broadcast(JSON.stringify(data));

    //아기이면 greeting 까지 보내기.
    if (kidsMode == true) {
      // if(user_data.lastVisit==null){
      //   await firstAppear();
      // }
      greetings();
    }
  });
}


//사람이 떠났을 때 상태값들 초기화
function person_leave() {

  if (current_user != "") {
    if (kidsMode)
      TTS("잘가" + callName_ya(user_data.nickname)+ ". 다음에 또 보자.");
    else
      TTS(user_data.nickname + "님 안녕히 가세요.");
  }




  prevKey = 0;
  currentStatus = 0;

  current_user = "";
  user_data = {
    "data": {
    },
  };

  kidsMode = false;
  personFrontOfMirror = false;
  waitingOrders = false;
  firstVisit = false;

  const data = {
    "cmd": "person_leave",
    "content": "",
  }
  wss.broadcast(JSON.stringify(data));
}


function greetings() {
  var data = {
    "cmd": "greetings",
    "content": ""
  };


  let options = {
    url: 'http://i8a201.p.ssafy.io/mirror/getScript',
    method: 'POST',
    body: {
      "serialNumber": serialNumber,
      "memberKey": current_user,
      "reqKey": prevKey,
      "type": 0,
      "reaction": 0
    },
    json: true,
  };

  rq.post(options, function (err, httpResponse, body) {
    if (err) {
      console.log("error -> ", err);
    } else {

      // console.log(options)
      console.log(body)

      const returnScript = replaceScript(body.data.script);

      prevKey = body.data.res_key;
      currentStatus = body.data.type;
      data = {
        "cmd": "message",
        "content": returnScript,
      }

      TTS(returnScript);
      wss.broadcast(JSON.stringify(data));
    }
  });
};


async function firstAppear() {
  var data = {
    "cmd": "first_appear",
    "content": "테스트입니다",
  }

  var str = "반가워 " + callName_ya(user_data.nickname) + ". 매일매일 양치를 하고 손을 깨끗이 씻으면서 너만의 귀여운 공룡을 키워보자!!"
  TTS(str);
  wss.broadcast(JSON.stringify(data));
  await new Promise((resolve, reject) => setTimeout(resolve, 13000));
}




function answerAndReply(reaction) {


  var data = {
    "cmd": "message",
    "content": ""
  };

  let options = {
    url: 'http://i8a201.p.ssafy.io/mirror/getScript',
    method: 'POST',
    body: {
      "serialNumber": serialNumber,
      "memberKey": current_user,
      "reqKey": prevKey,
      "type": currentStatus,
      "reaction": reaction
    },
    json: true,
  };

  rq.post(options, function (err, httpResponse, body) {
    if (err) {
      console.log("error -> ", err);
    } else {

      // console.log(options)
      console.log(body)

      const returnScript = replaceScript(body.data.script);

      prevKey = body.data.res_key;
      currentStatus = body.data.type;
      data = {
        "cmd": "message",
        "content": returnScript,
      }

      TTS(returnScript);
      wss.broadcast(JSON.stringify(data));
    }
    afterStatusCheck();
  });
}



async function takePicture() {
  console.log("사진 촬영 시작");
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  var options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    args: [serialNumber, current_user]
  };

  PythonShell.PythonShell.run('capture_img_db.py', options, await function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);

    const parsedata = JSON.parse(results);
    console.log(parsedata)

    var data = {
      "cmd": "photo_taken",
      "content": parsedata.data,
    }

    wss.broadcast(JSON.stringify(data));
  });

  await new Promise((resolve, reject) => setTimeout(resolve, 8000));

  console.log("사진 촬영 끝");
}


// status 0 : 질문을 물어보는 단계, 1: 질문을 받는 단계?
function quiz(voicedata) {

  const quiz_wrong_reply = ["다시 생각해보자~", "아닌것 같아, 다시 생각해보자."];
  const quiz_correct_reply = ["정답이야! 잘 맞추는걸?", "정답이야!"]
  //퀴즈 정보를 받아온 후, 음성 출력
  if (quizMode == 0) {

    let options = {
      url: 'http://i8a201.p.ssafy.io/mirror/getQuiz',
      method: 'POST',
      body: {
        "serialNumber": serialNumber,
        "memberKey": current_user,
      },
      json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
    };

    rq.post(options, function (err, httpResponse, body) {
      if (err) {
        console.log("error -> ", err);
      } else {


        quizString = body.data.question + "이건 무슨 동물일까? ";
        quizHint = body.data.hint;
        quizAnswer = body.data.answer;

        data = {
          "cmd": "message",
          "content": quizString,
        }

        TTS(quizString);
        wss.broadcast(JSON.stringify(data));

        quizMode = 1;
        waitingOrders = false;
      }
    });
  }

  else if (quizMode == 1) {
    console.log("아이의 정답: ", voicedata);
    //정답을 맞췄을 경우
    if (voicedata.text.includes(quizAnswer)) {
      const replayNum = getRandomInt(0, quiz_correct_reply.length);
      TTS(quiz_correct_reply[replayNum]);
      quizMode = 0;
      quizString = "";
      quizHint = "";
      quizAnswer = "";


      setTimeout(() => {
        data = {
          "cmd": "default",
          "content": "",
        }

        wss.broadcast(JSON.stringify(data));
      }, 4000);

    }
    else if (voicedata.cmd === "answer_neutral") { // 모른다고 했을때
      TTS(quizHint);
    }
    else {
      const replayNum = getRandomInt(0, quiz_wrong_reply.length);
      TTS(quiz_wrong_reply[replayNum]);
    }
  }
}

function easteregg(type) {
  console.log(user_data.nickname);
  const name = callName_ga(user_data.nickname);
  var str = "";
  if (type == 0) {
    str = "물론 우리 " + name + "세상에서 가장 예쁘지이?";
  }
  else {
    if (current_user != "")
      str = "물론 우리 " + name + "님이 세상에서 가장 이쁘죠.";
    else
      str = "어디 계시나요? 잘 안 보여요.";
  }
  TTS(str);
  waitingOrders = false;
}

function whatTime() {
  var today = new Date();
  var str = "지금은 " + (today.getMonth() + 1) + "월 " + today.getDate() + "일 " + today.getHours() + "시 " + today.getMinutes() + "분 입니다."
  TTS(str);
  waitingOrders = false;
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function replaceScript(script) {
  var name = callName_ya(user_data.nickname);
  return script.replace(`{name}`, name);
}

function callName_ga(name) {

  const lastChar = name.charCodeAt(name.length - 1)
  const isThereLastChar = (lastChar - 0xac00) % 28
  if (isThereLastChar) {
    return `${name}이가`;
  }
  return `${name}가`;

}

function callName_ya(name) {

  const lastChar = name.charCodeAt(name.length - 1)
  const isThereLastChar = (lastChar - 0xac00) % 28
  if (isThereLastChar) {
    return `${name}아`;
  }
  return `${name}야`;

}
