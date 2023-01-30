import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import { Button } from "@mui/material";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

function Profiles () {
    const user = useSelector((state) => state.user);
    const members = user.members;
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        // add-mirror modal open
    }
    return (
        <>
          <h1>멤버</h1>
          {/* {members.map((member) => {
              <Profile 
                key={member.id}
                member={member}/>
          })} */}
          <Profile type="add_member"/>
          <div className="footer-no-mirror">
            <Button 
                onClick={handleClick}
                variant="text">아직 거울이 등록되지 않았습니다. <br/> 거울을 등록해주세요.</Button>
            <p></p>
          </div>
        </>
    )

}

export default Profiles;