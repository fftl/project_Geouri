import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mirrorActions } from "../../Redux/modules/mirror";

const Socket = (props) => {
  const { webSocket } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 소켓을 통해 메시지가 전달된 경우, 실행되는 함수
  webSocket.onmessage = function (message) {
    const msg = JSON.parse(message.data);

    if( msg.cmd === 'sensor_activate'){
      navigate('/on');
    }
    if ( msg.cmd === 'person_appear' ){
      // store에 member정보를 dispatch 하여 넣기
      if (msg.content.kidsMode === true) {
        // kids mode on일 때 
        navigate('/kids');
      } 
      else if (msg.content.kidsMode === false){
        // kids mode off일 때
        navigate('/general');
      }
      dispatch(mirrorActions.getMember(msg.content));
    }
    else if (msg.cmd === 'person_leave') {
      // 거울 사용 종료시 
      dispatch(mirrorActions.leaveMirror());
      navigate('/');
    }
    else if (msg.cmd === 'message') {
      dispatch(mirrorActions.getMessage(msg));
    }
    else if (msg.cmd === 'alert') {
      dispatch(mirrorActions.getAlertMsg(msg));
      setTimeout(() => {
        dispatch(mirrorActions.delMessage());
      }, 3000);
    }
    else if (msg.cmd === 'photo_taken') {
      console.log("받음.")
      dispatch(mirrorActions.getPhoto(msg));
    }
    else {
      dispatch(mirrorActions.getAction(msg))
    }
  };
}

export default Socket;
