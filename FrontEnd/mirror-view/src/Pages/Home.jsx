import React from "react";
import { HomeHeader } from "../Components";

function Home(props) {
  const {type} = props;

  if(type === 'basic'){
    return (
      <>
      </>
    )
  }
  else if (type === 'on'){
    return (
      <>
        <HomeHeader />
      </>
    )
  }
}

export default Home;
