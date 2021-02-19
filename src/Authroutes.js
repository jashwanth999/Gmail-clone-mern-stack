import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
export default function Authroutes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}
