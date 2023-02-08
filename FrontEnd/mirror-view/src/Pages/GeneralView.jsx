import { useState } from "react";
import YouTubePlayer from "../Components/YoutubePlayer/YoutubePlayer";
import NewsPlayer from "../Components/NewsPlayer/NewsPlayer";
import Schedule from "../Components/Schedule/Schedule";

function GeneralView(props) {
    const { webSocket } = props;
    const member_info = useState(state => state?.mirror?.member?.data);

    return (
        <div className="general-view-box">
            <YouTubePlayer />
            <NewsPlayer />
            <Schedule />
        </div>
    )
}

export default GeneralView;