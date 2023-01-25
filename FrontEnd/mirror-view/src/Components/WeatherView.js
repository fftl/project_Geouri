import axios from "axios";
import React, { useState } from "react";

const api = {
  key: "***REMOVED***",
  base: "http://api.openweathermap.org/data/2.5/",
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
function WeatherView() {
  const city = "Seoul";
  const url = `${api.base}weather?q=${city}&appid=${api.key}`;
  const [weather, setWeather] = useState("");
  axios.get(url).then((responseData) => {
    const data = responseData.data;
    setWeather({
      id: data.weather[0].id,
      temperature: data.main.temp,
      main: data.weather[0].main,
      loading: false,
    });
  });

  return (
    <div>
      <h1>{city}</h1>
      <h2>{(weather.temperature - 273.15).toFixed(2)}</h2>
      <h2>{dateBuilder(new Date())}</h2>
    </div>
  );
}

export default WeatherView;
