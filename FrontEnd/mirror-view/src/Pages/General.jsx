import { YoutubePlayer, NewsPlayer, Schedule } from '../Components/index';
import { useSelector } from 'react-redux'; 

export default function General() {
    // const youtube_on = useSelector(state => state.member.youtube_on); 
    // const news_on = useSelector(state => state.member.news_on); 
    // const schedule_on = useSelector(state => state.member.schedule_on);

    return (
        <div className='main-box'>
            {/* { 
                youtube_on ? 
                    <YoutubePlayer></YoutubePlayer> :
                    null
            }
            {
                news_on ? 
                    <NewsPlayer></NewsPlayer> :
                    null
            }
            {
                schedule_on ? 
                    <Schedule></Schedule> :
                    null 
            } */}
            <YoutubePlayer></YoutubePlayer>
            <NewsPlayer></NewsPlayer>
            <Schedule></Schedule>
        </div>
    )
}
