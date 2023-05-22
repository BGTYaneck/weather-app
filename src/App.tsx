import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const App = () => {
  return (
    <Box sx={{ flexGrow: 1 }} className="p-8">
      <Grid container spacing={2}>
        <Grid item xl={12} md={12} xs={12}>
          <Paper className="min-h-[9rem] flex justify-center items-center">
            Your favourited cities will appear here!
          </Paper>
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <Paper className="flex h-[34rem] justify-center items-center">
            Search bar & data
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
