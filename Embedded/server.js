var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 9998 });
const rq = require('request');
var PythonShell = require('python-shell');


var prevKey = 0;      // 이전에 보냈던 메세지
var prevType = 0;     // 현재 상태.

var current_user;     // 유저 상태
var serialNumber = "8DLL-44yh-x7vB-VuWK"
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
      const voice_input = obj.content
      console.log("음성인식 받음 : ", voice_input)

      // if(!personExist) return;
      
      // fe
      // 비디오 관련하여 정지 재생 응답 
      if (voice_input.includes("video")){
        const data = {
          "cmd": "voice_input",
          "content": voice_input,
        }
        wss.broadcast(JSON.stringify(data));
      }
        

      // db
      // 어린이의 양치 손씻기에 대한 대답 전송
      else if (voice_input.includes("answer")) {

        // 긍정 : 1, 부정 : 0
        // prevType : 6 양치시작, 8 손씻기시작, 9 종료 
        // prevKey : 전에 받았던 멘트 키
        const reaction = -1;

        if (voice_input == "answer_positive")
          reaction = 1;
        else if (voice_input == "answer_negative")
          reaction = 0;

        answerAndReply(reaction);        
      }
      
      // db 
      // 사진 촬영을 하는 경우
      // nodejs에서 pythonshell을 통해 파이썬 파일 실행
      else if (voice_input.includes("picture")) {
        takePicture();
      }
      else{
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
    pythonPath: 'C:\\Users\\SSAFY\\anaconda3\\python.exe',
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