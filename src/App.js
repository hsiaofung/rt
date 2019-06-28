import React from "react";
import ReactDOM from "react-dom";
import App from "./AppOld";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const app = {
  _models: [],
  reducers: {
    router: {}
  },
  middleware: [],
  getReducers: function(reducers) {
    return combineReducers(reducers);
  },
  getProvider: function(reducers) {
    const store = createStore(
      this.getReducers(reducers),
      composeWithDevTools(applyMiddleware(thunk))
    );
    console.log("store", store);
    return (
      <Provider store={store}>
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
    for (const m of this._models) {
      this.reducers[m.default.name] = m.default.reducers;
    }
    this.render(this.reducers);
  },
  model: function(appModel) {
    this._models.push(appModel);
  }
};
