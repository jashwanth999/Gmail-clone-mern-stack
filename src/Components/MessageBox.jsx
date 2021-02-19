import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ForwardIcon from "@material-ui/icons/Forward";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ReplyIcon from "@material-ui/icons/Reply";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import SendIcon from "@material-ui/icons/Send";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { useParams } from "react-router-dom";
import axios from "../Auth/axios";
import { auth } from "../Auth/firebase";
import Appbar from "../Main/Appbar";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import LinkIcon from "@material-ui/icons/Link";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import Popover from "@material-ui/core/Popover";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  },
  root3: {
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
  }
}));
export default function MessageBox() {
  const [msgbox, setmsgbox] = useState([]);
  const classes = useStyles();
  //const history = useHistory();
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
            fromemail: user.email,
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
              toemail: value,
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
  const user = auth.currentUser;
  const { msgid } = useParams();
  useEffect(() => {
    try {
      axios.get(`/users/${user?.uid}`).then((res) => {
        setmsgbox(res.data.inbox);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Header />
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
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={classes.root}>
          <Appbar />
          {msgbox.map((k) =>
            k._id === msgid ? (
              <div
                style={{
                  overflowY: "scroll",
                  height: "80vh"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Typography style={{ fontSize: 23, flex: 0.8 }}>
                    {k.subject}
                  </Typography>
                  <ForwardIcon style={{ flex: 0.2, opacity: 0.6 }} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      flex: 1
                    }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      className={classes.root2}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Typography
                        style={{ opacity: 1, fontSize: 18, fontWeight: "bold" }}
                      >
                        {k.fromname}
                      </Typography>
                      <Typography
                        style={{
                          opacity: 0.8,
                          fontSize: 13,
                          fontWeight: "bold"
                        }}
                      >
                        {k.frommail}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="black"
                      aria-label="menu"
                    >
                      <ReplyIcon />
                    </IconButton>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="black"
                      aria-label="menu"
                    >
                      <StarOutlineIcon />
                    </IconButton>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="black"
                      aria-label="menu"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
                <div>
                  <Typography>{k.messagebox}</Typography>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      onClick={() => setdis(true)}
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<ReplyIcon />}
                    >
                      Reply
                    </Button>
                    <Button
                      onClick={() => setdis(true)}
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<SendIcon />}
                    >
                      Forward
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div
        style={{ display: dis ? "block" : "none" }}
        className={classes.root3}
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
        </Paper>
      </div>
    </div>
  );
}
