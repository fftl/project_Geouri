import { useEffect, useState } from "react";

const Socket = () => {
    
    const webSocket = new WebSocket("ws://localhost:9998");

    const [text,setText] = useState("");
    const [socket, setSocket] = useState(false);
    
    // useEffect(() => {
    //     if(socket === false){
            
    //     webSocket.onopen = () => {
    //         setSocket(true)
    //         console.log('open')
    //     }
    //     }
    // }, [socket]);

    // 소켓 서버로 부터 메시지가 오면 호출되는 함수.
    webSocket.onmessage = function(message){
    // 출력 area에 메시지를 표시한다.
        console.log(message.data)
        const div = document.getElementById('div')
        const p = document.createElement('p')
        p.innerText = message.data
        div.appendChild(p)
    };
    // 소켓 접속이 끝나면 호출되는 함수
    webSocket.onclose = () => {
        setSocket(false)
        console.log('close')
        // Socket();
        
    };
    // 소켓 통신 중에 에러가 발생되면 호출되는 함수
    webSocket.onerror = () =>{
        console.log('error')
    
    };
    // 서버로 메시지를 전송하는 함수
    function sendMessage(){
        // messageTextArea.value += "Send to Server => "+message.value+"\n";
        //웹소켓으로 textMessage객체의 값을 보낸다.
        console.log(text)
        webSocket.send(text);
        //textMessage객체의 값 초기화
        setText("");
    }
    function disconnect(){
        webSocket.close();
    }
    function sayHi() {
        webSocket.send("Hello") // 서버에 데이터 전송
    }
    

    return (
        <>
            <input type="text" onChange={e => setText(e.target.value)}/>
            {/* <button onClick={sendMsg}>메시지 보내기</button> */}
            <div id="receive-msg"></div>
            <button onClick={sayHi}>Say Hi</button>
            <button onClick={sendMessage}>메시지 보내기</button>
            <div id="div"></div>
        </>
    )
}

export default Socket;
