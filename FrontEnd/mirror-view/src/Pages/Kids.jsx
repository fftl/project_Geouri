import "./Kids.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Timer } from "../Elements";
import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";
import Effect from "../Components/Kids/Effect";
import PageParticles from "../Components/Kids/PageParticles";
import Character from "../Components/Kids/Character";
import "bootstrap/dist/css/bootstrap.css";
import KidsDefault from "../Components/Kids/KidsDefault";
import Rule from "../Components/Kids/Rule";
import Image from "../Elements/Image";

function Kids(props) {
  const { webSocket } = props;
  const dispatch = useDispatch();

  const member_info = useSelector((state) => state?.mirror?.member);
  const name = member_info?.nickname;
  const mirror_action = useSelector((state) => state?.mirror?.action);
  const message = useSelector((state) => state?.mirror?.message);
  const image = useSelector((state) => state?.mirror?.image);

  const alertMsg = useSelector((state) => state?.mirror?.alertMsg);

  const [comp, setComp] = useState(""); // component 설정
  const [video, setVideo] = useState("brush_teeth"); // 비디오 url

  // useEffect(() => {
  //   if (mirror_action === "first_appear") {
  //     setComp("first_appear");
  //   }
  //   if (mirror_action === "greetings") {
  //     setComp("greeting");
  //   }
  //   if (mirror_action === "wash_hands") {
  //     setComp("video");
  //     setVideo("wash_hands");
  //   }
  //   if (mirror_action === "brush_teeth") {
  //     setComp("video");
  //     setVideo("brush_teeth");
  //   }
  //   if (mirror_action === "message") {
  //     setComp("message");
  //   }
  //   if (mirror_action === "default") {
  //     setComp("kidsDefault");
  //   }
  // }, [mirror_action]);

  // 한글이름에 따라 'ㅇㅇ아' or 'ㅇㅇ야' 체크
  // const checkKorean = (name) => {
  //   const lastChar = name.charCodeAt(name.length - 1);
  //   const isThereLastChar = (lastChar - 0xac00) % 28;
  //   if (isThereLastChar) {
  //     return `${name}아`;
  //   }
  //   return `${name}야`;
  // };

  return (
    <>
      <div className="main-box">
        {
          {
            first_appear: (
              <>
                <Rule setComp={setComp} />
              </>
            ),
            // 시계만 있는 ('/')과 같은 페이지
            none: (
              <>
                <div className="text-div">
                  <p className="text"></p>
                </div>
              </>
            ),
            // 메시지 창에서 인사말을 보여줌
            greeting: (
              <>
                <div className="text-div">
                  <p className="text">{/* {message}, {checkKorean(name)} */}</p>
                </div>
                <Character />
              </>
            ),
            // alertmsg가 있으면 메시지 창에서 보여줌
            alertMsg: (
              <>
                <div className="text-div alert">
                  <p className="alertMsg">{message}</p>
                </div>
              </>
            ),

            // 메시지 창에서 메시지를 보여줌
            message: (
              <>
                <div className="text-div">
                  <p className="text">{message}</p>
                </div>
                <Character />
              </>
            ),
            // 카메라 촬영 모드
            camera: (
              <>
                <Timer setComp={setComp} />
              </>
            ),
            // 기본 화면
            kidsDefault: (
              <>
                <KidsDefault />
              </>
            ),
          }[comp]
        }
      </div>
      {/* 비디오 값이 있으면 비디오 재생 */}
      {video === "brush_teeth" && (
        <div className="video-box">
          <PageParticles />
          <Effect />
          <BrushTeethVideo
            webSocket={webSocket}
            setComp={setComp}
            setVideo={setVideo}
          />
        </div>
      )}
      {video === "wash_hands" && (
        <div className="video-box">
          <PageParticles />
          <Effect />
          <WashHandsVideo
            webSocket={webSocket}
            setComp={setComp}
            setVideo={setVideo}
          />
        </div>
      )}
      {/* 컴포넌트 이미지이고, 이미지 값있으면 이미지 출력 */}
      {comp === "image" && image && (
        <div className="image-box">
          <Image setComp={setComp} src={image} />
        </div>
      )}
    </>
  );
}

export default Kids;
