import React, { useEffect, useState } from "react";
import SparkleEffect from "../../Elements/SparkleEffect";
import Character from "./Character";
import KidsLevel from "./KidsLevel";
import "./Rule.css";

const Rule = () => {
  // const [count, setCount] = useState();
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (count > 0) {
  //       setCount((prev) => prev - 1);
  //     }
  //   }, 1000);
  //   if (count === 0) {
  //   }
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [count]);

  return (
    <>
      <div className="rule">
        <div className="text-div">
          <span className="text">양치를 하고 손을 깨끗이 씻으면서</span>
          <span className="text">나만의 캐릭터를 키워보자!</span>
        </div>
        <div className="kidslevel">
          <img
            src={process.env.PUBLIC_URL + "/images/lv/lv0.png"}
            id="kidslev"
          />
        </div>
      </div>
      {/* <SparkleEffect /> */}
    </>
  );
};

export default Rule;
