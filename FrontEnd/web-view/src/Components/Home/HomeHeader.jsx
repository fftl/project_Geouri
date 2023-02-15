import React from "react";
import { useDispatch, useSelector} from 'react-redux';

function HomeHeader (props) {
    const { type } = props;
    const user = useSelector((state) => state.user);
    

    if(type === 'HomeHeader'){
        return (
            <div className="HomeHeader">
              
            </div>
        )
    }

}

export default HomeHeader;