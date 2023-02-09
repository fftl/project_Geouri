import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Slideshow from "../../Elements/Slideshow";
import "./BrushTeethVideo.css";

const BrushTeethVideo = (props) => {
  const { webSocket, setComp, setVideo } = props;

  const videoOff = () => {
<<<<<<< HEAD
    setComp('camera');
    setVideo('');
    webSocket.send('brush_teeth_finish');

  }
=======
    setComp("camera");
    setVideo("");
  };

  const [teethver, setTeethver] = useState(false);

  useEffect(() => {
    setTeethver(Math.random() >= 0.5);
  }, []);

>>>>>>> 463b6a2da7c9151262a9aed7d41736615ec87599
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
