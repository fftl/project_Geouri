import React from "react";
import { HomeHeader } from "../Components";
import Photolist from "../Components/Photo/Photolist";

const Photobook = () => {

  return (
    <>
      {/* <Photolist /> */}
      <HomeHeader type="BasicHeader"/>
      <Photolist />
    </>
  );
};

export default Photobook;
