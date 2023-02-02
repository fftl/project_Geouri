import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import ReactPlayer from "react-player";
import "./BrushTeethVideo.css";
const BrushTeethVideo = () => {
  const [video, setVideo] = useState(
    process.env.PUBLIC_URL + "./videos/brushteeth.mp4"
  );
  const videoRef = useRef();
  //   const playVideo = (e) => {
  //     e.preventDefault();
  //     videoRef.current
  //   }
  const playVideo = (e) => {
    e.preventDefault();
    setVideo(process.env.PUBLIC_URL + "./videos/brushteeth.mp4");
  };
  const stopvideo = (e) => {
    e.preventDefault();
    setVideo("");
  };
  useEffect(() => {
    setVideo(process.env.PUBLIC_URL + "./videos/brushteeth.mp4");
  }, [video]);
  return (
    <div className="container">
      {/* //   <ReactPlayer */}0
      {/* //     url={process.env.PUBLIC_URL + "/videos/brushteeth.mp4"}
    //     width="1000px"
    //     height="700px"
    //     playing={true}
    //     muted={false}
    //     controls={true}
    //     loop={true}
    //     id="player"
    //   /> */}
      {/* <video ref={videoRef}> */}
      <button onClick={playVideo}>play</button>
      <button onClick={stopvideo}>stop</button>
      <video
        muted
        autoPlay={true}
        preload=""
        style={{ width: "80%" }}
        ref={videoRef}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default BrushTeethVideo;
