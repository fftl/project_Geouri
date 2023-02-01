import axios from 'axios';
import "./WeatherView.css";
import cloudy from "../assets/weatherIcons/001-cloud.png";
import rainy from "../assets/weatherIcons/003-rainy.png";
import snowy from "../assets/weatherIcons/006-snowy.png";
import storm from "../assets/weatherIcons/009-storm-1.png";
import drop from "../assets/weatherIcons/028-drop.png";
import sun from "../assets/weatherIcons/039-sun.png";
import windy from "../assets/weatherIcons/010-windy.png";
import foggy from "../assets/weatherIcons/017-foog.png";
import tornado from "../assets/weatherIcons/046-tornado.png";
import React, { useState } from "react";

const dateBuilder = (d) => {
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let days = ["일", "월", "화", "수", "목", "금", "토"];
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let date = d.getDate();
  return `${year}/${month}/${date} (${day})`;
};

const clockBuilder = (d) => {
  let hour = d.getHours();
  if (hour < 10){
    hour = '0'+String(hour)
  }
  let minute = d.getMinutes();
  if (minute < 10) {
    minute = '0' + String(minute);
  }
  return `${hour}:${minute}`;
}

function WeatherView() {
  const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "http://api.openweathermap.org/data/2.5/",
  };
  // 위치정보는 mock data
  const [lat, lon] = [37, 127];

  const url = `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`;
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  
  axios({
    method:'get',
    url: url,
  }).then((res) => {
    setTemp((res.data.main.temp - 237.15).toFixed(2))
    const w = String(res.data.weather[0].id)[0];
    // 추후 weather id에 따라 구체화 해야함
    if(w === '2'){
      setWeather("천둥");
      setIcon(storm);
    }else if (w === '3') {
      setWeather("비 조금");
      setIcon(drop);
    }else if (w === '5') {
      setWeather("비");
      setIcon(rainy)
    }else if (w === '6') {
      setWeather("눈");
      setIcon(snowy);
    }else if (w === '7') {
      if(res.data.weather[0].id === 701 || res.data.weather[0].id === 741){
        setWeather("안개");
        setIcon(foggy);
      }else if(res.data.weather[0].id === 781){
        setWeather("토네이도");
        setIcon(tornado);
      }else {
        setWeather("흐림");
        setIcon(cloudy);
      }
    }else if (w === '8') {
      if (res.data.weather[0].id === 800) {
        // if (res.data.weather[0].main === 800) {
        setWeather("맑음");
        setIcon(sun);
      }else {
        setWeather("흐림");
        setIcon(windy)
      }
    }
  }).catch((err) => {
    console.log(err)
  })



  return (
    <div className='weatherView'>
      <div className='clock'>
        <h2>{dateBuilder(new Date())}</h2>
        <h2>{clockBuilder(new Date())}</h2>
      </div>
      <div className='weather'>
        <div>
        {icon? 
          <img className='weather-icon' src={icon} alt="weather-icon"/>:
          null
        }
        </div>
        <div>
          <h2 className='weather-desc'>{weather}</h2>
        </div>
        <div>
          <h2 className='temp-desc'>{temp}℃</h2>
        </div>
      </div>
    </div>
  );
}

export default WeatherView;
