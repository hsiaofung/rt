import "./index.css";
import { app } from "./app";

app.model(require("./models/products"));
app.model(require("./models/miniCart"));
app.start("root");
