import ReactPlayer from "react-player";
import "./BrushTeethVideo.css";

const BrushTeethVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const videoOff = () => {
    setComp('camera');
    setVideo('');
  }
  return (
    <div className="container">
     <ReactPlayer
        url={process.env.PUBLIC_URL + "/videos/brushteeth.mp4"}
        width="1000px"
        height="700px"
        playing={true}
        controls={true}
        loop={true}
        id="player"
        onEnded={videoOff}
      />
    </div>
  );
};

export default BrushTeethVideo;
