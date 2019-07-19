import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import result from "lodash/fp/result";

export const app = {
  models: [],
  store: {},
  reducers: {},
  middleware: [],
  pages: [],
  apiList: {},

  getStore: function() {
    return this.store;
  },
  getApi: function() {
    return this.apiList;
  },
  getReducers: function(reducers) {
    return combineReducers(reducers);
  },
  getRouter: function() {
    function getExact(path) {
      return path === "/" ? true : false;
    }
    return (
      <Router>
        <Switch>
          {this.pages.map(page => {
            return (
              <Route
                key={page.path}
                path={page.path}
                exact={getExact(page.path)}
                component={page.component.default}
              />
            );
          })}
        </Switch>
      </Router>
    );
  },
  getProvider: function(reducers) {
    this.store = createStore(
      this.getReducers(reducers),
      composeWithDevTools(applyMiddleware(thunk))
    );

    return <Provider store={this.store}>{this.getRouter()}</Provider>;
  },
  render: function(reducers) {
    ReactDOM.render(
      this.getProvider(reducers),
      document.getElementById("root")
    );
  },
  start: function() {
    for (const m of this.models) {
      this.reducers[m.default.name] = m.default.reducers;
    }
    this.render(this.reducers);
  },
  model: function(appModel) {
    this.models.push(appModel);
  },
  page: function(appPage) {
    this.pages.push(appPage);
  },
  api: function(appApi) {
    this.apiList[appApi.name] = appApi.path;
  },
  getURL: function(query) {
    const path = result([query.api], this.apiList);
    if (!query.hasOwnProperty("params")) return path;
    if (query.params === undefined) return path;
    return path + "/" + query.params;
  },
  getApiData: async function(query, method) {
    const options = {
      body:
        (query.hasOwnProperty("body") && JSON.stringify(query.body)) || null,
      credentials:
        (query.hasOwnProperty("credentials") && query.credentials) || "include",
      method: method,
      headers: (query.hasOwnProperty("headers") && query.headers) || {
        "content-type": "application/json"
      }
    };
    try {
      const data = await fetch(this.getURL(query), options);
      if (query.hasOwnProperty("pass")) {
        if (query.pass.indexOf(data.status) === -1) {
          throw new Error();
        }
      }
      const dataJSON = await data.json();
      return dataJSON;
    } catch (error) {
      query.errorFunc();
    }
  }
};

export function dispatch(action) {
  return app.getStore().dispatch(action);
}

export const req = {
  post: function(query) {
    return app.getApiData(query, "POST");
  },
  get: function(query) {
    return app.getApiData(query, "GET");
  },
  put: function(query) {
    return app.getApiData(query, "PUT");
  },
  patch: function(query) {
    return app.getApiData(query, "PATCH");
  },
  delete: function(query) {
    return app.getApiData(query, "DELETE");
  }
};

export function isOutOfStock(max, fn) {
  if (max == 0) {
    return null;
  }
  return fn;
}
export function isOneInStock(max, fn) {
  if (max == 1) {
    return null;
  }
  return fn;
}
