import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import RefreshIcon from "@material-ui/icons/Refresh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import InboxView from "./Sentboxview";
import Paper from "@material-ui/core/Paper";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
import axios from "../Auth/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 15
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
export default function Inbox() {
  const classes = useStyles();
  const [inbox, setinbox] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    axios.get(`/users/${user?.uid}`).then((res) => {
      setinbox(res.data.sentbox);
    });
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
                style={{ justifyContent: "space-between" }}
              >
                <CheckBoxOutlineBlankIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
                style={{ justifyContent: "space-between" }}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
                style={{ justifyContent: "space-between" }}
              >
                <MoreVertIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
              >
                <ChevronRightIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {inbox?.map((val) => (
            <InboxView
              id={val._id}
              toname={val.toname}
              subject={val.subject}
              messagebox={val.messagebox}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
