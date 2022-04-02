import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '20px',
  transition: transitions.SCALE,
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode >,
  document.getElementById("root")
);
