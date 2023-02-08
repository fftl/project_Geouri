import React, { useEffect, useRef, useState } from "react";
import Youtube from 'react-youtube';
import './YoutubePlayer.css';
import axios from "axios";

function YoutubePlayer(){
    const playlistId = 'PLph2xcT2CJAIzf_OkcVYjw8qhx7wyxE_D'; // 후에 Back으로부터 받아옴
    // const playlistId = useState((state) => state?.mirror?.member?.playlist);
    const url = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&enablejsapi=1&controls=0`
    const [playList, setPlayList] = useState([]);
    const [play, setPlay] = useState('');

    useEffect(() => {
        axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
            params: {
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
                part: 'snippet',
                playlistId: `${playlistId}`,
                maxResult: 50,
            }
        }).then((res) => {
            setPlayList((res.data.items))
            setPlay(res.data.items[0]?.snippet?.resourceId?.videoId)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const opts = {
        height: '360',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
    };
    
    return (
        <>
            {/* {play ? 
                <div className="youtube-box">
                    <Youtube key={play} videoId={play} opts={opts} ></Youtube> 
                </div>
            :
            null}    */}
        <iframe  
            title="ytplayer"
            id="ytplayer" 
            className="ytplayer"
            type="text/html" 
            enablejsapi="1"
            width="640" height="360"
            src={url} 
            // ref={iframeRef}
            ></iframe>

            
        </>
    )
}

export default YoutubePlayer;