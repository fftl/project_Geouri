var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 9998 });
const rq = require('request');


var prevKey = 0;
var prevType = 0;
var memberKey;
var PythonShell = require('python-shell');

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
      console.log("얼굴인식됨", obj.content)
      const face_name = obj.content
      memberKey = face_name

      let options = {
        uri: 'http://i8a201.p.ssafy.io/mirror/member',
        method: 'POST',
        body: {
          "serialNumber": "12345",
          "memberKey": Number(face_name)
        },
        json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
      };


      rq.post(options, function (err, httpResponse, body) {
        console.log(body)
        const data = {
          "cmd": "newperson",
          "content": body.data,
        }

        wss.broadcast(JSON.stringify(data));
      });
    }

    else if (command === "person_leave") {
      console.log("사람이 카메라 앞에서 없어짐.")
      const data = {
        "cmd": "person_leave",
        "content": "",
      }

      wss.broadcast(JSON.stringify(data));
    }


    else if (command === "voice_input") {
      const voice_input = obj.content
      console.log("음성인식 받음 : ", voice_input)

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
        else if(void_input == "answer_negative")
          reaction = 0;

        let options = {
          uri: 'http://i8a201.p.ssafy.io/--',
          method: 'POST',
          body: {
            "serialNumber": "A201_12345",
            "memberKey": memberKey,
            "prevKey": prevKey,
            "prevType": prevType,
            "reaction": reaction
          },
          json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
        };

        rq.post(options, function (err, httpResponse, body) {
          console.log(body)
          const data = {
            "cmd": "yesorno",
            "content": body.data,
          }

          prevKey = body.data.scriptKey;
          prevType = body.data.type;

          wss.broadcast(JSON.stringify(data));
        });
      }
      
      // db 
      // 사진 촬영을 하는 경우
      // nodejs에서 pythonshell을 통해 파이썬 파일 실행
      else if (voice_input.includes("capture")) {
        // 이미지 캡쳐해서 전송하는 파일을 memberKey데이터와 실행
        PythonShell.PythonShell.run('./' + capture_img_db.py, memberKey, function (err, results) {
          if (err) throw err;
          console.log('results: %j', results);
          //console.log('results: %j', results);
        });
      }
    }

    else if (command === "reply") {
      console.log("응답받음")
    }


    // 위의 broadcase 함수 실행 -> 접속되어 있는 모든 클라이언트들에게 동일한 메세지를 보냅니다
    // 

    // ws.send( msg );
  });

  //클라이언트 접속 종료
  ws.on('close', function close(code, reason) {
    console.log('close ' + code + ':' + reason);
  });
});