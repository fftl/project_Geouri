var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 9998 });
const rq = require('request');
var PythonShell = require('python-shell');

var pythonPath = "/usr/bin/python3";

var prevKey = 0;      // 이전에 보냈던 메세지
var prevType = 0;     // 현재 상태.

var quizMode = 0; //현재 퀴즈 상태인가?
var quizString = "";
var quizHint = "";
var quizAnswer = "";

var current_user = "fSBS-lCHb";     // 유저 코드
var serialNumber = "8DLL-44yh-x7vB-VuWK"

// 유저 정보
var user_data = {
  "data" : {
    "nickname" : "영현",
  },
};  
var kidsMode = false;
var personExist = false;



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
  ws.on('message', function (msg) {
    // console.log(`수신함 : ${msg}` );

    // 받아온 메세지 파싱 후, 그거에 맞는 로직 실행

    const obj = JSON.parse(msg);
    const command = obj.cmd;


    if (command == "face_name") {
      console.log("face_name => ", obj.content)
      const face_name = obj.content
      current_user = face_name
      
      person_appear();
    }

    else if (command === "person_leave") {
      console.log("PERSON_LEAVE")
      person_leave();
    }


    else if (command === "voice_input") {
      
      // console.log("음성인식 받음 : ", obj.content);
      const voice_input = STT(obj.content);
      console.log("voice command : ", voice_input)
      // if(!personExist) return;
      
      // fe
      // 비디오 관련하여 정지 재생 응답 
      if (voice_input === "video"){
        const data = {
          "cmd": "voice_input",
          "content": voice_input,
        }
        wss.broadcast(JSON.stringify(data));
      }
        

      // db
      // 어린이의 양치 손씻기에 대한 대답 전송
      // else if (voice_input.includes("answer")) {

      //   // 긍정 : 1, 부정 : 0
      //   // prevType : 6 양치시작, 8 손씻기시작, 9 종료 
      //   // prevKey : 전에 받았던 멘트 키
      //   const reaction = -1;

      //   if (voice_input == "answer_positive")
      //     reaction = 1;
      //   else if (voice_input == "answer_negative")
      //     reaction = 0;

      //   answerAndReply(reaction);        
      // }
      
      // db 
      // 사진 촬영을 하는 경우
      // nodejs에서 pythonshell을 통해 파이썬 파일 실행
      else if (voice_input === "take_picture") {
        takePicture();
      }

      else if (voice_input === "event_quiz") {
        quiz(""); 
      }

      else if(voice_input === "test"){
        easteregg();
      }

      else{
        if(quizMode===1){
          quiz(voice_input);
        }
          
        console.log("voice input leftovers")
      }
    }

    else if (command === "reply") {
      console.log("응답받음")
    }


  });

  //클라이언트 접속 종료
  ws.on('close', function close(code, reason) {
    console.log('close ' + code + ':' + reason);
  });
});



function STT(voice_input){


  var arr_str = [
    ["세상에서 누가"],
    ["시작", "재생", "진행"],
    ["종료","그만","정지","중지"],
    ["다음","넥스트"], 
    ["이전"],
    ["아니","싫어"],
    ["응","좋아","그래"],
    ["몰라","모르겠어","글쎄","힌트"],
    ["사진","촬영"]
  ]

  var arr_voicecmd = [
    "test",
    "video_start",
    "video_stop",
    "video_next",
    "video_prev",
    "answer_negative",
    "answer_positive",
    "answer_neutral",
    "take_picture"
  ];


  for(var i = 0 ; i < arr_str.length; i++){
    for(var j = 0 ; j < arr_str[i].length; j++){
      if(voice_input.includes(arr_str[i][j]))
      return arr_voicecmd[i]
    }
  }

  return voice_input;
}



function TTS(str){
  var options = {
    mode: 'text',
    pythonPath: pythonPath,
    pythonOptions: ['-u'],
    // scriptPath: '',
    args: [str]
  };

  PythonShell.PythonShell.run('tts_streaming.py', options, function (err, results) {
    if (err) throw err;
    // console.log('results: %j', results);
  });
}



function person_appear(){
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
  rq.post(options, function (err, httpResponse, body) {
    if(err){
      console.log("error -> ", err);
    } else{
      if(body.data.kidsMode == true){
        kidsMode = true;
      }
      user_data = body.data;
      data = {
        "cmd": "person_appear",
        "content": body.data,
      }
    }
    wss.broadcast(JSON.stringify(data));

    //아기이면 greeting 까지 보내기.
    if(kidsMode == true){
      greetings();
    }
  });
}


