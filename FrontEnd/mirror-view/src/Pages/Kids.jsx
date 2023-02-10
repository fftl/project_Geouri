import "./Kids.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Timer } from "../Elements";
import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";
import Effect from "../Components/Kids/Effect";
import PageParticles from "../Components/Kids/PageParticles";
import Character from "../Components/Kids/Character";
import { mirrorActions } from "../Redux/modules/mirror";
import "bootstrap/dist/css/bootstrap.css";
import KidsDefault from "../Components/Kids/KidsDefault";

function Kids(props) {
  const { webSocket } = props;

  const member_info = useSelector((state) => state?.mirror?.member);
  const name = member_info?.nickname;
  const mirror_action = useSelector((state) => state?.mirror?.action);
  const message = useSelector((state) => state?.mirror?.message);

<<<<<<< HEAD
  const [comp, setComp] = useState("kidsDefault"); // component 설정
=======
  const [comp, setComp] = useState("camera"); // component 설정
>>>>>>> a2bf9e682c5cd93283b24bdf8ee79fbf36eecaf0
  const [video, setVideo] = useState(""); // 비디오 url

  useEffect(() => {
    if (mirror_action === "greetings") {
      setComp("greeting");
    }
    if (mirror_action === "wash_hands") {
      setComp("video");
      setVideo("wash_hands");
    }
    if (mirror_action === "brush_teeth") {
      setComp("video");
      setVideo("brush_teeth");
    }
    if (mirror_action === "message") {
      setComp("message");
    }
    if (mirror_action === "default") {
      setComp("kidsDefault");
    }
  }, [mirror_action]);

  // 한글이름에 따라 'ㅇㅇ아' or 'ㅇㅇ야' 체크
  const checkKorean = (name) => {
    const lastChar = name.charCodeAt(name.length - 1);
    const isThereLastChar = (lastChar - 0xac00) % 28;
    if (isThereLastChar) {
      return `${name}아`;
    }
    return `${name}야`;
  };

  return (
    <>
      <div className="main-box">
        {
          {
            greeting: (
              <>
                <div className="text-div">
                  <p className="text">
                    {message}, {checkKorean(name)}
                  </p>
                </div>
                <Character />
              </>
            ),
            message: (
              <>
                <div className="text-div">
                  <p className="text">{message}</p>
                </div>
                <Character />
              </>
            ),
            ending: (
              <>
                <div className="text-div">
                  <div className="text">{message}</div>
                </div>
                <Character />
              </>
            ),
            camera: (
              <>
                <Timer setComp={setComp} />
              </>
            ),
            kidsDefault: (
              <>
                <KidsDefault />
              </>
            ),
          }[comp]
        }
      </div>
      {comp === "video" && video === "brush_teeth" && (
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
      {comp === "video" && video === "wash_hands" && (
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
    </>
  );
}

export default Kids;
