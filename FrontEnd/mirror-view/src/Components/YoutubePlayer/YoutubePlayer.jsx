import React, { useEffect, useRef, useState } from "react";
import "./YoutubePlayer.css";
import axios from "axios";
import { useSelector } from "react-redux";

function YoutubePlayer( props ) {
  const { no_calendar } = props; // calendar 없으면 youtube_iframe은 위로 옮겨줄 것 -> css 다르게 적용

  const playlist = useSelector((state) => state?.mirror?.member?.playlist);
  const playlistId = playlist.slice(playlist.indexOf("=")+1)
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
    <div className={no_calendar ? 'youtube-box' : 'no-calendar-youtube-box'}>
      {play && playlistId ? (
        <iframe
          title="ytplayer"
          id="ytplayer"
          className="ytplayer"
          name="ytplayer"
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
