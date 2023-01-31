import React from "react";
import "./YoutubePlayer.css";

function YoutubePlayer(){
    const playlistId = 'PLph2xcT2CJAIzf_OkcVYjw8qhx7wyxE_D'; // 후에 Back으로부터 받아옴
    // mute 해주거나
    const url = `https://www.youtube.com/embed/videoseries?list=${playlistId}&mute=1&autoplay=1&loop=1`
    // unmute 하거나
    const url2 = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&loop=1`

    return (
        <>
          <div className="ytplayer-iframe-div">
            <iframe  
                className="ytplayer-iframe"
                title="ytplayer"
                id="ytplayer" 
                type="text/html" 
                width="640" height="360"
                src={url}></iframe>
          </div>
        </>
    )
}

export default YoutubePlayer;

    // const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?`;
    // const API_KEY = '***REMOVED***';
    // const [playList, setPlayList] = useState([]);

    // useEffect(() => {
    //     axios({
    //         method:'get',
    //         url: `${API_URL}part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`,
    //     }).then((res) => {
    //         const list = res.data.items;
    //         const videoIdList = list.map((item) => {
    //             return item.snippet.resourceId.videoId
    //         })
    //         setPlayList([...playList, videoIdList])
    //     }).catch((err) => {
    //         console.log(err)
    //     })
        
    // }, [])