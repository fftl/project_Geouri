import React, { useState } from "react";
import { useSelector } from "react-redux";
import News from "./News";
import "./News.css";

function NewsPlayer () {
    const newsData = useSelector((state) => state?.mirror?.member?.news);
    
    return (
        <div className="news-wrapper">
            <div className="news-player">
            {newsData?.map((news) => {
                return (
                    <News news={news} key={news.id}/>        
                    // {/* // 추후에 index 말고 id 값으로 줘야해 */}
                )
            })}

            </div>
        </div>
    )
}

export default NewsPlayer;
