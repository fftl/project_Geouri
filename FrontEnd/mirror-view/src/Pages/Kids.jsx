import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";
import Effect from "../Components/Kids/Effect";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Kids() {
  const member_info = useSelector(state => state?.member?.info);
  const [showName, setShowName] = useState(true);
  const play_hand_wash_video = false;
  const play_teeth_video = true;
  
  // 처음 렌더링될 때만 이름을 보여주며, 이는 5초동안만 보여줌
  useEffect(() => {
    const t = setTimeout(() => setShowName(false), 5000);
    return () => { clearTimeout(t) };
  }, [])

  // 그 다음 소켓으로 양치 요청이 들어오면 이를 닦아보자! 보여주고, 이닦는 동영상 재생, 동영상 완료 후 3,2,1 타이머 보여주고, 찰칵 , 마지막 인삿말 
  return (
    <>
      {/* <h1>Kids</h1> */}
      {member_info && showName ? 
        <div class="arrow_box">안녕, {member_info?.name}아! {member_info.greeting}! 이를 닦아볼까?</div>
      : null
      }
      {play_teeth_video ? (
        <div>
          <Effect />
          <WashHandsVideo />
        </div>
      ) : (
        <div>
          <Effect />
          <BrushTeethVideo />
        </div>
      )}
    </>
  );
}

export default Kids;
