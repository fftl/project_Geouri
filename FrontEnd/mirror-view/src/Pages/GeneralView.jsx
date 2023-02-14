import YouTubePlayer from "../Components/YoutubePlayer/YoutubePlayer";
import NewsPlayer from "../Components/NewsPlayer/NewsPlayer";
import Schedule from "../Components/Schedule/Schedule";
import './Home.css';
import { useSelector } from "react-redux";
import { FortuneTeller } from "../Components";

function GeneralView(props) {
    const { webSocket } = props;
    const member_info_widget = useSelector((state) => state?.mirror?.member?.widget);
    const fortune = useSelector((state) => state?.mirror?.member?.fortune);
    const no_calendar = member_info_widget?.calender;
    
    return (
        <div className="general-view-box">
            { member_info_widget?.calender && <Schedule /> }
            { member_info_widget?.news && <NewsPlayer no_calendar={no_calendar} /> } 
            { member_info_widget?.playlist && <YouTubePlayer no_calendar={no_calendar}/> }
            { fortune && <FortuneTeller />}
        </div>
    )
}

export default GeneralView;