import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileEdit from "../Components/Home/ProfileEdit";
import { HomeHeader, Profiles } from "../Components/index";

function Home() {
  const navigate = useNavigate();
  const is_login = sessionStorage.getItem('jwt')? true : false;

  useEffect(() => {

    if (is_login) {
      return (
        <div className="container">
        <HomeHeader />
        <Profiles />
        {/* <ProfileEdit /> */}
      </div>
      )
    }
    else {
      navigate('/login');
    }
  }, []);
}

export default Home;
