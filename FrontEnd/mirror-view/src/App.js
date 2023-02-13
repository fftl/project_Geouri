import React from "react";
import "./App.css";
import HomeHeader from "./Components/HomeHeader/HomeHeader";
import Socket from "./Components/Util/Socket";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Kids from "./Pages/Kids";
import GeneralView from "./Pages/GeneralView";
<<<<<<< HEAD
import Slideshow from "./Elements/Slideshow";
import SparkleEffect from "./Elements/SparkleEffect";
import Rule from "./Components/Kids/Rule";
import KidsLevel from "./Components/Kids/KidsLevel";
=======
>>>>>>> 9157006f1d7abf2d3d92bfc32373b0c4a5d4b207

function App() {
  // 어플리케이션의 최상위에서 websocket 실행
  const webSocket = new WebSocket("ws://localhost:9998");

  return (
    <React.Fragment>
      {/* Socket 컴포넌트에서 socket관련 함수 실행 */}
      <Socket webSocket={webSocket}></Socket>
      <HomeHeader />
      {/* React-Router */}
      <Routes>
        {/* 기본화면 */}
        <Route path="/" element={<Home />} />
        {/* 아이모드 */}
        <Route path="/kids" element={<Kids webSocket={webSocket} />} />
        {/* 일반모드 */}
        <Route
          path="/general"
          element={<GeneralView webSocket={webSocket} />}
        />
      </Routes>
    </React.Fragment>
<<<<<<< HEAD
=======
    // <Rule />
>>>>>>> 9157006f1d7abf2d3d92bfc32373b0c4a5d4b207
  );
}

export default App;
