import React from "react";
import HomeHeader from "../Components/HomeHeader/HomeHeader";
import Kids from "./Kids";
import GeneralView from "./GeneralView";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  //webSocket 통신
  const webSocket = new WebSocket("ws://localhost:9998");

  // server에서 보내주는 메시지
  const [message, setMessage] = useState(null);

  const [isChild, setIsChild] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  // 소켓이 열려있는 상태일 때 계속 진행되는 함수
  webSocket.onopen = function () {
    // console.log(webSocket)
    // console.log('open')
  };
  webSocket.onclose = function () {
    console.log("closed");
  };
  webSocket.onmessage = function (message) {
    console.log(webSocket);
    if (message.data === "1") {
      // setIsChild(true)
      // setIsAdult(false)
      console.log(message.data);
    } else {
      console.log(message.data);
      // setIsChild(false)
      // setIsAdult(true)
    }
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const arrayBuffer = event.target.result;
      console.log(arrayBuffer);
      // const dataview = new DataView(arrayBuffer);
      // const answer = dataview.getFloat64(0);
      // console.log(answer);
    };
    setMessage(message.data);
  };
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <HomeHeader />
      {isChild ? <Kids /> : null}
      {isAdult ? <GeneralView /> : null}
    </React.Fragment>
  );
}

export default Home;
