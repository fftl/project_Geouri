import React, { useEffect, useRef, useState } from "react";
import "./YoutubePlayer.css";
import axios from "axios";
import { useSelector } from "react-redux";

function YoutubePlayer() {
  const playlistId = 'PLph2xcT2CJAIzf_OkcVYjw8qhx7wyxE_D'; // 후에 Back으로부터 받아옴
  // const playlistId = useState((state) => state?.mirror?.member?.playlist);
  const url = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&enablejsapi=1&controls=0`;
  const [play, setPlay] = useState(true);
  const action = useSelector((state) => state?.mirror?.action);

  useEffect(() => {
    if (action === "play_music") {
      setPlay(true);
    } else if (action === "stop_music") {
      setPlay(false);
    }
  }, [action]);

  return (
    <div className="youtube-box">
      {play && playlistId ? (
        <iframe
          title="ytplayer"
          id="ytplayer"
          className="ytplayer"
          type="text/html"
          enablejsapi="1"
          width="640"
          height="360"
          src={url}
        ></iframe>
      ) : null}
    </div>
  );
}

export default YoutubePlayer;
