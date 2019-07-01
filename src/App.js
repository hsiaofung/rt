import React from "react";
import ReactDOM from "react-dom";
import App from "./AppOld";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const app = {
  models: [],
  store: {},
  reducers: {},
  middleware: [],

  getStore: function() {
    return this.store;
  },
  getReducers: function(reducers) {
    return combineReducers(reducers);
  },
  getProvider: function(reducers) {
    this.store = createStore(
      this.getReducers(reducers),
      composeWithDevTools(applyMiddleware(thunk))
    );

    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
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
  }
};

export function dispatch(action) {
  return app.getStore().dispatch(action);
}
