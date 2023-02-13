import React, { useState } from "react";
import { useSelector } from "react-redux";
import News from "./News";
import "./News.css";

function NewsPlayer (props) {
    const { no_calendar } = props; 
    const newsData = useSelector((state) => state?.mirror?.member?.news);
    
    return (
        <div className={no_calendar ? "news-wrapper" : "no-calendar-news-wrapper"}>
            <div className="news-player">
            {newsData?.map((news, idx) => {
                return (
                    <News news={news} key={idx}/>        
                    // {/* // 추후에 index 말고 id 값으로 줘야함 */}
                )
            })}

            </div>
        </div>
    )
}

export default NewsPlayer;
