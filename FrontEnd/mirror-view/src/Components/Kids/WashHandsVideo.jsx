import ReactPlayer from "react-player";
import "./WashHandsVideo.css";
const WashHandsVideo = () => {
  return (
    <div className="container">
      <ReactPlayer
        url={process.env.PUBLIC_URL + "./videos/handwash.mp4"}
        width="1000px"
        height="700px"
        playing={true}
        muted={false}
        controls={true}
        loop={true}
        id="player"
      />
    </div>
  );
};

export default WashHandsVideo;
