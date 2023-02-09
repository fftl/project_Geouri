import React, { useEffect, useRef } from "react";
import './News.css';

const News = (props) => {
    const { news } = props;


    return (
        <div className="news-box">
            <p className='news-title'>{news.title}</p>
            <p className='news-press'>{news.press}</p>
        </div>
    )
}

export default News;