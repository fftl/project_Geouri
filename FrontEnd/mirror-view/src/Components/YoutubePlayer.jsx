import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

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
            const list = res?.data?.items;
            const new_list = list.map((x) => x?.snippet.resourceId.videoId); 
            setPlayList([new_list])
        }).catch((err) => {
            console.log(err)
        })
        
    }, [])
    
    const videoList = playList.map((id) => {
        
        return (
            <iframe width="560" height="315" src="https://www.youtube.com/embed/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        )
    })
    
    return (
        <React.Fragment>
            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/UExwaDJ4Y1QyQ0pBSXpmX09rY1ZZanc4cWh4N3d5eEVfRC41NkI0NEY2RDEwNTU3Q0M2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </React.Fragment>
    )
}

export default YoutubePlayer;