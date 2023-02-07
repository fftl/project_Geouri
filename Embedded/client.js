var WebSocket = require('ws')

var ws = new WebSocket("ws://localhost:9998")
ws.onopen = function() { // onopen 이벤트 리스너 호출: 서버와 연결이 맺어지는 경우
    console.log('서버와 웹소켓 연결 성공!');
};
ws.onmessage = function (msg) { // onmessage 이벤트 리스너 호출: 서버로부터 메시지가 오는 경우, 서버에서 메세지가 오면 서버로 답장을 보냄
    console.log(msg.data);
    
    // console.log(JSON.parse(msg));
};