import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
const useStyless = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    "& > *": {
      margin: theme.spacing(1),

      height: theme.spacing(7)
    }
  }
}));
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function Header() {
  const classes = useStyles();
  const classess = useStyless();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const signout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const user = auth.currentUser;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 60,
        flex: 1
      }}
    >
      <MenuIcon style={{ flex: 0.1 }} />
      <img
        src="https://help.apple.com/assets/5E3B080B680CE2E26A213BA9/5E3B0812680CE2E26A213BB1/en_US/e4dbb8e240d50cf30bab73b272a3760b.png"
        alt=""
        style={{ height: 40, width: 40, objectFit: "contain" }}
      />
      <div style={{ display: "flex", flexDirection: "row", flex: 0.2 }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: 30,
            marginLeft: 10,
            opacity: 0.5
          }}
        >
          Jmail
        </p>
      </div>
      <div className={classess.root}>
        <Paper
          elevation={2}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            borderRadius: 10
          }}
        >
          <SearchIcon style={{ opacity: 0.5, paddingLeft: 10 }} />
          <textarea
            style={{
              marginLeft: 5,
              flex: 1,
              outline: "none",

              height: 20,
              resize: "none",
              border: "none",
              padding: 6,
              fontSize: 16,
              fontWeight: "bold",
              opacity: 0.7
            }}
            placeholder="Search mail"
          />
        </Paper>
      </div>
      <div style={{ flex: 0.2 }}></div>

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",

          alignItems: "center",

          flex: 0.2,
          justifyContent: "space-between"
        }}
      >
        <div style={{ cursor: "pointer" }} className={classes.root}>
          <Avatar
            onClick={handleClick}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        </div>
        <SettingsIcon />
        <AppsIcon />
        <HelpIcon />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div
          style={{
            height: 350,
            width: 300,
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          <div>
            <Avatar
              onClick={handleClick}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
          </div>
          <Typography>{user?.displayName}</Typography>
          <Typography>{user?.email}</Typography>
          <div>
            <Button variant="contained" onClick={signout}>
              Signout
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
