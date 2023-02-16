import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function HomeHeader (props) {
    const { type } = props;
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const goBack = () => {
        navigate(-1);
    }

    if(type === 'HomeHeader'){
        return (
            <div className="HomeHeader">
              <p>옆에 햄버거 버튼</p>
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