import React, { useState } from "react";
import "./Slideshow.css";

const Slideshow = () => {
  const [activeindex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    let count = carouselData.length;
    if (newIndex < 0) {
      newIndex = count - 1;
    } else if (newIndex >= count) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">1</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide1.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">2</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide2.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">3</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide3.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">4</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide4.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">5</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide5.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">6</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide6.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">7</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide7.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">8</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide8.gif"} />
          </div>
        </div>
      </div>
      <div className="slideshow-container">
        <div className="mySlides-fade">
          <div className="fade">
            <div className="numbertext">9</div>
            <img src={process.env.PUBLIC_URL + "/images/guide/guide9.gif"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;
