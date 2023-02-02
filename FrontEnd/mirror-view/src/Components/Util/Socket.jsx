import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Socket = (props) => {
  const { webSocket, setMsg } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // server에서 보내주는 메시지
  const [message, setMessage] = useState(null);

  // client에서 보낼 메시지
  const [text, setText] = useState("");

  // 소켓이 열려있는 상태일 때 계속 진행되는 함수
  webSocket.onopen = function () {
    // console.log(webSocket)
    // console.log('open')
  };
  webSocket.onclose = function () {
    // console.log("closed");
  };

  // 소켓을 통해 메시지가 전달된 경우, 실행되는 함수
  webSocket.onmessage = function (message) {
    console.log(message.data);
    if ( message.data === 'kid' ){
      // store에 member정보를 dispatch 하여 넣기
      // dispatch()
      navigate('/kids')
    } else if ( message.data === 'adult'){
      // store에 member정보를 dispatch 하여 넣기
      // dispatch()
      navigate('/general')
    } else if ( message.data ){
      // state.message 저장
      setMsg(message.data)
      // dispatch()
    }
    
  
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const arrayBuffer = event.target.result;
      console.log(arrayBuffer);
      // const dataview = new DataView(arrayBuffer);
      // const answer = dataview.getFloat64(0);
      // console.log(answer);
    };
    setMessage(message.data);
  };
    // 서버로 메시지를 전송하는 함수
    function sendMessage(){
        //웹소켓으로 textMessage객체의 값을 보낸다.
        webSocket.send(text);
        //textMessage객체의 값 초기화
        setText("");
    }
    

    return (
        <>
            {/* <input type="text" onChange={e => setText(e.target.value)}/>
            {/* <button onClick={sendMsg}>메시지 보내기</button> */}
            {/* <div id="receive-msg"></div>
            <button onClick={sayHi}>Say Hi</button>
            <button onClick={sendMessage}>메시지 보내기</button>
            <div id="div"></div> */} 
        </>
    )
}

export default Socket;
