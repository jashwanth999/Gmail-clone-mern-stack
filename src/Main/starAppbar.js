import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArchiveIcon from "@material-ui/icons/Archive";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import { useHistory } from "react-router-dom";

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
  },
  root2: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0.6)
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
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white"
  }
}));
export default function SentAppbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            onClick={() => history.push("/starred")}
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ArchiveIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ReportIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <MarkunreadIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ScheduleIcon />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <MoveToInboxIcon />
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
    </div>
  );
}
