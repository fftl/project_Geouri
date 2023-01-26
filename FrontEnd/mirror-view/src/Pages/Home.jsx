import React from "react";
import HomeHeader from "../Components/HomeHeader";
import YoutubePlayer from "../Components/YoutubePlayer";

function Home () {
    return (
        <React.Fragment>
            <HomeHeader />
            <YoutubePlayer />
        </React.Fragment>
    )
}

export default Home;