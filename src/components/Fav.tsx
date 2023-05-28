import React, { useEffect } from "react";
import axios from "axios";

type Props = {
  list: string[];
  cityName: string;
  scale: boolean;
};

const Fav = (props: Props) => {
  const [weatherData, setWeatherData] = React.useState<any>(null);

  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=10b2840a301f4d74bb071309232305&q=" +
          props.cityName +
          "&days=7&aqi=yes&alerts=yes"
      )
      .then((response) => {
        setWeatherData(response.data);
      });
    console.log(weatherData);
  }, [props.list]);

  return (
    <div className="w-1/6 border p-2 hover:bg-gray-100 hover:cursor-pointer">
      {weatherData ? (
        <div>
          <div className="flex">
            <p className="text-xl align-baseline">
              {weatherData.location.name}
            </p>
            <img
              src={weatherData.current.condition.icon}
              className="w-[30px] h-[30px] align-baseline"
            />
          </div>
          <div className="opacity-50 text-xs">
            <p>
              P: {weatherData.current.pressure_mb}hPa H:{" "}
              {weatherData.current.humidity}% W: {weatherData.current.wind_kph}
              km/h
            </p>
          </div>
          <div className="text-4xl mt-4">
            {props.scale
              ? weatherData.current.temp_c + "°C"
              : weatherData.current.temp_f + "°F"}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Fav;
