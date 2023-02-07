import React from "react";
import "./HeartEffect.css";

const HeartEffect = () => {
  const rainDiv = document.querySelector(".rain");
  const heart = document.createElement("div");

  console.log(heart);
  heart.classList.add("heart");

  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  rainDiv.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);

  return <div class="bg_heart"></div>;
};

export default HeartEffect;
