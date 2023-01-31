import React from "react";
import "./Home.css";
import { Image, Text } from "../../Elements/index"; 
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const { member, key, type } = props;

    const navigator = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigator(`/member/${member.id}`);
    }
    const addMemberClick = (e) => {
        e.preventDefault();
        navigator(`/member/add`);

    }
    
    if (type === 'member') {
        return (
            <>
              <div className="member-div">
                <Image 
                    type="member"
                    onClick={handleClick}
                    src={member.image}/>
                <Text>{member.name}</Text>

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