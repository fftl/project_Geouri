import React from "react";
import "./Home.css";
import { Image, Text } from "../../Elements/index"; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { asyncGetMember } from "../../Redux/modules/user";


const Profile = (props) => {
    const { member, type } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(asyncGetMember(member?.memberKey));
        navigate('/member');
    }
    const addMemberClick = (e) => {
        e.preventDefault();
        navigate('/member/add');

    }
    
    if (type === 'member') {
        return (
            <>
              <div className="member-div">
                <Image 
                    type="member"
                    onClick={handleClick}
                    src={member?.imgUrl}/>
                <Text>{member?.nickname}</Text>

              </div>
            </>
        )
    }
    if (type === 'add_member') {
        return (
            <> 
              <div className="member-div">
                <Image 
                    type="add_member"
                    onClick={addMemberClick}/>
                <Text>구성원 추가</Text>
              </div> 
            </>
        )
    }
}

export default Profile;