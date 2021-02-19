import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import axios from "./axios.js";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#11DBEA"
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const d = new Date();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const Signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
          Email: email,
          password: password
        });
      })

      .then(() => {
        const user = auth.currentUser;
        axios.post("/users", {
          _id: user.uid,
          username: username,
          email: email,
          password: password
        });
      })
      .then(() => {
        history.push("/");
        setusername("");
        setemail("");
        setpassword("");
      })

      .catch((error) => alert(error.message));
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="login"
      style={{ backgroundColor: "white", borderRadius: 10 }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src="https://help.apple.com/assets/5E3B080B680CE2E26A213BA9/5E3B0812680CE2E26A213BB1/en_US/e4dbb8e240d50cf30bab73b272a3760b.png"
          alt=""
          style={{ height: 50, width: 50, objectFit: "contain", marginTop: 10 }}
        />
        <Typography
          component="h1"
          style={{ color: "black", fontWeight: "bold" }}
        >
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Firstname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Username"
                autoFocus
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ color: "white" }}
            className={classes.submit}
            onClick={Signup}
          >
            Sign Up
          </Button>
          <Grid container style={{ marginBottom: 10 }} justify="flex-end">
            <Grid item>
              <Link
                onClick={() => history.push("/")}
                style={{ cursor: "pointer" }}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
