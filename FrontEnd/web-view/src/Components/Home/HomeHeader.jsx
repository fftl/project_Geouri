import React from "react";
import { useDispatch, useSelector} from 'react-redux';

function HomeHeader () {
    const user = useSelector((state) => state.user);
    
    return (
        <div className="HomeHeader">
          
        </div>
    )

}

export default HomeHeader;