import React from "react";
import ReactDOM from "react-dom";
import { ActionCableProvider } from "react-actioncable-provider";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { API_WS_ROOT } from "./config";

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById("root")
);
serviceWorker.register();