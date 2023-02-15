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




// 유저 정보
var current_user = "";     // 유저 코드
var serialNumber = "8DLL-44yh-x7vB-VuWK"
var user_data = {
  "data" : {
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

    const obj = JSON.parse(msg);
    const command = obj.cmd;
    console.log("@@INCOMING COMMAND -> " , command);

    if (command == "sensor_activate") {
      if(personFrontOfMirror == true) return;
      sensor_activate();
    }

    else if (command === "person_leave") {
      person_leave();
    }


    else if (command === "voice_input") {
      const voice_input = await STT(obj.content);

      console.log("voice command : ", voice_input);
 
      currentStatusCheck(voice_input);
    }


    else if ( command === "wash_hands_finish"){
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
    else if (command === "brush_teeth_finish"){ 
      setTimeout(() => {
        takePicture();
        setTimeout(() => {
          var data = {
            "cmd": "default",
            "content": "",
          };
          wss.broadcast(JSON.stringify(data));
          currentStatus = 4;
        }, 2000);
      }, 3000);
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

// 아이 대답을 받아서 감정 분석하기(긍/부정)
async function nlp(text) {

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // const text = 'Your text to analyze, e.g. Hello, world!';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  // console.log('Document sentiment:');
  // console.log(`  Score: ${sentiment.score}`);
  // console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  // sentences.forEach(sentence => {
  //   console.log(`Sentence: ${sentence.text.content}`);
  //   console.log(`  Score: ${sentence.sentiment.score}`);
  //   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);




    
  //   // 긍정:1 ,부정/중립:0
  //   if (sentiment.score >= 0.29)
  //       return "answer_positive";
  //   else if( sentiment.score <= -0.1)
  //       return "answer_negative";
  //   else return 0;
  // });
  if (sentiment.score >= 0.29)
    return "answer_positive";
  else if( sentiment.score <= -0.1)
    return "answer_negative";
  else return 0;
}




async function STT(voice_input){

  var voicedata = {
    "cmd" : null,
    "text" : voice_input,
  }


  const arr_str = [
    ["거울아"],
    ["수수께끼","문제","퀴즈"],
    ["세상에서 누가"],
    ["몇 시","몇시","몇분","시간","지금"],
    // ["시작", "재생", "진행"],
    // ["종료","그만","정지","중지"],
    // ["다음","넥스트"], 
    // ["이전"],
    ["아니","싫어"],
    ["응","좋아","그래", "네"],
    ["몰라","모르겠어","글쎄","힌트"],
    ["사진","촬영"],
    ["양치","치카","칫솔질"],
    ["손 씻기","손 씻을래", "손 닦"]
  ];

  const arr_voicecmd = [
    "mirrorcall",
    "quiz",
    "easteregg",
    "whattime",
    // "video_start",
    // "video_stop",
    // "video_next",
    // "video_prev",
    "answer_negative",
    "answer_positive",
    "answer_neutral",
    "take_picture",
    "brush_teeth",
    "wash_hands"
  ];


  for(var i = 0 ; i < arr_str.length; i++){
    for(var j = 0 ; j < arr_str[i].length; j++){
      if(voice_input.includes(arr_str[i][j])){
        voicedata.cmd = arr_voicecmd[i];
        return voicedata;
      }
      
    }
  }
  var output = await nlp(voice_input);
  voicedata.cmd = output;
  return voicedata;
}



function TTS(str){
  var options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    args: [str]
  };

  PythonShell.PythonShell.run('tts_streaming.py', options, function (err, results) {
    if (err) throw err;
    // console.log('results: %j', results);
  });
}



function currentStatusCheck(voicedata){

  const voice_input = voicedata.cmd;

  //양치가 시작했거나 손씻기가 시작했으면 무시
  if(currentStatus == 6 || currentStatus == 8) return;


  // 거울이 아이에게 무언가를 물어본 상태, 아이에게 yes/no 대답을 기대하는 중.
  if(currentStatus!=4 && kidsMode == true){
    if (voice_input.includes("answer")) {
      var reaction = 1;

      if (voice_input == "answer_positive")
        reaction = 1;
      else if (voice_input == "answer_negative" || voice_input == "answer_neutral")
        reaction = 0;
      

      answerAndReply(reaction);    
    }
  }

  else{ //평시
    //퀴즈모드 분기


    if (quizMode == 1){
        quiz(voice_input);
        return;
    }



    
    if(waitingOrders != true && voice_input == "mirrorcall"){
      mirrorCall();
      return;
    }

    if (waitingOrders == true){
      if(voice_input == "whattime"){
        whatTime();
      }
      else if (voice_input === "quiz" && kidsMode == true) {
        quiz(""); 
      }
      else if(voice_input === "easteregg" && kidsMode == true){
        easteregg();
      }
      return;
    }

    // 아이가 먼저 양치하자고 하는 경우
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
        if(err){
          console.log("error -> ", err);
        } else{
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
    }

    else if (voice_input === "wash_hands") {
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
        if(err){
          console.log("error -> ", err);
        } else{
          console.log(options)
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
    }

  }// end status 4
}

// 통신하고 현재 상태가 바뀐 후 프론트쪽으로 보낼 메세지
function afterStatusCheck(){
  if(currentStatus == 6){
    var data = {
      "cmd": "brush_teeth",
      "content": "",
    };
    // 이제 양치를 시작해보자~ 라고 말할때 잠시 대기
    setTimeout(() => {
      wss.broadcast(JSON.stringify(data));
    }, 5000);
  }

  else if(currentStatus == 8){
    var data = {
      "cmd": "wash_hands",
      "content": "",
    };
    // 이제 양치를 시작해보자~ 라고 말할때 잠시 대기
    setTimeout(() => {
      wss.broadcast(JSON.stringify(data));
    }, 5000);
  }

}


// 초음파 센서가 움직임을 감지 했을때
function sensor_activate(){
  personFrontOfMirror = true;
}


function mirrorCall(){
  console.log("EVENT : mirror called");

  


  // 초음파 센서가 이미 움직임을 동작한 후에 거울아 라고 부른다면
  if(personFrontOfMirror == true){

    var options = {
      mode: 'text',
      pythonPath: process.env.PYTHON_PATH,
      pythonOptions: ['-u']
    };
  
    PythonShell.PythonShell.run('face_recog_module.py', options, function (err, results) {
      if (err) throw err;
      // console.log('results: %j', results);
  
      console.log("face_name => ", results);
      const face_name = results[0];
      current_user = "B7T3-jX6r"
      // current_user = face_name

      
      personFrontOfMirror = true;
      person_appear();
    });
  }
  else{ //그냥 평시 상황에서 불렀다면
    TTS("네 말씀하세요?");
    waitingOrders = 1;
  }
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
      user_data = body.data;
      console.log("userdata: " , user_data);
      if(user_data.kidsMode == true){
        kidsMode = true;
      }
      
      console.log(user_data);
      data = {
        "cmd": "person_appear",
        "content": body.data,
      }
    }
    currentStatus = 4; // 상황 : 평시
    wss.broadcast(JSON.stringify(data));

    //아기이면 greeting 까지 보내기.
    if(kidsMode == true){

      if(user_data.lastVisit === null){
        firstAppear();
        setTimeout(() => {
        }, 15000);
      }
      greetings();
    }
  });
}


//사람이 떠났을 때 상태값들 초기화
function person_leave(){
  prevKey = 0;
  currentStatus = 0;
  
  current_user = "";
  user_data = {
    "data" : {
    },
  };  

  kidsMode = false;
  personFrontOfMirror = false;
  waitingOrders = false;


  const data = {
    "cmd": "person_leave",
    "content": "",
  }
  wss.broadcast(JSON.stringify(data));
}






function greetings(){
  var data  = {
      "cmd": "greetings",
      "content" : ""
    };


  let options = {
    url: 'http://i8a201.p.ssafy.io/mirror/getScript',
    method: 'POST',
    body: {
      "serialNumber": serialNumber,
      "memberKey": current_user,
      "reqKey": prevKey,
      "type": currentStatus,
      "reaction": 0
    },
    json: true,
  };

  rq.post(options, function (err, httpResponse, body) {
    if(err){
      console.log("error -> ", err);
    } else{

      console.log(options)
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


function firstAppear(){
  var data = {
    "cmd": "first_appear",
    "content": returnScript,
  }

  var str = "반가워" + callName_ya(user_data.nickname) + ". 양치를 하고 손을 깨끗이 씻으면서 나만의 캐릭터를 키워보자!"
  TTS(str);
  wss.broadcast(JSON.stringify(data));
}




function answerAndReply(reaction){


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
    if(err){
      console.log("error -> ", err);
    }else{

      console.log(options)
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



function takePicture(){
  console.log("사진 촬영 시작");
  var data = {
    "cmd" : "message",
    "content" : "picture taken",
  }

  var options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
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


        quizString = body.data.question;
        quizHint = body.data.hint;
        quizAnswer =body.data.answer;

        data = {
          "cmd": "message",
          "content": quizString,
        }

        TTS(quizString);
        wss.broadcast(JSON.stringify(data));

        quizMode = 1;
        
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

      data = {
        "cmd": "default",
        "content": "",
      }

      wss.broadcast(JSON.stringify(data));

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
  console.log(user_data.nickname);
  const name = callName_ga(user_data.nickname);
  var str = "물론 우리 " + name + "세상에서 가장 예쁘지이?";
  TTS(str);

}

function whatTime(){
  var today = new Date();
  var str = "지금은 " + (today.getMonth() + 1) + "월 " + today.getDate() + "일 " + today.getHours() + "시 " + today.getMinutes() + "분 입니다."
  TTS(str);
  waitingOrders = 0;
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}


function replaceScript(script){
  var name = callName_ya(user_data.nickname);
  return script.replace(`{name}`, name);
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
