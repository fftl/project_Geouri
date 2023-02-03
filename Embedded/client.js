var WebSocket = require('ws')

var ws = new WebSocket("ws://localhost:9998")
ws.onopen = function() { // onopen 이벤트 리스너 호출: 서버와 연결이 맺어지는 경우
    console.log('서버와 웹소켓 연결 성공!');
};
ws.onmessage = function (msg) { // onmessage 이벤트 리스너 호출: 서버로부터 메시지가 오는 경우, 서버에서 메세지가 오면 서버로 답장을 보냄
    const obj = JSON.parse(msg.data);
    const command = obj.cmd;



    if(command == "newperson"){
        const face_name = obj.content
        console.log("새로운 사람이 거울 앞에 왔습니다", face_name)
      }
          
      else if(command === "person_leave")
          console.log("사람이 카메라 앞에서 없어짐.")
  
      else if(command === "voice_input"){
        
        const voice_input = obj.content
        console.log("음성인식 받음 : ", voice_input)
        setTimeout(() => {
            ws.send(`{"cmd" : "reply","content":"voice received"}`)
        }, 1000);
      }
  
};