//사람이 떠났을 때 상태값들 초기화
function person_leave(){
  prevKey = 0;
  prevType = 0;
  
  current_user;
  serialNumber = "8DLL-44yh-x7vB-VuWK"
  kidsMode = false;
  personExist = false;

  const data = {
    "cmd": "person_leave",
    "content": "",
  }
  wss.broadcast(JSON.stringify(data));
}

function greetings(){
  var returnData  = {
      "cmd": "greetings",
      "content" : ""
    };


  let options = {
    url: 'http://i8a201.p.ssafy.io/mirror/getScript',
    method: 'POST',
    body: {
      "serialNumber": serialNumber,
      "memberKey": current_user,
      "reaction" : 0,
      "reqKey" : prevKey,
      "type" : prevType,
    },
    json: true,
  };

  rq.post(options, function (err, httpResponse, body) {
    if(err){
      console.log("error -> ", err);
    } else{
      returnData  = {
        "cmd": "greetings",
        "content" : body.data.script,
      }
      prevKey = body.data.res_key;
      prevType = body.data.type;

      TTS(body.data.script);
      wss.broadcast(JSON.stringify(returnData));
    }
  });
};  

function answerAndReply(reaction){

  var returnData = {
    "cmd": "yesorno",
    "content": body.data,
  };

  let options = {
    url: 'http://i8a201.p.ssafy.io/mirror/getScript',
    method: 'POST',
    body: {
      "serialNumber": serialNumber,
      "memberKey": current_user,
      "prevKey": prevKey,
      "prevType": prevType,
      "reaction": reaction
    },
    json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
  };

  rq.post(options, function (err, httpResponse, body) {
    if(err){
      console.log("error -> ", err);
    }else{
      data = {
        "cmd": "yesorno",
        "content": body.data,
      }
      prevKey = body.data.scriptKey;
      prevType = body.data.type;
      wss.broadcast(JSON.stringify(data));
    }
  });
}


function takePicture(){
  console.log("사진 촬영 시작");
  var data = {
    "cmd" : "picturetaken",
    "content" : "",
  }

  var options = {
    mode: 'text',
    pythonPath: pythonPath,
    pythonOptions: ['-u'],
    // scriptPath: '',
    args: [serialNumber, current_user]
  };

  PythonShell.PythonShell.run('capture_img_db.py', options, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
    data.content = results;
  });

  wss.broadcast(JSON.stringify(data));
  console.log("사진 촬영 끝");
}


// status 0 : 질문을 물어보는 단계, 1: 질문을 받는 단계?
function quiz(voice_input){

  const quiz_wrong_reply = ["다시 생각해보자~","아닌것 같아, 다시 생각해보자."];
  const quiz_correct_reply = ["정답이야! 잘 맞추는걸?","정답이야!"]
  //퀴즈 정보를 받아온 후, 음성 출력
  if(quizMode == 0){

    // var returnData = {
    //   "cmd": "quizdata",
    //   "content": "",
    // };
  
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
      if(err){
        console.log("error -> ", err);
      }else{
        data = {
          "cmd": "yesorno",
          "content": body.data,
        }

        quizString = body.data.question;
        quizHint = body.data.hint;
        quizAnswer =body.data.answer;
        wss.broadcast(JSON.stringify(data));

        quizMode = 1;
        TTS(quizString);
        
      }
    });
  }
    
  else if(quizMode == 1){
    console.log("아이의 정답: ",voice_input);

    //정답을 맞췄을 경우
    if(voice_input.indexOf(quizAnswer) != -1){
      const replayNum = getRandomInt(0,quiz_correct_reply.length);
      TTS(quiz_correct_reply[replayNum]);
      quizMode = 0;
      quizString = "";
      quizHint = "";
      quizAnswer = "";
    }
    else if(voice_input === "answer_neutral"){ // 모른다고 했을때
      TTS(quizHint);
    }
    else{
      const replayNum = getRandomInt(0,quiz_wrong_reply.length);
      TTS(quiz_wrong_reply[replayNum]);
    }
  }
}

function easteregg(){
  console.log(user_data.data.nickname);
  const name = callName_ga(user_data.data.nickname);
  var str = "물론 우리 " + name + "세상에서 가장 예쁘지이?";
  TTS(str);

}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}


function callName_ga(name){

  const lastChar = name.charCodeAt(name.length - 1)
  const isThereLastChar = (lastChar - 0xac00) % 28
  if (isThereLastChar) {
    return `${name}이가`;
  }
  return `${name}가`;

}

function callName_ya(name){

  const lastChar = name.charCodeAt(name.length - 1)
  const isThereLastChar = (lastChar - 0xac00) % 28
  if (isThereLastChar) {
    return `${name}아`;
  }
  return `${name}야`;

}