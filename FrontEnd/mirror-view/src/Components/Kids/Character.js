import React from "react";
import "./Character.css";

const Character = () => {
  return (
    <div id="main">
      <div id="monster">
        <div id="monster_head"></div>
        <div id="monster_face"></div>
        <div id="monster_eyes">
          <div id="monster_eye"></div>
          <div id="eye_shadow"></div>
          <div id="monster_eye"></div>
          <div id="eye_shadow"></div>
        </div>
        <div id="face_bottom">
          <div id="blur_left"></div>
          <div id="mouth"></div>
          <div id="blur_right"></div>
        </div>
      </div>
    </div>
  );
};

export default Character;
