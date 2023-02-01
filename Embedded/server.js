var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer( { port: 9998 } );



wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

wss.on( 'connection', function(ws,request){
 console.log("connected", request.socket.remoteAddress);

  ws.on( 'message', function(msg){
    console.log(`수신함 : ${msg}` );

    wss.clients.forEach(client => {
      wss.broadcast(msg);
    })


    // ws.send( msg );
  });

    //클라이언트 접속 종료
    ws.on('close', function close(code, reason) {
      console.log('close ' + code + ':'+reason);
  });
});