import { getByDisplayValue } from "@testing-library/dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import snap from "../assets/img/snap.gif";

function Timer(props) {
  const { setComp } = props;
  const [sec, setSec] = useState(parseInt(3));
  const [shoot, setShoot] = useState(parseInt(4));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1);
      }
      if (parseInt(sec) === 0) {
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [sec]);

  // useEffect(() => {
  //   const shootover = setInterval(() => {
  //     if (parseInt(shoot) > 0) {
  //       setShoot(parseInt(shoot) - 1);
  //     }
  //     if (parseInt(shoot) === 0) {
  //       clearInterval(shootover);
  //       {
  //         style: display = { none };
  //       }
  //     }
  //   }, 1000);
  // }, []);
  const ele = document.getElementById("shooting");
  const shootover = () => {
    const ele = document.getElementById("shooting");
    setTimeout(() => {
      setComp("ending");
    }, 1000);
  };

  // console.log(ele.style);

  return (
    <div className="timer">
      {sec !== 0 && sec}
      {sec === 0 && <img id="shooting" src={snap} alt="shooting" />}
    </div>
  );
  if (sec > 0) {
    return (
      <>
        <div className="timer">{sec}</div>
      </>
    );
  } else {
    return (
      <>
        <div className="timer">찰칵</div>
      </>
    );
  }
}

export default Timer;
