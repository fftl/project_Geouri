import ReactPlayer from "react-player";
import "./WashHandsVideo.css";

const WashHandsVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const videoOff = () => {
    setComp('default');
    setVideo('')
    webSocket.send('wash_hands_finish');
  }

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
