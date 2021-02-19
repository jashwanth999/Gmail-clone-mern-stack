import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import Inbox from "./Components/Inbox";
import MessageBox from "./Components/MessageBox";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { auth } from "./Auth/firebase";
import { useHistory, Redirect } from "react-router-dom";
import Sentbox from "./Components/Sentbox";
import Sentmessagebox from "./Components/Sentmessagebox";
import Starred from "./Components/Starred";
import Starredmessage from "./Components/Starredmessage";
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  const user = auth.currentUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
}
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/inbox" component={Inbox} />
      <PrivateRoute path="/sentbox" component={Sentbox} />
      <PrivateRoute path="/messagebox/:msgid" component={MessageBox} />
      <PrivateRoute path="/sentmessagebox/:msgid" component={Sentmessagebox} />
      <PrivateRoute path="/starred" component={Starred} />
      <PrivateRoute path="/starredmessage/:msgid" component={Starredmessage} />
    </Switch>
  );
}
