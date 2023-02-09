import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { current } from "@reduxjs/toolkit";

const Slideshow = (props) => {
  const { slideShowOff } = props;

  const Container = styled.div`
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    align-items: center;
  `;

  const StyledSlider = styled(Slider)`
    .slick-slide div {
      outline: none;
      width: 50vw;
      height: 50vh;
      margin: 5% auto;
      align-items: center;
    }
  `;

  const ImageContainer = styled.div`
    margin: 0 auto;
  `;

  const Image = styled.img`
    width: 50vw;
    height: 50vh;
  `;

  const items = [
    { id: 1, url: process.env.PUBLIC_URL + "/images/guide/guide1.gif" },
    { id: 2, url: process.env.PUBLIC_URL + "/images/guide/guide2.gif" },
    { id: 3, url: process.env.PUBLIC_URL + "/images/guide/guide3.gif" },
    { id: 4, url: process.env.PUBLIC_URL + "/images/guide/guide4.gif" },
    { id: 5, url: process.env.PUBLIC_URL + "/images/guide/guide5.gif" },
    { id: 6, url: process.env.PUBLIC_URL + "/images/guide/guide6.gif" },
    { id: 7, url: process.env.PUBLIC_URL + "/images/guide/guide7.gif" },
    { id: 8, url: process.env.PUBLIC_URL + "/images/guide/guide8.gif" },
    { id: 9, url: process.env.PUBLIC_URL + "/images/guide/guide9.gif" },
  ];
  const [isOver, setIsOver] = useState(false);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    afterChange: (currentSlide) => {
      const totalSlides = 9;
      if (currentSlide === totalSlides - 1) {
        setIsOver(true);
        slideShowOff();
      }
    },
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <ImageContainer>
                <Image src={item.url} />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
};

export default Slideshow;
