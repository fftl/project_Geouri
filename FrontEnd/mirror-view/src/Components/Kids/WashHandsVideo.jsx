import ReactPlayer from "react-player";
import "./WashHandsVideo.css";

const WashHandsVideo = (props) => {
  const { webSocket } = props;

  const sendMsgToServer = () => {
    webSocket.send('handWashVideoEnded')
  }

  return (
    <div className="container">
      <ReactPlayer
        url={process.env.PUBLIC_URL + "./videos/handwash.mp4"}
        width="1000px"
        height="700px"
        playing={true}
        autoPlay={true}
        muted={true}
        id="player"
        onEnded={sendMsgToServer}
      />
    </div>
  );
};

export default WashHandsVideo;
