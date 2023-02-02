import React from "react";
import "./App.css";
import HomeHeader from "./Components/HomeHeader/HomeHeader";
import BrushTeethVideo from "./Components/Kids/BrushTeethVideo";
import Socket from "../Util/Socket";
import Home from "./Pages/Home";
import { Routes, Route } from 'react-router-dom'; 
import Kids from "./Pages/Kids";
import GeneralView from "./Pages/GeneralView";

function App() {
  return (
    <React.Fragment>
      <Socket />
      <HomeHeader />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/kids" element={<Kids />}/>
        <Route path="/general" element={<GeneralView />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
