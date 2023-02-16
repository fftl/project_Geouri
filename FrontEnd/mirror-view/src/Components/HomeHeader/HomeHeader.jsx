import "./HomeHeader.css";
import cloudy from "../../assets/weatherIcons/001-cloud.png";
import rainy from "../../assets/weatherIcons/003-rainy.png";
import snowy from "../../assets/weatherIcons/006-snowy.png";
import storm from "../../assets/weatherIcons/009-storm-1.png";
import drop from "../../assets/weatherIcons/028-drop.png";
import sun from "../../assets/weatherIcons/039-sun.png";
import windy from "../../assets/weatherIcons/010-windy.png";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";


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
    if(date < 10){
      date = '0'+String(date)
    }
    return `${year}/${month}/${date} (${day})`;
  };
  

function HomeHeader() {
    const api = {
        key: process.env.REACT_APP_WEATHER_API_KEY,
        base: "http://api.openweathermap.org/data/2.5/",
      };

      const member = useSelector((state) => state?.mirror?.member);
      const lat = Math.round(member?.region?.lat * 100)/100;
      const lon = Math.round(member?.region?.lng * 100)/100;
    
      const url = `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`;
      const [temp, setTemp] = useState("");
      const [weather, setWeather] = useState("");
      const [icon, setIcon] = useState("");
      
      const [morning, setMorning] = useState("");
      const [hour, setHour] = useState("");
      const [minute, setMinute] = useState("");

      useEffect(() => {
        const time = setInterval(() => {
          const date = new Date();
          const h = date.getHours();
          if (h > 12) { 
            h -= 12
            setHour(h);
            setMorning("오후");
          }else{
            setHour(h);
            setMorning("오전")
          }
          const m = date.getMinutes();
          setMinute(m);
          }
        , 1000);
        return () => {
          clearInterval(time)
        }
      }, []);
      

      axios({
        method:'get',
        url: url,
      }).then((res) => {
        setTemp(((res.data.main.temp)-273.15).toFixed(1))
        const w = String(res.data.weather[0].id)[0];
        // 추후 weather id에 따라 구체화 해야함
        if(w === '2'){
          setWeather("천둥");
          setIcon(storm)
        }else if (w === '3') {
          setWeather("비 조금");
          setIcon(drop)
        }else if (w === '5') {
          setWeather("비");
          setIcon(rainy)
        }else if (w === '6') {
          setWeather("눈");
          setIcon(snowy)
        }else if (w === '7') {
          setWeather("흐림");
          setIcon(cloudy)
        }else if (w === '8') {
          if (res.data.weather[0].main === 800) {
            setWeather("맑음");
            setIcon(sun)
          }else {
            setWeather("흐림");
            setIcon(windy)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    
    
    
      return (
        <div className='header'>
          <div className='clock'>
            <p className='date'>{dateBuilder(new Date())}</p>
            {hour && minute && 
              <p className='time'>{morning} {`${hour}시`} {`${minute}분`}</p>
            }
          </div>
          {lat && lon ? 
            <div className='weather'>
              <div className='weather-address'>
                <p>{member?.region?.sidoName} {member?.region?.gugunName}</p>
                {/* <p>서울시 강남구</p> */}
              </div>
              <div className='weather-icon-box'>
                <img className='weather-icon' src={icon} alt="weather-icon"/>
                <div className="weather-text-box">
                  <p className="weather-temp">{temp}º</p>
                  <p className="weather-weather">{weather}</p>
                </div>
                  
              </div>
            </div>
              : 
              <div style={{fontSize: '2rem', margin: '4rem'}}>
                --
              </div>
          }
        </div>
      );
}

export default HomeHeader;