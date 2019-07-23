"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdt = exports.validate = exports.req = exports.app = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.dispatch = dispatch;
exports.jumpToLogin = jumpToLogin;

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

var _result = require("lodash/fp/result");

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  },
  getURL: function getURL(query) {
    if ((typeof query === "undefined" ? "undefined" : _typeof(query)) !== "object") {
      console.error('query should be object, example:{api:"path"}');
      return;
    }
    var path = (0, _result2.default)([query.api], this.apiList);
    if (!query.hasOwnProperty("params")) return path;
    if (query.params === undefined) return path;
    return path + "/" + query.params;
  },
  getApiData: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query, method) {
      var options, data, dataJSON;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {
                body: query.hasOwnProperty("body") && JSON.stringify(query.body) || null,
                credentials: query.hasOwnProperty("credentials") && query.credentials || "include",
                method: method,
                headers: query.hasOwnProperty("headers") && query.headers || {
                  "content-type": "application/json"
                }
              };
              _context.prev = 1;
              _context.next = 4;
              return fetch(this.getURL(query), options);

            case 4:
              data = _context.sent;

              if (!query.hasOwnProperty("pass")) {
                _context.next = 8;
                break;
              }

              if (!(query.pass.indexOf(data.status) === -1)) {
                _context.next = 8;
                break;
              }

              throw new Error();

            case 8:
              _context.next = 10;
              return data.json();

            case 10:
              dataJSON = _context.sent;
              return _context.abrupt("return", dataJSON);

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);

              query.errorFunc();

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 14]]);
    }));

    function getApiData(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return getApiData;
  }()
};

function dispatch(action) {
  return app.getStore().dispatch(action);
}

var req = exports.req = {
  post: function post(query) {
    return app.getApiData(query, "POST");
  },
  get: function get(query) {
    return app.getApiData(query, "GET");
  },
  put: function put(query) {
    return app.getApiData(query, "PUT");
  },
  patch: function patch(query) {
    return app.getApiData(query, "PATCH");
  },
  delete: function _delete(query) {
    return app.getApiData(query, "DELETE");
  }
};

var validate = exports.validate = {
  email: function email(_email, fn) {
    var rule = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$");
    if (_email === "") return null;
    if (!rule.test(_email)) return null;
    return fn;
  }
};

function jumpToLogin(casHostUrl) {
  window.location.href = casHostUrl + "/cas/login?region=tw&locale=zh_TW&service=" + encodeURIComponent(window.location.href);
}

var pdt = exports.pdt = {
  getSumQty: function getSumQty(quantity) {
    return quantity.stock - quantity.purchase;
  },
  getPoQty: function getPoQty(cartItems, productId) {
    var count = 0;

    if (productId !== undefined) {
      cartItems.forEach(function (item) {
        if (item.cbu === productId) {
          count++;
        }
      });
    }
    return count;
  },
  isOneInStock: function isOneInStock(max, fn) {
    return max == 1 && null || fn;
  },
  isOutOfStock: function isOutOfStock(max, fn) {
    return max <= 0 && null || fn;
  }
};
