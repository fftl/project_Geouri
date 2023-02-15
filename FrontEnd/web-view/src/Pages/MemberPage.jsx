import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../Components";
import { Image, Text } from "../Elements";

const api = axios.create({
  baseURL : 'http://i8a201.p.ssafy.io'
}, {withCredentials: true})

function MemberPage () {
  const member = useSelector((state) => state?.user?.member);
  
  
  //아이 모드
  if(member && member?.kidsMode === true) {
    return (
      <div className="container">
        <HomeHeader type="BasicHeader" />
        <div className="member-header">
          <Image type="member" src={member?.imgUrl}/>
          <Text>{member?.nickname}</Text>
        </div>
        <div className="widget-box">
          <div className="kidMode-box"></div>
          <div className="location-box"></div>
          <div className="youtube-box"></div>
          <div className="news-box"></div>
          <div className="calendar-box"></div>
          <div className=""></div>
        </div>
      </div>
    )
  }

    //어른 모드
  if(member) {
    return (
      <div className="container">
        <HomeHeader type="BasicHeader" />
        <div className="member-header">
          <Image type="member" src={member?.imgUrl}/>
          <Text>{member?.nickname}</Text>
        </div>
        <div className="widget-box">
          <div className="kidMode-box"></div>
          <div className="location-box"></div>
          <div className="youtube-box"></div>
          <div className="news-box"></div>
          <div className="calendar-box"></div>
          <div className=""></div>
        </div>
      </div>
    )
  }
}
export default MemberPage;