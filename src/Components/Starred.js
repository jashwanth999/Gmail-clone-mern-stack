import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import "../styles.css";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
import axios from "../Auth/axios";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import InboxView from "./Starredview";

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
export default function Starred() {
  const classes = useStyles();
  const [star, setstar] = useState([]);
  const user = auth.currentUser;
  useEffect(() => {
    axios.get("/fav").then((res) => setstar(res.data));
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
                StarIcon
              >
                <ChevronRightIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {star?.map((val) =>
            val.userid === user.uid ? (
              <InboxView
                id={val._id}
                fromname={val.fromname}
                subject={val.subject}
                messagebox={val.message}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}
