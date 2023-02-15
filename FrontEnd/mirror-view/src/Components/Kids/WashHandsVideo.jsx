import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { levelApi } from "../../Redux/modules/api";
import "./WashHandsVideo.css";
import { mirrorActions } from "../../Redux/modules/mirror";
const WashHandsVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const dispatch = useDispatch();
  const msg = { cmd: "wash_hands_finish", content: "" };
  const jsonMsg = JSON.stringify(msg);
  const member_info = useSelector((state) => state?.mirror?.member);
  const videoOff = () => {
    setComp("kidsDefault");
    setVideo("");
    webSocket.send(jsonMsg);
  };

  const serialNumber = "8DLL-44yh-x7vB-VuWK";
  const memberKey = member_info?.memberKey;
  const mission = "brushing";
  const requestBody = {
    serialNumber: serialNumber,
    memberKey: memberKey,
    mission: mission,
  };

  levelApi.getLevel(requestBody).then((res) => {
    console.log(res.data.data);
    dispatch(mirrorActions.getLev(res.data.data));
  });

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
        muted={true}
      />
    </div>
  );
};

export default WashHandsVideo;
