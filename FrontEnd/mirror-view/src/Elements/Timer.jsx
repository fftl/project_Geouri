import { getByDisplayValue } from "@testing-library/dom";
import React, { useState, useEffect, useHistory, useRef } from "react";
import styled from "styled-components";
import snap from "../assets/img/snap.gif";
import "./Timer.css";

function Timer(props) {
  const { setComp, comp } = props;

  const [sec, setSec] = useState(3);
  const [shoot, setShoot] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if ( sec > 0 ){

        setSec((prev) => prev - 1);
      }
    }, 1000);
      if (sec === 0) {
        setShoot(true);
      }
    return (() => {
      clearInterval(timer); 
    });
  }, [sec]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setComp("none");
    }, 3200);
    return () => clearInterval(countdown);
  }, [shoot]);

  return (
    <div className="timer">
      <p className="timer-num">
        {shoot ? null : sec}
      </p>
      {shoot ? <img id="shooting" src={snap} alt="shooting" /> : null}
    </div>
  );
}

export default Timer;
