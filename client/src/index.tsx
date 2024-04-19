import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Appointments from "./patient/Appointments";
import DashBoard from "./doctor/components/dashBoard/DashBoard";
import NavBar from "./doctor/components/navBar/NavBar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavBar />
    {/* for patient side or client */}
    {/* <Appointments /> */}

    {/* for doctor side or server */}
    <DashBoard />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
