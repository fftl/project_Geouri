import axios from 'axios';
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;


const api = {
  key: '69uzLTxIhDhe0%2B7h1abUTcvqeldVAy3%2F7YKCfz40fXd3Ryi66MqoOW9zKkQb8hNl0As20EIqaKg0rEUmc6dk%2FA%3D%3D',
  base: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst0",
};

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
  return `${year}/${month}/${date}/${day}`;
};

const today = new Date();

function WeatherView() {
  const [clock, setClock] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    // 시간
    const Clock = setInterval(() => {
      const time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      if ( hours < 10 ) {
        hours = '0'+String(hours)
      }
      if (minutes < 10) {
        minutes = '0'+String(minutes)
      }
      setClock(hours + ' : ' + minutes)
    }, 1000);
    
    return () => {
      clearInterval(Clock);
    }
  })
  //TODO : 날씨 api 받아오기 , 
  const month = () => {
    if (today.getMonth()+1 < 10) {
      return '0'+ String(today.getMonth()+1)
    }
    return today.getMonth()+1
  }
  const date = () => {
    if (today.getDate() < 10) {
      return '0'+ String(today.getDate())
    }
    return today.getDate()
  }

  axios({
    method:'get',
    url: api.base,
    withCredentials: true,
    data: {
      serviceKey: api.key,
      pageNo: 1,
      numOfRows: 1000,
      dataType: 'JSON',
      base_date: `${today.getFullYear()}${month()}${date()-1}`,
      base_time: `0500`,
      // mock data 
      nx: 37,
      ny: 127
    }
  }
  ).then((res) => {
    console.log(res);
    setWeather(res.data)
  }).catch((err) => {
    console.log(err)
  })
  // axios.get(url).then((responseData) => {
  //   const data = responseData.data;
  //   console.log(data)
  //   // setWeather({
  //   //   id: data.weather[0].id,
  //   //   temperature: data.main.temp,
  //   //   main: data.weather[0].main,
  //   //   loading: false,
  //   // });
  
  // );

  return (
    <>
      <div>
        <h1>날짜시간</h1>
        <h2>{dateBuilder(new Date())}</h2>
        <h2>{clock}</h2>
      </div>
      <div>
        <h1>날씨</h1>
        <h2>{(weather.temperature - 273.15).toFixed(2)}</h2>
      </div>
    </>
  );
}

export default WeatherView;
