import React, { useState } from "react";
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

function HomeHeader (props) {
    const { type } = props;
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    
    const goBack = () => {
        navigate(-1);
    }
    const [sideBar, setSideBar] = useState(false);
    const openSideBar = () => {
      setSideBar(!sideBar);
    }

    if(type === 'HomeHeader'){
        return (
            <div className="HomeHeader">
              <div className="hamburger-button">
                {/* <MenuIcon onClick={openSideBar}/> */}
              </div>
            </div>
        )
    }
    if(type === 'BasicHeader'){
        return (
            <div className="BasicHeader">
              <div className="go-back-button">
                <ArrowBackIcon onClick={goBack}/>
              </div>
            </div>
        )
    }

}

export default HomeHeader;