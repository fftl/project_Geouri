import YouTubePlayer from "../Components/YoutubePlayer/YoutubePlayer";
import NewsPlayer from "../Components/NewsPlayer/NewsPlayer";
import Schedule from "../Components/Schedule/Schedule";
import './Home.css';
import { useSelector } from "react-redux";

function GeneralView(props) {
    const { webSocket } = props;
    const member_info_widget = useSelector((state) => state?.mirror?.member?.widget);

    console.log(member_info_widget);

    return (
        <div className="general-view-box">
            { member_info_widget?.playlist && <YouTubePlayer /> }
            { member_info_widget?.news && <NewsPlayer /> } 
            { member_info_widget?.calender && <Schedule /> }
        </div>
    )
}

export default GeneralView;