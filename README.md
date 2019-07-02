# Description

Redux, React-Redux, Redux-thunk, Router Encapsulation.<br>
So we can only use single model file to implement Redux/Redux-thunk<br>

## Feature

*Support create-react-app<br>
*Write action, action type, reducer in a single file.<br>
\*Clear API to implement Web frontend.<br>

## How to use

- Create a creat-react-app project

```
npx create-react-app my-app
```

- Delete contents in index.js

- import app.js

```
import { app } from "./app";
```

- Then, you can start to add your new page.

```
app.page({ path: "/home", component: require("./pages/Home") });
```

- Or, add a new model

```
app.model(require("./models/products"));
```

- After that, strat your app

```
app.start("root");
```
