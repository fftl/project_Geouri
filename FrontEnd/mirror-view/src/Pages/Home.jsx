import React from "react";
import HomeHeader from "../Components/HomeHeader/HomeHeader";
import Kids from "./Kids";
import GeneralView from "./GeneralView";
import { useSelector } from "react-redux";
import PhotoTimer from "../Components/Kids/PhotoTimer";

function Home() {
  const isChild = useSelector((state) => state?.member?.isChild);
  const isAdult = useSelector((state) => state?.member?.isAdult);

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default Home;
