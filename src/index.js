import "./index.css";
import { app } from "./app";

//註冊頁面
app.page({ path: "/home", component: require("./pages/Home") });
app.page({ path: "/about", component: require("./pages/About") });
//註冊模型
app.model(require("./models/products"));
app.model(require("./models/miniCart"));
//啟動app
app.start("root");
