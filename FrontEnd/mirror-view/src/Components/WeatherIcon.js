import { MaterialCommunityIcons } from "@expo/vector-icons";

const WeatherIcon = ({ data }) => {
  const id = data.weather[0].id;
  const weather =
    id === 800 ? WeatherGroup[0] : WeatherGroup[parseInt(id / 100)];
  return (
    <div>
      <MaterialCommunityIcons size={150} name={weather.icon} />
    </div>
  );
};

const WeatherGroup = {
  0: {
    icon: "weather-sunny",
  },
  2: {
    icon: "weather-lightning",
  },
  3: {
    icon: "weather-rainy",
  },
  5: {
    icon: "weather-pouring",
  },
  6: {
    icon: "weather-snowy",
  },
  7: {
    icon: "weather-fog",
  },
  8: {
    icon: "weather-cloudy",
  },
};

export default WeatherIcon;
