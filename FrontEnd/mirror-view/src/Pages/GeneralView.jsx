import YouTubePlayer from "../Components/YoutubePlayer/YoutubePlayer";
import NewsPlayer from "../Components/NewsPlayer/NewsPlayer";
import Schedule from "../Components/Schedule/Schedule";
import './Home.css';
import { useSelector } from "react-redux";
import { HomeHeader, FortuneTeller } from "../Components";

function GeneralView(props) {
    const { webSocket } = props;
    const member_info_widget = useSelector((state) => state?.mirror?.member?.widget);
    // const fortune = useSelector((state) => state?.mirror?.member?.fortune);
    const fortune = '이 고비를 잘 넘겨야 합니다.'
    const no_calendar = member_info_widget?.calender;

    
    return (
        <>
        <HomeHeader />
            <div className="general-view-box">
                { member_info_widget?.calender && <Schedule /> }
                { member_info_widget?.news && <NewsPlayer no_calendar={no_calendar} /> } 
                { member_info_widget?.playlist && <YouTubePlayer no_calendar={no_calendar}/> }
                { fortune && <FortuneTeller />}
            </div>
        </>
    )
}

export default GeneralView;