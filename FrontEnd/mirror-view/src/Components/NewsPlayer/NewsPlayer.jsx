import React, { useState } from "react";
import News from "./News";
import "./News.css";

function NewsPlayer () {
    // const newsData = useState((state) => state?.mirror?.member?.news);
    
    const newsData = [
        {
            'id': 1,
            'press': 'YTN',
            'title': '중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석'
        }, 
        {
            'id': 2,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 3,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 4,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 5,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 6,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 7,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 8,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 9,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },

        {
            'id': 10,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 11,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
        {
            'id': 12,
            "press": "YTN",
            "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
        },
    ]
    return (
        <div className="news-wrapper">
            <div className="news-player">
            {newsData?.map((news) => {
                return (
                    <>
                        <News news={news} key={news.id}/>     
                        {/* // 추후에 index 말고 id 값으로 줘야해 */}
                    </>
                )
            })}

            </div>
        </div>
    )
}

export default NewsPlayer;
