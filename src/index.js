import React from "react";
import ReactDom from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDom.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
