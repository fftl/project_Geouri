import React from "react";
import { HomeHeader } from "../Components";
import Photolist from "../Components/Photo/Photolist";

const Photobook = () => {

  return (
    <div className="container">
      <HomeHeader type="BasicHeader"/>
      <Photolist />
    </div>
  );
};

export default Photobook;
