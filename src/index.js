import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { app } from "./app";

app.model(require("./models/products"));
app.start("root");
