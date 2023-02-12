import React from "react";

function Home() {
  function webcam () {
    window.init();
  }
  return (
    <React.Fragment>
      <button onClick={webcam}>d</button>
    </React.Fragment>
  );
}

export default Home;
