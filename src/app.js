import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
    console.log("this.apiList", this.apiList);
  }
};

export function dispatch(action) {
  return app.getStore().dispatch(action);
}
