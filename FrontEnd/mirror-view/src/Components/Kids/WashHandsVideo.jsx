import { useEffect } from "react";
import ReactPlayer from "react-player";
import { levelApi } from "../../Redux/modules/api";
import "./WashHandsVideo.css";

const WashHandsVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const msg = { cmd: "wash_hands_finish", content: "" };
  const jsonMsg = JSON.stringify(msg);

  const videoOff = () => {
    setComp("kidsDefault");
    setVideo("");
    webSocket.send(jsonMsg);
    const serialNumber = "8DLL-44yh-x7vB-VuWK";
    const memberKey = "fSBS-lCHb";
    const mission = "hand_washing";
    const requestBody = {
      serialNumber: serialNumber,
      memberKey: memberKey,
      mission: mission,
    };
    levelApi.getLevel(requestBody).then((res) => console.log(res));
  };

  return (
    <div className="container">
      <ReactPlayer
        url={process.env.PUBLIC_URL + "./videos/handwash.mp4"}
        width="1000px"
        height="700px"
        playing={true}
        autoPlay={true}
        id="player"
        onEnded={videoOff}
      />
    </div>
  );
};

export default WashHandsVideo;
