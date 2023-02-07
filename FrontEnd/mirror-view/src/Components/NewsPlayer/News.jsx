import React from "react";
import './News.css';

const News = (props) => {
    const { news } = props;
    return (
        <div className="news-box">
            <p className='news-title'>중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석</p>
            <p className='news-press'>YTN</p>
        </div>
    )
}

export default News;