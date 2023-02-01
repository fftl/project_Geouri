import React from "react";
import { useSelector } from "react-redux";
import { HomeHeader } from "../Components";
import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import { General, Kids } from "./index";
import Effect from "../Components/Kids/Effect";

function Home() {
  // const is_child = useSelector(state => state.is_child);

  return (
    <React.Fragment>
      <HomeHeader />
      {/* { is_child ? 
        <Kids></Kids> : 
        <General></General>
      } */}
      {/* <General></General> */}
      <BrushTeethVideo />
      <Effect />
    </React.Fragment>
  );
}

export default Home;
