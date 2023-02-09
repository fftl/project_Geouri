import ReactPlayer from "react-player";
import "./WashHandsVideo.css";

const WashHandsVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const msg = { cmd: "wash_hands_finish", content: "" };
  const jsonMsg = JSON.stringify(msg);

  const videoOff = () => {
    setComp("default");
    setVideo("");
    webSocket.send(jsonMsg);
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
