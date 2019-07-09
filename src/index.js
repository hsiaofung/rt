import { app } from "./app";

//註冊頁面
app.page({ path: "/", component: require("./pages/Home") });

//註冊模型
app.model(require("./models/home"));
//註冊api
app.api({
  name: "episodes",
  path:
    "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes"
});
//啟動app
app.start("root");
