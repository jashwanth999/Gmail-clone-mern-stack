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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#11DBEA"
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const signin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth.currentUser;
        history.push("/inbox");
      })
      .then(() => {
        setemail("");
        setpassword("");
      })
      .catch((error) => alert(error.message));
  };

  /*const useridpush = () => {
    history.push(`/Chat/${user?.uid}/:roomid`);
  };*/

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
          variant="h5"
          style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
        >
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signin}
          >
            Sign In
          </Button>
          <Grid container style={{ marginBottom: 10 }}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => history.push("/signup")}
                style={{ cursor: "pointer" }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
