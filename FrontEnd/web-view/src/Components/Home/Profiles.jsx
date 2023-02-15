import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const api = axios.create({
  baseURL : 'http://i8a201.p.ssafy.io'
}, {withCredentials: true})

function Profiles() {
  const [memberList, setMemberList] = useState([]);
  // const userKey = localStorage.getItem('userKey');
  const userKey = "Fyw3-DOwW";

  useEffect(() => {
    api.get('/web/user/memberlist', {
      headers: {
        "user-key": userKey,
      }
    }).then((response) => {
      setMemberList(response?.data?.data?.memberList);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/mirror/add');
  };
  return (
    <>
      <h1>멤버</h1>
      {memberList.map((member) => {
        return (
          <React.Fragment 
            key={member?.memberKey}>
            <Profile
              type="member" 
              member={member}/>
          </React.Fragment>
        )
      })}
      <Profile type="add_member" />
      <div className="footer-no-mirror">
        <Button onClick={handleClick} variant="text">
          아직 거울이 등록되지 않았습니다. <br /> 거울을 등록해주세요.
        </Button>
        <p></p>
      </div>
    </>
  );
}

export default Profiles;
