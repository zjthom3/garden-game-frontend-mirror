import React from "react";
import {
  FormControl,
  TextField,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Register from "../components/Register";

const LoginPage = () => {
  return (
    // grid container, holds grid items
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            required={true}
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
            placeholder="Password"
            variant="outlined"
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Login</Button>
      </Grid>
      <Grid item xs={12}>
        <Register />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
