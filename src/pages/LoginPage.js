import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import {
  FormControl,
  TextField,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Register from "../components/Register";
import getWeather from "../api/WeatherApi";



const LoginPage = (props) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    getWeather(props.userCity, props.userState).then(json => {
      setWeather(json);
    })
    }, [props.userCity, props.userState]);
    




  return (
    // grid container, holds grid items 
    <Grid container spacing={1} align="center" className="container">
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          Login
        </Typography> 
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            required={true}
            label="Username"
            placeholder="Username"
            variant="outlined"
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            required={true}
            type="password"
            label="Password"
            placeholder="Password"
            variant="outlined"
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button htmlType="submit" variant="contained" color="primary">
          Login
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* register component */}
        <Register />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
