import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../Redux/modules/user";
import axios from "axios";
import Profile from "./Profile";
import HomeHeader from "./HomeHeader";
import "./Profile.css";
import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const api = axios.create({
  baseURL : 'http://i8a201.p.ssafy.io'
}, {withCredentials: true})

function Profiles() {
  const dispatch = useDispatch();
  const [memberList, setMemberList] = useState([]);

  const userKey = localStorage.getItem('userKey');
  const serialNumber = localStorage.getItem('serialNumber');
  // const userKey = useSelector((state) => state.user.userKey);

  useEffect(() => {
    console.log('memberList get')
    api.get('/web/user/memberlist', {
      headers: {
        "user-key": userKey,
      }
    }).then((response) => {
      setMemberList(response?.data?.data?.memberList);
      dispatch(userActions.setMemberList(response?.data?.data?.memberList));
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
      <HomeHeader type="HomeHeader"/>
      <p className="profile-list-title">멤버</p>
      <div className="profile-list">
        {memberList?.map((member) => {
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
      </div>
      {!serialNumber &&      
        <div className="footer-no-mirror">
          <Button onClick={handleClick} variant="text">
            아직 거울이 등록되지 않았습니다. <br /> 거울을 등록해주세요.
          </Button>
        </div>
      }
    </>
  );
}

export default Profiles;
