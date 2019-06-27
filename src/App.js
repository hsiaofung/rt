import React from "react";
import ReactDOM from "react-dom";
import App from "./AppOld";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const app = {
  _models: [],
  reducers: {},
  middleware: [],
  getReducers: function() {
    return combineReducers({});
  },
  getProvider: function() {
    const store = createStore(
      this.getReducers(),
      composeWithDevTools(applyMiddleware(thunk))
    );
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  },
  render: function() {
    ReactDOM.render(this.getProvider(), document.getElementById("root"));
  },
  start: function() {
    for (const m of this._models) {
      this.reducers[m.name] = this.getReducer(m.reducers, m.state);
    }
    this.render();
  },
  model: function(appModel) {
    this._models.push(appModel);
  }
};
