import React from "react";
import { useDispatch, useSelector} from 'react-redux';

function HomeHeader (props) {
    const { type } = props;
    const user = useSelector((state) => state.user);
    

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
              <p>뒤로 가기 버튼</p>
            </div>
        )
    }

}

export default HomeHeader;