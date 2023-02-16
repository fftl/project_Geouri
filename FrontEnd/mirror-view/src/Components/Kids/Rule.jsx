import React, { useEffect, useState } from "react";
import SparkleEffect from "../../Elements/SparkleEffect";
import Character from "./Character";
import KidsLevel from "./KidsLevel";
import "./Rule.css";

const Rule = (props) => {
  const { setComp, comp } = props;
  const [count, setCount] = useState(15);

  useEffect(() => {
    const changeComp = setTimeout(() => {
      setComp("greeting");
    }, 15000);
  }, []);

  return (
    <>
      <div className="rule">
        <div className="text-div">
          <span className="textrule">양치를 하고 손을 깨끗이 씻으면서</span>
          <span className="textrule">나만의 캐릭터를 키워보자!</span>
        </div>
        <div className="kidslevel">
          <img
            src={process.env.PUBLIC_URL + "/images/lv/lv0.png"}
            id="kidslev"
          />
        </div>
      </div>
      <SparkleEffect />
    </>
  );
};

export default Rule;
