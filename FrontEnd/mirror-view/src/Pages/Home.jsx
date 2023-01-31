import React from "react";
import Effect from "../Components/Effect";
import HomeHeader from "../Components/HomeHeader";
import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";

function Home() {
  return (
    <React.Fragment>
      <HomeHeader />
      <Effect />
      {/* <WashHandsVideo /> */}
      <BrushTeethVideo />
    </React.Fragment>
  );
}

export default Home;
