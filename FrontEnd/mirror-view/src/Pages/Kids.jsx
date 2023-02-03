import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";
import Effect from "../Components/Kids/Effect";
import "./Kids.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PageParticles from "../Components/Kids/PageParticles";

function Kids(props) {
  const { webSocket, msg } = props;
  // const member_info = useSelector(state => state?.member?.info);
  // const message = useSelector(state => state?.message);

  const member_info = {
    member: {
      info: {
        name : '소영',
        is_child : true,
      }
    },
  };

  const [comp, setComp] = useState('message');
  const [video, setVideo] = useState('');
  const [videoEnded, setVideoEnded] = useState(false);   // 자식 컴포넌트에서 비디오 재생이 끝나면 true로 바뀜

  // useEffect(() => {
  //   if( message?.msg && message?.action ){
  //     if( message?.action === 'wash_hands' ){
  //       setComp('video')
  //       setVideo('wash_hands');
  //     } else {
  //       setComp('video')
  //       setVideo('brush_teeth');
  //     }
  //   }
  //   else if(message && !message?.action ) {
  //     setVideo('');
  //     setComp('message');
  //   }
  // }, [message])

  // useEffect(() => {
  //   if (videoEnded) {
  //     setComp('ending');
  //   }
  // }, [videoEnded])
  useEffect(() => {
    console.log( msg );
  }, [msg]);

  // 그 다음 소켓으로 양치 요청이 들어오면 이를 닦아보자! 보여주고, 이닦는 동영상 재생, 동영상 완료 후 3,2,1 타이머 보여주고, 찰칵 , 마지막 인삿말 
  if (comp === 'greeting'){
    return (
      <>
        {member_info? 
          <div className="balloon">
            <p className="balloon-text">
              안녕, {member_info?.name}아! {member_info.greeting}!
            </p>
          </div>
        : null
        }
      </>
    )
  } 
  else if (comp === 'message'){
    return (
      <>
        {msg ?
          <div className="balloon">
            <p className="balloon-text">
              {msg}
            </p>
          </div>
        : null
        }
      </>
    )
  }
  else if ( comp === 'video' && videoEnded === false ){
    if(video === 'wash_hands'){
      return (
        <div className="video-box">
          <PageParticles />
          <Effect />
          <WashHandsVideo webSocket={webSocket} videoEnded={videoEnded}/>
        </div>
      )
    } else if (video === 'brush_teeth') {
      return (
        <div className="video-box">
          <PageParticles />
          <Effect />
          <BrushTeethVideo webSocket={webSocket} videoEnded={videoEnded}/>
        </div>
      )
    }
  }
  else if ( comp === 'ending' ){
    return (
      <div className="balloon">
        {message?.msg}
      </div>
    )
  }

}

export default Kids;
