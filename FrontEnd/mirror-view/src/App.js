import React from "react";
import "./App.css";
import HomeHeader from "./Components/HomeHeader/HomeHeader";
import Socket from "./Components/Util/Socket";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Kids from "./Pages/Kids";
import GeneralView from "./Pages/GeneralView";
import Slideshow from "./Elements/Slideshow";
import Rule from "./Components/Kids/Rule";
import SparkleEffect from "./Elements/SparkleEffect";

function App() {
  // 어플리케이션의 최상위에서 websocket 실행
  const webSocket = new WebSocket("ws://localhost:9998");

  return (
    // <React.Fragment>
    //   {/* Socket 컴포넌트에서 socket관련 함수 실행 */}
    //   <Socket webSocket={webSocket}></Socket>
    //   <HomeHeader />
    //   {/* React-Router */}
    //   <Routes>
    //     {/* 기본화면 */}
    //     <Route path="/" element={<Home />} />
    //     {/* 아이모드 */}
    //     <Route path="/kids" element={<Kids webSocket={webSocket} />} />
    //     {/* 일반모드 */}
    //     <Route
    //       path="/general"
    //       element={<GeneralView webSocket={webSocket} />}
    //     />
    //   </Routes>
    // </React.Fragment>
    // <Rule />
    <SparkleEffect />
  );
}

export default App;
