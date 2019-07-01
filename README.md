# Description

Redux, React-Redux, Redux-thunk, Router Encapsulation.<br>
So we can only use single model file to implement Redux/Redux-thunk<br>

## Feature

*Single model file implement redux/redux-thunk.<br>
*Clear API to add new model.<br>

## How to use

Add this line in your index.js to add a new page

```
app.page({ path: "/home", component: require("./pages/Home") });
```

Add this line in your index.js to add a new model

```
app.model(require("./models/products"));
```

this is all
