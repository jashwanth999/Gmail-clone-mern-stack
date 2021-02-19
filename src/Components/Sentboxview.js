import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "../styles.css";
import StarIcon from "@material-ui/icons/Star";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
import axios from "../Auth/axios";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
export default function SentboxView({ id, toname, subject, messagebox }) {
  const history = useHistory();
  const [star, setstar] = useState(false);
  const [check, setcheck] = useState(false);

  return (
    <div
      className="inboxview"
      style={{
        flex: 1,
        backgroundColor: "#FDFEFE",
        height: 50,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        borderBottom: "0.2px solid lightgray",
        cursor: "pointer"
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          flex: 0.17,
          justifyContent: "space-evenly"
        }}
      >
        {check ? (
          <CheckBoxIcon
            style={{ opacity: 0.4 }}
            onClick={() => setcheck(!check)}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            style={{ opacity: 0.4 }}
            onClick={() => setcheck(!check)}
          />
        )}

        {star ? (
          <StarIcon style={{ opacity: 0.4 }} onClick={() => setstar(!star)} />
        ) : (
          <StarBorderIcon
            onClick={() => setstar(!star)}
            style={{ opacity: 0.4 }}
          />
        )}
        <h4>{toname}</h4>
      </div>
      <div style={{ flex: 0.1 }}></div>

      <div
        onClick={() => history.push(`/sentmessagebox/${id}`)}
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          flex: 1
        }}
      >
        <h4>{subject}-</h4>
        <p style={{ opacity: 0.5 }}>{messagebox}</p>
      </div>
    </div>
  );
}
