import React from "react";
import "./App.css";
import BrushTeethVideo from "./Components/Kids/BrushTeethVideo";
import Home from "./Pages/Home";

function App() {
  return (
    <React.Fragment>
      <Home />
      <BrushTeethVideo />
      <Effect />
    </React.Fragment>
  );
}

export default App;
