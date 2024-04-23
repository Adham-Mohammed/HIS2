import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DashBoard from "./doctor/components/dashBoard/DashBoard";
import NavBar from "./doctor/components/navBar/NavBar";
import { Box, Stack } from "@mui/material";
import EMR from "./doctor/components/EMR/EMR";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Box
    sx={{
      backgroundColor: "#EEEFFF",
      overflowX: "hidden",
      overflowY: "auto",
      width: "100vw",
      height: "100vh",
    }}
  >
    <NavBar />

    <EMR />



  </Box>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
