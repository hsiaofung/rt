import { app } from "./app";

//註冊頁面
app.page({ path: "/", component: require("./pages/Home") });
app.page({ path: "/about", component: require("./pages/About") });
//註冊模型
app.model(require("./models/products"));
app.model(require("./models/miniCart"));
app.model(require("./models/home"));
//註冊api
app.api({
  name: "info",
  path: `/shopping/v1/compositions/productDetails/info`
});
app.api({
  name: "wishList",
  path: `/shopping/v1/compositions/wishList`
});
//啟動app
app.start("root");
