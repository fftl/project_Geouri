import ReactPlayer from "react-player";
import "./BrushTeethVideo.css";
const BrushTeethVideo = () => {
  return (
    <div className="container">
      <ReactPlayer
        url={process.env.PUBLIC_URL + "/videos/brushteeth.mp4"}
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

export default BrushTeethVideo;
