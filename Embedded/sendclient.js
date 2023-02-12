var WebSocket = require('ws')

var ws = new WebSocket("ws://localhost:9998")
ws.onopen = function() { // onopen 이벤트 리스너 호출: 서버와 연결이 맺어지는 경우
    console.log('서버와 웹소켓 연결 성공!');

    var data = {
        "cmd" : "voice_input",
        "content" : "응",
    }

    // var data = {
    //     "cmd" : "face_name",
    //     "content" : "60lm-pxTc",
    // }
    ws.send(JSON.stringify(data));
    ws.close();
};


