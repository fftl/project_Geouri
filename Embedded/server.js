var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer( { port: 9998 } );


//접속되어 있는 모든 클라이언트들에게 동일한 메세지를 보내는 함수
wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};


// 클라이언트가 서버에 소컷 접속을 했을때 돌아갑니다..
wss.on( 'connection', function(ws,request){
 console.log("connected", request.socket.remoteAddress);

    //소켓 접속이 된 클라이언트한테 메세지를 수신했을때 실행됩니다
  ws.on( 'message', function(msg){
    console.log(`수신함 : ${msg}` );

    // 받아온 메세지 파싱 후, 그거에 맞는 로직 실행

    const obj = JSON.parse(msg);
    const command = obj.cmd;
    if(command == "face_name")
        console.log("얼굴인식됨", obj.content)
    else if(command === "person_leave")
        console.log("사람이 카메라 앞에서 없어짐.")



    // 위의 broadcase 함수 실행 -> 접속되어 있는 모든 클라이언트들에게 동일한 메세지를 보냅니다
    // wss.broadcast(msg);
    


    // ws.send( msg );
  });

    //클라이언트 접속 종료
    ws.on('close', function close(code, reason) {
      console.log('close ' + code + ':'+reason);
  });
});