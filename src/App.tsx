import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  IconStar,
  IconWorldDownload,
  IconStarFilled,
} from "@tabler/icons-react";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Fav from "./components/Fav";

const App = () => {
  const [favourites, setFavourites] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("weather")!) ?? []
  );
  const [weatherData, setWeatherData] = React.useState<any>(null);
  const [isCelcius, setIsCelcius] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cityName, setCityName] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("weather", JSON.stringify(favourites));
  }, [favourites]);

  const handleSubmit = (city: string) => {
    setIsError(false);
    setIsLoading(true);
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=10b2840a301f4d74bb071309232305&q=" +
          city +
          "&days=7&aqi=yes&alerts=yes"
      )
      .then((response) => {
        setIsLoading(false);
        setWeatherData(response.data);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const addToFavourites = (cityName: string) => {
    let newArr = [...favourites];
    if (newArr.length == 6) {
      setOpen(true);
    } else {
      newArr.push(cityName);
      setFavourites(newArr);
    }
  };

  const removeFromFavourites = (cityName: string) => {
    let newArr = [...favourites];
    newArr = newArr.filter((city) => city != cityName);
    setFavourites(newArr);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let options = {};
  let tempdata;
  let scale;

  let i = 1;
  let j = 0;
  let days: string[] = [];
  while (i < 8) {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + i);
    let date = tomorrow.getDate() + ".";
    tomorrow.getMonth() < 9
      ? (date = date + "0" + (tomorrow.getMonth() + 1))
      : +(tomorrow.getMonth() + 1);
    days[j] = date;
    i++;
    j++;
  }

  if (weatherData == null) {
    options = {
      xAxis: {
        type: "category",
        data: days,
      },
      yAxis: {
        type: "category",
        data: ["-10", "-5", "0", "5", "10", "15"],
      },
      series: [
        {
          data: [],
          type: "line",
          smooth: true,
        },
      ],
    };
  } else {
    if (isCelcius) {
      scale = "°C";
      tempdata = [
        weatherData!.forecast.forecastday[0].day.avgtemp_c,
        weatherData!.forecast.forecastday[1].day.avgtemp_c,
        weatherData!.forecast.forecastday[2].day.avgtemp_c,
        weatherData!.forecast.forecastday[3].day.avgtemp_c,
        weatherData!.forecast.forecastday[4].day.avgtemp_c,
        weatherData!.forecast.forecastday[5].day.avgtemp_c,
        weatherData!.forecast.forecastday[6].day.avgtemp_c,
      ];
    } else {
      scale = "°F";
      tempdata = [
        weatherData!.forecast.forecastday[0].day.avgtemp_f,
        weatherData!.forecast.forecastday[1].day.avgtemp_f,
        weatherData!.forecast.forecastday[2].day.avgtemp_f,
        weatherData!.forecast.forecastday[3].day.avgtemp_f,
        weatherData!.forecast.forecastday[4].day.avgtemp_f,
        weatherData!.forecast.forecastday[5].day.avgtemp_f,
        weatherData!.forecast.forecastday[6].day.avgtemp_f,
      ];
    }
    options = {
      xAxis: {
        type: "category",
        data: days,
      },
      yAxis: {
        type: "value",
        name: "Weather forecast (" + scale + ")",
      },
      series: [
        {
          data: tempdata,
          type: "line",
          smooth: true,
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    };
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="p-8">
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="You can only add 6 favourites!"
      />
      <Grid container spacing={2}>
        <Grid item xl={12} md={12} xs={12}>
          <Paper className="min-h-[9rem] flex flex-row flex-wrap overflow-hidden">
            {favourites.length == 0 ? (
              <p className="w-full h-full opacity-50 text-center mt-2">
                Your favourited cities will appear here!
              </p>
            ) : (
              <Grid container spacing={0}>
                {favourites.map((city, i) => {
                  return (
                    <Fav
                      key={i}
                      cityName={city}
                      scale={isCelcius}
                      list={favourites}
                      setParentData={() => {
                        handleSubmit(city);
                      }}
                    />
                  );
                })}
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <Paper className="flex h-[5rem] p-3 gap-3 mb-[1rem]">
            <TextField
              label="Enter a city name"
              variant="outlined"
              className="w-full"
              //@ts-ignore
              onChange={(e) => setCityName(e.target.value)}
            />
            <Tooltip title="Search...">
              <Button
                variant="contained"
                className="h-14"
                onClick={() => handleSubmit(cityName!)}
              >
                <IconWorldDownload />
              </Button>
            </Tooltip>
          </Paper>
          <Paper className="h-[28rem]">
            {weatherData == null ? (
              <p className="flex justify-center p-5">No location selected...</p>
            ) : isLoading ? (
              <div className="flex justify-center items-center h-full w-full">
                <CircularProgress />
              </div>
            ) : isError ? (
              <div className="flex justify-center items-center h-full w-full text-center text-red-600">
                Error! Looks like we couldn't find your desired location. Please
                try again!
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center p-5 ">
                <div className="text-center flex flex-row items-center ml-[-20px] gap-2">
                  <img
                    src={weatherData.current.condition.icon}
                    className="w-[40px] h-[40px]"
                  />
                  <p className="font-thin">
                    {weatherData.location.name +
                      ", " +
                      weatherData.location.country}
                  </p>
                  {favourites.includes(weatherData.location.name) ? (
                    <Tooltip title="Remove from favourites">
                      <IconStarFilled
                        className="text-yellow-500 hover:cursor-pointer"
                        onClick={() =>
                          removeFromFavourites(weatherData.location.name)
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add to favourites">
                      <IconStar
                        className="text-yellow-500 hover:cursor-pointer"
                        onClick={() =>
                          addToFavourites(weatherData.location.name)
                        }
                      />
                    </Tooltip>
                  )}
                </div>
                <Tooltip title="Click to switch scales">
                  <div
                    className="flex w-40 h-20 m-5 text-6xl justify-center items-center hover:cursor-pointer"
                    onClick={() => {
                      setIsCelcius(!isCelcius);
                    }}
                  >
                    {isCelcius
                      ? weatherData.current.temp_c + "°C"
                      : weatherData.current.temp_f + "°F"}
                  </div>
                </Tooltip>
                <div className="flex flex-col gap-2 w-full">
                  <p className="border-b-2 border-fuchsia-300 h-16 w-full flex items-center text-lg opacity-70">
                    Pressure: {weatherData.current.pressure_mb}hPa
                  </p>
                  <p className="border-b-2 border-fuchsia-300 h-16 w-full flex items-center text-lg opacity-70 ">
                    Humidity: {weatherData.current.humidity}%
                  </p>
                  <p className="border-b-2 border-fuchsia-300 h-16 w-full flex items-center text-lg opacity-70">
                    Wind: {weatherData.current.wind_kph}km/h
                  </p>
                  <p className="w-full flex items-center text-sm justify-center opacity-70">
                    Last updated: {weatherData.current.last_updated}
                  </p>
                </div>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xl={9} md={8} xs={12}>
          <Paper className="flex h-[34rem]">
            {isLoading ? (
              <div className="flex justify-center items-center h-full w-full">
                <CircularProgress />
              </div>
            ) : (
              <ReactEcharts
                option={options}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
