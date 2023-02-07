import { useState } from "react";
import YouTubePlayer from "../Components/YoutubePlayer/YoutubePlayer";
import NewsPlayer from "../Components/NewsPlayer/NewsPlayer"

function GeneralView(props) {
    const { webSocket } = props;

    const member_info = useState(state => state?.mirror?.member?.data);

    return (
        <>
            <YouTubePlayer />
            <NewsPlayer />
        </>
    )
}

export default GeneralView;