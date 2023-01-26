import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Youtube from "./Youtube";

function YoutubePlayer(){
    const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?`;
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const playlistId = 'PLph2xcT2CJAIzf_OkcVYjw8qhx7wyxE_D'; // 후에 Back으로부터 받아옴
    const [playList, setPlayList] = useState([]);

    useEffect(() => {
        
        axios({
            method:'get',
            url: `${API_URL}part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`,
        }).then((res) => {
            const list = res.data.items;
            // const new_list = list.map((x) => x?.snippet.resourceId.videoId); 
            // setPlayList([new_list])
            setPlayList(list)
        }).catch((err) => {
            console.log(err)
        })
        
    }, [])

    return (
        <React.Fragment>
            <div>
                <Youtube playList={playList}/>
            </div>
        </React.Fragment>
    )
}

export default YoutubePlayer;