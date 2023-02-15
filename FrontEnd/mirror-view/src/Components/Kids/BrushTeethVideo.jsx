import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import "./BrushTeethVideo.css";
import { levelApi } from "../../Redux/modules/api";
import { mirrorActions } from "../../Redux/modules/mirror";

const BrushTeethVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      window.init();
    }, 15000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const msg = { cmd: "brush_teeth_finish", content: "" };
  const jsonMsg = JSON.stringify(msg);
  const member_info = useSelector((state) => state?.mirror?.member);

  const videoOff = () => {
    setComp("camera");
    setVideo("");
    webSocket.send(jsonMsg);
  };
  const [teethver, setTeethver] = useState(false);

  // useEffect(() => {
  //   setTeethver(Math.random() >= 0.5);
  // }, []);

  const serialNumber = "8DLL-44yh-x7vB-VuWK";
  const memberKey = member_info?.memberKey;
  const mission = "brushing";
  const requestBody = {
    serialNumber: serialNumber,
    memberKey: memberKey,
    mission: mission,
  };

  levelApi
    .getLevel(requestBody)
    .then((res) => dispatch(mirrorActions.getLev(res.data.data)));

  return (
    <div className="container">
      {teethver === false ? (
        <ReactPlayer
          url={process.env.PUBLIC_URL + "/videos/brushteeth.mp4"}
          width="1000px"
          height="700px"
          playing={true}
          autoPlay={true}
          loop={false}
          id="player"
          muted={true}
          onEnded={videoOff}
        />
      ) : (
        <ReactPlayer
          url={process.env.PUBLIC_URL + "/videos/brushguide.mp4"}
          width="1000px"
          height="700px"
          autoPlay={true}
          playing={true}
          id="player"
          onEnded={videoOff}
        />
      )}
    </div>
  );
};

export default BrushTeethVideo;
