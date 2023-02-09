import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Slideshow from "../../Elements/Slideshow";
import "./BrushTeethVideo.css";

const BrushTeethVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const videoOff = () => {
    setComp("camera");
    setVideo("");
    webSocket.send('brush_teeth_finish');
  };

  const [teethver, setTeethver] = useState(false);

  useEffect(() => {
    setTeethver(Math.random() >= 0.5);
  }, []);

  return (
    <div className="container">
      {teethver === false ? (
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
      ) : (
        <Slideshow />
      )}
    </div>
  );
};

export default BrushTeethVideo;
