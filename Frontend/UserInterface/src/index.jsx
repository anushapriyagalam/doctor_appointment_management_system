import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
