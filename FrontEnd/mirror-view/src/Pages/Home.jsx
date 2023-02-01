import React from "react";
import HomeHeader from "../Components/HomeHeader/HomeHeader";
// import YoutubePlayer from "../Components/YoutubePlayer";
import Kids from "./Kids";
import GeneralView from "./GeneralView";

function Home () {
    const is_child = true;
    // const is_child = useSelector(state => state.member.is_child);

    return (
        <React.Fragment>
            <HomeHeader />
            {is_child ? <Kids/> : <GeneralView/>}
            {/* <YoutubePlayer /> */}
        </React.Fragment>
    )
}

export default Home;