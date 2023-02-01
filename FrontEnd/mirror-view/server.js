const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 9998 });

let a = "1";

wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

wss.on("connection", function (ws, request) {
  // setTimeout(() => ws.send('1'), 10000);
  console.log("connected", request.socket.remoteAddress);

  ws.on("message", function (msg) {
    console.log(`수신함 : ${msg}`);
    // if(msg === 'newperson'){
    //   wss.broadcast('1');
    // }
    // wss.broadcast(msg);  

    ws.send(msg);
  });

  //클라이언트 접속 종료
  ws.on("close", function close(code, reason) {
    console.log("close " + code + ":" + reason);
  });

  ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
    if (ws.readyState === ws.OPEN && a === '1') {
      ws.send('2');
      a = '2'
    } else if (ws.readyState === ws.OPEN && a === '2') {
      ws.send('1');
      a = '1'
    }
  }, 5000);
});