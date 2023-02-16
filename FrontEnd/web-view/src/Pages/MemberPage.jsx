import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../Components";
import { Image, Text } from "../Elements";
import './MemberPage.css';
import DaumPostcode from 'react-daum-postcode';

function MemberPage () {
  const member = useSelector((state) => state?.user?.member);
  const [kidsMode, setKidsMode] = useState();
  
  console.log(member);
  const changeKidsMode = () => {
    setKidsMode((prev) => !prev);
  }
  useEffect(() => {
    if(member){
      setKidsMode(member.kidsMode);
    }
  }, []);
  
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
          <div className="kidMode-box">
          {kidsMode ? 
              <label className="toggle-label">
                <span>아이모드</span>
                <input type="checkbox" role="switch"
                  defaultChecked
                  onClick={changeKidsMode}/>
              </label>
                : 
                <label className="toggle-label">
                <span>아이모드</span>
                <input type="checkbox" role="switch"
                  onClick={changeKidsMode}/>
              </label>
            }
          </div>
          <div className="location-box">
              <label className="location-label">
              </label>
          </div>
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
          <div className="kidMode-box">
            {kidsMode ? 
              <label className="toggle-label">
                <span>아이모드</span>
                <input type="checkbox" role="switch"
                  checked
                  onClick={changeKidsMode}/>
              </label>
                : 
                <label className="toggle-label">
                <span>아이모드</span>
                <input type="checkbox" role="switch"
                  onClick={changeKidsMode}/>
              </label>
            }
          </div>
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