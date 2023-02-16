var WebSocket = require('ws')

var ws = new WebSocket("ws://localhost:9998")
ws.onopen = function() { // onopen 이벤트 리스너 호출: 서버와 연결이 맺어지는 경우
    console.log('서버와 웹소켓 연결 성공!');



    var data = {
        "cmd" : "sensor_activate",
        // "content" : "",


        // "cmd" : "voice_input",
        // "content" : "거울아",
        "content" : "양치하자",


        //     "cmd" : "face_name",
        // "content" : "60lm-pxTc",


        // "cmd" : "person_leave",
        // // "content" : "",

    }

//소영
    // var data = {
    //     "cmd" : "face_name",
    //     "content" : "nh3b-494F",
    // }

    ws.send(JSON.stringify(data));
    ws.close();
};


