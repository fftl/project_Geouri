import React from "react";
import { useSelector } from 'react-redux';
import { HomeHeader } from "../Components";
import { General, Kids } from './index';

function Home() {
    // const is_child = useSelector(state => state.is_child);

    return (
    <React.Fragment>
      <HomeHeader />
      {/* { is_child ? 
        <Kids></Kids> : 
        <General></General>
      } */}
      <General></General>
    </React.Fragment>
  );
}

export default Home;
