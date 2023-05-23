import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { IconWorldDownload } from "@tabler/icons-react";
import ReactEcharts from "echarts-for-react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";

const App = () => {
  const [data, setData] = React.useState<any>(null);
  const [cityName, setCityName] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isCelcius, setIsCelcius] = React.useState(true);

  const handleSubmit = () => {
    setIsError(false);
    setIsLoading(true);
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=10b2840a301f4d74bb071309232305&q=" +
          cityName +
          "&days=7&aqi=yes&alerts=yes"
      )
      .then((response) => {
        setIsLoading(false);
        setData(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
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

  if (data == null) {
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
        data!.forecast.forecastday[0].day.avgtemp_c,
        data!.forecast.forecastday[1].day.avgtemp_c,
        data!.forecast.forecastday[2].day.avgtemp_c,
        data!.forecast.forecastday[3].day.avgtemp_c,
        data!.forecast.forecastday[4].day.avgtemp_c,
        data!.forecast.forecastday[5].day.avgtemp_c,
        data!.forecast.forecastday[6].day.avgtemp_c,
      ];
    } else {
      scale = "°F";
      tempdata = [
        data!.forecast.forecastday[0].day.avgtemp_f,
        data!.forecast.forecastday[1].day.avgtemp_f,
        data!.forecast.forecastday[2].day.avgtemp_f,
        data!.forecast.forecastday[3].day.avgtemp_f,
        data!.forecast.forecastday[4].day.avgtemp_f,
        data!.forecast.forecastday[5].day.avgtemp_f,
        data!.forecast.forecastday[6].day.avgtemp_f,
      ];
    }
    options = {
      xAxis: {
        type: "category",
        data: days,
      },
      yAxis: {
        type: "value",
        name: "°C",
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
      <Grid container spacing={2}>
        <Grid item xl={12} md={12} xs={12}>
          <Paper className="min-h-[9rem] flex justify-center items-center">
            Your favourited cities will appear here!
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
                onClick={() => handleSubmit()}
              >
                <IconWorldDownload />
              </Button>
            </Tooltip>
          </Paper>
          <Paper className="h-[28rem]">
            {data == null ? (
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
                <div className="text-center flex flex-row items-center ml-[-20px]">
                  <img
                    src={data.current.condition.icon}
                    className="w-[40px] h-[40px]"
                  />
                  <p className="font-thin">
                    {data.location.name + ", " + data.location.country}
                  </p>
                </div>
                <Tooltip title="Click to switch scales">
                  <div
                    className="flex w-40 h-20 m-5 text-6xl justify-center items-center hover:cursor-pointer"
                    onClick={() => {
                      setIsCelcius(!isCelcius);
                    }}
                  >
                    {isCelcius
                      ? data.current.temp_c + "°C"
                      : data.current.temp_f + "°F"}
                  </div>
                </Tooltip>
                <div className="flex flex-col gap-2 w-full">
                  <p className="border-b-2 border-fuchsia-300 h-16 w-full flex items-center text-lg opacity-70">
                    Pressure: {data.current.pressure_mb}hPa
                  </p>
                  <p className="border-b-2 border-fuchsia-300 h-16 w-full flex items-center text-lg opacity-70 ">
                    Humidity: {data.current.humidity}%
                  </p>
                  <p className="border-b-2 border-fuchsia-300 h-16 w-full flex items-center text-lg opacity-70">
                    Wind: {data.current.wind_kph}km/h
                  </p>
                  <p className="w-full flex items-center text-sm justify-center opacity-70">
                    Last updated: {data.current.last_updated}
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
