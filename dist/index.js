"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;
exports.dispatch = dispatch;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _developmentOnly = require("redux-devtools-extension/developmentOnly");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = exports.app = {
  models: [],
  store: {},
  reducers: {},
  middleware: [],
  pages: [],
  apiList: {},

  getStore: function getStore() {
    return this.store;
  },
  getApi: function getApi() {
    return this.apiList;
  },
  getReducers: function getReducers(reducers) {
    return (0, _redux.combineReducers)(reducers);
  },
  getRouter: function getRouter() {
    function getExact(path) {
      return path === "/" ? true : false;
    }
    return _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        this.pages.map(function (page) {
          return _react2.default.createElement(_reactRouterDom.Route, {
            key: page.path,
            path: page.path,
            exact: getExact(page.path),
            component: page.component.default
          });
        })
      )
    );
  },
  getProvider: function getProvider(reducers) {
    this.store = (0, _redux.createStore)(this.getReducers(reducers), (0, _developmentOnly.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));

    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: this.store },
      this.getRouter()
    );
  },
  render: function render(reducers) {
    _reactDom2.default.render(this.getProvider(reducers), document.getElementById("root"));
  },
  start: function start() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.models[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var m = _step.value;

        this.reducers[m.default.name] = m.default.reducers;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.render(this.reducers);
  },
  model: function model(appModel) {
    this.models.push(appModel);
  },
  page: function page(appPage) {
    this.pages.push(appPage);
  },
  api: function api(appApi) {
    this.apiList[appApi.name] = appApi.path;
    console.log("this.apiList", this.apiList);
  }
};

function dispatch(action) {
  return app.getStore().dispatch(action);
}
