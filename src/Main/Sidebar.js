import React, { useState, useEffect } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import LinkIcon from "@material-ui/icons/Link";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import { useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import axios from "../Auth/axios";
import Avatar from "@material-ui/core/Avatar";
import { auth } from "../Auth/firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1.5),
    backgroundColor: "white",
    borderRadius: 30
  },
  button1: {
    margin: theme.spacing(0.2),
    backgroundColor: "#D7DBDD",
    borderRadius: 20,
    width: "100%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  root2: {
    display: "flex",
    flexWrap: "wrap",
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    right: 0,

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(75),
      height: theme.spacing(70)
    }
  },
  root3: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  root4: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Sidebar() {
  const user = auth.currentUser;
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dis, setdis] = useState(false);
  const [value, setvalue] = useState("");
  const [userid, setuserid] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  const [username, setusername] = useState("");
  const [opens, setOpen] = React.useState(false);

  const handleClickv = () => {
    setOpen(true);
  };

  const handleClosev = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const details = (ide) => {
    try {
      axios.get(`/users/${ide}`).then((res) => setusername(res.data.username));
    } catch (error) {
      console.log(error);
    }
  };

  const d = new Date();

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [uses, setusers] = useState([]);
  useEffect(() => {
    axios.get("/users").then((res) => setusers(res.data));
  }, []);
  const update = () => {
    try {
      axios.put("/inbox", {
        _id: userid,
        inbox: [
          {
            fromname: user.displayName,
            frommail: user.email,
            subject: subject,
            messagebox: message,
            userid: user.uid,
            timestamp: d.getHours() + ":" + d.getMinutes()
          }
        ]
      });
    } catch (err) {}
    try {
      axios
        .put("/sentbox", {
          _id: user.uid,
          sentbox: [
            {
              toname: username,
              tomail: value,
              subject: subject,
              messagebox: message,
              userid: user.uid,
              timestamp: d.getHours() + ":" + d.getMinutes()
            }
          ]
        })
        .then(() => {});
    } catch (err) {
      console.log(err);
    }
    handleClickv();
    setsubject("");
    setvalue("");
    setmessage("");
    setdis(false);
  };
  return (
    <div
      style={{
        flex: 0.3,
        backgroundColor: "white",
        flexDirection: "column"
      }}
    >
      <div className={classes.root}>
        <Snackbar open={opens} autoHideDuration={3000} onClose={handleClosev}>
          <Alert onClose={handleClosev} severity="success">
            Message sent sucessfully
          </Alert>
        </Snackbar>
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
        {uses.map((k) =>
          k.email.includes(value) && k.email !== user.email ? (
            <div
              onClick={() => {
                setvalue(k.email);
                setuserid(k._id);
                details(k._id);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <Avatar style={{ margin: 6 }} />
              <Typography style={{ margin: 6 }}>{k.email}</Typography>
            </div>
          ) : (
            ""
          )
        )}
      </Popover>
      <div></div>
      <Button
        onClick={() => setdis(true)}
        variant="contained"
        size="large"
        className={classes.button}
        startIcon={
          <AddIcon style={{ color: "red", padding: 5, fontSize: 30 }} />
        }
      >
        <span style={{ color: "black", padding: 5 }}>Compose</span>
      </Button>

      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button1
            selected={selectedIndex === 0}
            onClick={(event) => {
              event.preventDefault();

              handleListItemClick(event, 0);
              history.push("/inbox");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => {
              event.preventDefault();

              handleListItemClick(event, 1);
              history.push("/starred");
            }}
          >
            <ListItemIcon>
              <StarBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <WatchLaterIcon />
            </ListItemIcon>
            <ListItemText primary="Snoozed" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => {
              event.preventDefault();

              handleListItemClick(event, 3);
              history.push("/sentbox");
            }}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="sent" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </div>
      <div
        style={{ display: dis ? "block" : "none" }}
        className={classes.root2}
      >
        <Paper elevation={3}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: 1,
                height: 30,
                backgroundColor: "#566573",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                display: "flex",
                alignItems: "center"
              }}
            >
              <p style={{ color: "white", marginLeft: 5, fontSize: 17 }}>
                New message
              </p>
              <CloseIcon
                onClick={() => setdis(false)}
                style={{
                  color: "white",
                  padding: 5,
                  fontSize: 22,
                  position: "absolute",
                  right: 5,
                  cursor: "pointer",
                  opacity: 0.7
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                height: 30,
                alignItems: "center",
                borderBottom: "0.4px solid lightgray"
              }}
            >
              <p style={{ marginLeft: 5 }}>TO</p>
              <input
                type="email"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                onClick={handleClick}
                style={{
                  flex: 1,
                  outline: "none",
                  borderBottom: "none",
                  height: 30,
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 10,
                  opacity: 0.5,
                  border: "none"
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                height: 30,
                alignItems: "center",
                borderBottom: "0.4px solid lightgray"
              }}
            >
              <p style={{ marginLeft: 5 }}>Subject</p>
              <input
                type="text"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
                style={{
                  flex: 1,
                  outline: "none",
                  borderBottom: "none",
                  height: 30,
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 10,
                  opacity: 0.5,
                  border: "none"
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                height: 40,
                flex: 1,
                display: "flex",
                flexDirection: "row"
              }}
            >
              <div
                style={{
                  flex: 0.3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: 2
                }}
              >
                <Button onClick={update} variant="contained" color="primary">
                  send
                </Button>
                <TextFormatIcon style={{ margin: 2, cursor: "pointer" }} />
                <AttachFileIcon style={{ margin: 2, cursor: "pointer" }} />
                <LinkIcon style={{ margin: 2, cursor: "pointer" }} />
                <EmojiEmotionsIcon style={{ margin: 2, cursor: "pointer" }} />
                <ImageIcon style={{ margin: 2, cursor: "pointer" }} />
              </div>
            </div>
            <DeleteIcon
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                cursor: "pointer"
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <textarea
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                style={{
                  height: 356,
                  resize: "none",
                  outline: "none",
                  border: "none",
                  fontWeight: "bold"
                }}
              ></textarea>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
