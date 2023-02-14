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

  useEffect(() => {
    api.get('/web/user/memberlist', {
      headers: {
        "userKey": "Fyw3-DOwW",
      }
    }).then((response) => {
      setMemberList(response?.data?.memberList);
    }).catch((err) => {
      console.log(err);

    })
  }, []);
  
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    // add-mirror modal open
  };
  return (
    <>
      <h1>멤버</h1>
      {memberList.map((member) => {
        return (
            <Profile 
            key={member.memberKey}
            member={member}/>
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
