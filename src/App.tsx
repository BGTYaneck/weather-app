import * as React from "react";
import { IconWorldDownload } from "@tabler/icons-react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";

const App = () => {
  const [data, setData] = React.useState(null);
  const [cityName, setCityName] = React.useState(null);

  const handleSubmit = () => {
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=10b2840a301f4d74bb071309232305&q=" +
          cityName +
          "&days=1&aqi=yes&alerts=yes"
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          <Paper className="h-[28rem] ">
            {data == null ? (
              <p className="flex justify-center p-5">No location selected...</p>
            ) : (
              <div className="w-full h-full flex flex-col items-center p-5">
                <p className="font-thin">
                  {data.location.name + ", " + data.location.country}
                </p>
                <div className="flex w-40 h-20 m-5 text-6xl justify-center items-center font-thin">
                  {data.current.temp_c + "°C"}
                </div>
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
                  {/* <p className="border-b-2 h-16 w-full flex items-center text-xl opacity-70">
                    <img src={data.current.condition.icon} />
                    {data.current.condition.text}
                  </p> */}
                </div>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xl={9} md={8} xs={12}>
          <Paper className="flex h-[34rem] justify-center items-center">
            Graph
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
