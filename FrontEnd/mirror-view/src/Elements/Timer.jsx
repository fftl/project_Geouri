import { getByDisplayValue } from "@testing-library/dom";
import React, { useState, useEffect, useHistory } from "react";
import styled from "styled-components";
import snap from "../assets/img/snap.gif";
import "./Timer.css";

function Timer(props) {
  const history = useHistory();
  const [sec, setSec] = useState(parseInt(3));
  const [camera, setCamera] = useState(false);
  const { cameraEnd } = props;

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1);
      }
      if (parseInt(sec) === 0) {
        clearInterval(countdown);
      }
    }, 1000);
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

  // const ele = document.getElementById("shooting");
  useEffect(() => {
    const cameraOver = () => {
      setTimeout(() => {
        //   history.push("/kids");
      }, 4000);
      // return () => {
      //   clearTimeout(cameraOver);
    };
    setCamera(true);
    // };
  }, []);
  // console.log(ele.style);

  return (
    <div className="timer">
      <p className="seconds">{sec !== 0 && sec}</p>
      {sec === 0 && <img id="shooting" src={snap} alt="shooting" />}
    </div>
  );
  // if (sec > 0) {
  //   return (
  //     <>
  //       <div className="timer">{sec}</div>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <div className="timer">찰칵</div>
  //     </>
  //   );
  // }
}

export default Timer;
