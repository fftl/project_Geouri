import React, { useEffect, useRef } from "react";
import './News.css';

const News = (props) => {
    const { news, setCount, count } = props;

    const interval = useRef(null);

    useEffect(() => {
      interval.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }, []);

    return (
        <div className={count % 4 === 0 ? "news-box active" : "news-box item"}>
            <p className='news-title'>중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석</p>
            <p className='news-press'>YTN</p>
        </div>
    )
}

export default News;