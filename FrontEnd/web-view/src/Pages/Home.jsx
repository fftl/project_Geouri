import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import { HomeHeader, Profiles} from '../Components/index';

function Home () {
    
    return (
        <>
            <HomeHeader />
            <Profiles />
        </>
    )

}

export default Home;