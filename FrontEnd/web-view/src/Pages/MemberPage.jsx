import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../Components";
import { Image, Text } from "../Elements";
import './MemberPage.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
// import DaumPostcode from 'react-daum-postcode';

function MemberPage () {
  const member = useSelector((state) => state?.user?.member);
  const [kidsMode, setKidsMode] = useState();
  const [youtubeMode, setYoutubeMode] = useState();
  const [calendarMode, setCalendarMode] = useState();
  const [newsMode, setNewsMode] = useState();
  
  const changeKidsMode = () => {
    setKidsMode((prev) => !prev);
  }
  const changeYoutubeMode = () => {
    setYoutubeMode((prev) => !prev);
  }
  const changeCalendarMode = () => {
    setCalendarMode((prev) => !prev);
  }
  const changeNewsMode = () => {
    setNewsMode((prev) => !prev);
  }

  useEffect(() => {
    if(member){
      setKidsMode(member?.kidsMode);
      setYoutubeMode(member?.widget?.playlist);
      setNewsMode(member?.widget?.news);
      setCalendarMode(member?.widget?.calendar);
      console.log(member);
    }
  }, [member]);

  // 다음 지도 api
  // const [openLocationModal, setOpenLocationModal] = useState(false);
  // const [address, setAddress] = useState("");
  // const postCodeStyle = {
  //   display: "block",
  //   position: "absolute",
  //   top: "20%",
  //   width: "400px",
  //   height: "400px",
  //   padding: "7px",
  //   zIndex: 100, 
  // }
  // const onCompletePost = (data) => {
  //   setAddress(data.address);
  //   console.log(data.address)
  // }

  //아이 모드
  if(member && member?.kidsMode === true && kidsMode === true) {
    return (
      <div className="container">
        <HomeHeader type="BasicHeader" />
        <div className="member-header">
          <Image type="member" src={member?.imgUrl}/>
          <div className="is_flex">
            <p style={{alignItems:'center', display:'flex'}}>{member?.nickname}</p>
            <div >
              <CreateOutlinedIcon/>
            </div>
          </div>
        </div>
        <div className="widget-box">
          <div className="kidMode-box">
          {member?.kidsMode === true ? 
              <label className="toggle-label">
                <span>아이모드</span>
                <input type="checkbox" role="switch" defaultChecked onClick={changeKidsMode}/>
              </label>
                : 
                <label className="toggle-label">
                <span>아이모드</span>
                <input type="checkbox" role="switch" onClick={changeKidsMode}/>
              </label>
            }
          </div>
          <div className="location-box is_flex">
            <div className="location-title">위치</div>
            <input type="text" placeholder="시군동을 입력해주세요" />
            {/* <div onClick={setOpenLocationModal}>위치</div>
            {openLocationModal&& 
            <DaumPostcode
            style={postCodeStyle}
            autoClose
            onComplete={onCompletePost}
              />
            } */}
          </div>
          {}
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
          <div className="is_flex">
            <p style={{alignItems:'center', display:'flex'}}>{member?.nickname}</p>
            <div >
              <CreateOutlinedIcon/>
            </div>
          </div>
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