# Description

Redux, React-Redux, Redux-thunk, Router Encapsulation.<br>
So we can only use single model file to implement Redux/Redux-thunk<br>

## Feature

*Support create-react-app
*Single model file implement redux/redux-thunk.<br>
\*Clear API to add new model.<br>

## How to use

Install creat-react-app

delete contents in index.js

import app.js

```
import { app } from "./app";
```

Add this line in your index.js to add a new page

```
app.page({ path: "/home", component: require("./pages/Home") });
```

Add this line in your index.js to add a new model

```
app.model(require("./models/products"));
```

this is all
