import { getByDisplayValue } from "@testing-library/dom";
import React, { useState, useEffect, useHistory } from "react";
import styled from "styled-components";
import snap from "../assets/img/snap.gif";
import "./Timer.css";

function Timer(props) {
  const { setComp, comp } = props;

  const [sec, setSec] = useState(parseInt(3));
  const [shoot, setShoot] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1);
      }
      if (parseInt(sec) === 0) {
        setShoot(true);
        clearInterval(countdown);
      }
    }, 1000);
  }, [sec]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setComp("ending");
    }, 4100);
    return () => clearInterval(countdown);
  }, [shoot]);

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

  return (
    <div className="timer">
      <p className="seconds">
        {sec !== 0 && sec}
        {/* {sec === 0 && <img id="shooting" src={snap} alt="shooting" />} */}
        {shoot ? <img id="shooting" src={snap} alt="shooting" /> : null}
      </p>
    </div>
  );
}

export default Timer;
