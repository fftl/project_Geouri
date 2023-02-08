import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";
import Effect from "../Components/Kids/Effect";
import "./Kids.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Timer from "../Elements/Timer";
import PageParticles from "../Components/Kids/PageParticles";
import Character from "../Components/Kids/Character";
import { mirrorActions } from "../Redux/modules/mirror";
import { useNavigate } from "react-router";

function Kids(props) {
  const { webSocket } = props;

  const dispatch = useDispatch();

  const member_info = useSelector((state) => state?.mirror?.member);
  const name = member_info?.nickname;
  const mirror_action = useSelector((state) => state?.mirror?.action);
  const message = useSelector((state) => state?.mirror?.message);

  const [comp, setComp] = useState('none'); // component 설정
  // const [comp, setComp] = useState('camera'); // component 설정
  const [video, setVideo] = useState("wash_hands"); // 비디오 url

  // ending 메시지를 보여주고 4초 후 종료 (person_leave를 받으면 그 때 navigate('/')헤도됨) 
  useEffect(() => {
    if( mirror_action === 'greeting' ){
      setComp('greeting')
    }
    if( mirror_action === 'ending' ){
      setComp('ending')
    }
    if( mirror_action === 'wash_hands' ){
      setComp('video');
      setVideo('wash_hands');
    }
    if( mirror_action === 'brush_teeth' ){
      setComp('video');
      setVideo('wash_hands');
    }
    if( mirror_action === 'message' ){
      setComp('message');
    }
    if (comp === 'ending'){
      setTimeout(() => {
        dispatch(mirrorActions.finish())
      }, 4000);
    }
  }, [mirror_action]);

  const checkKorean = (name) => {
    const lastChar = name.charCodeAt(name.length - 1)
    const isThereLastChar = (lastChar - 0xac00) % 28
    if (isThereLastChar) {
      return `${name}아`
    }
    return `${name}야`
  }
  
  return (
    <>
      <div className="main-box">
        {
          {
            none : 
              <div className="text-div">
              </div>,
            greeting : 
              <div className="text-div">
                <p className="text"> {checkKorean(name)}, {mirror_action?.msg}</p>
                <p className="text"> 안녕~ 오랜만이야!?</p>
              </div>,
            message : 
              <>
                <div className="text-div">
                  {/* <p className="text">{mirror_action?.msg}</p> */}
                  <p className="text">오늘은 이를 닦아보자!</p>
                </div>
                <Character />
              </>,
            ending : 
              <>
                <div className="text-div">
                  {/* <div className="text">{mirror_action?.msg}</div> */}
                  <div className="text">이따가 또 보자 소영아!</div>
                </div>  
                <Character />
              </>,
            camera :
              <>
                <Timer setComp={setComp} />
              </>
          }[comp]
        }
      </div>
      { video === 'brush_teeth' && 
        <div className="video-box">
          <PageParticles />
          <Effect />
          <BrushTeethVideo webSocket={webSocket} setComp={setComp} setVideo={setVideo}/>
        </div> 
      }
      { video === 'wash_hands' && 
        <div className="video-box">
          <PageParticles />
          <Effect />
          <WashHandsVideo webSocket={webSocket} setComp={setComp} setVideo={setVideo} />
        </div> 
      }
    </>
  )
}

export default Kids;
