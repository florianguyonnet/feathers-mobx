"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobx = require("mobx");

var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var ServiceStore = (_dec = _mobx.action.bound, _dec2 = _mobx.action.bound, _dec3 = _mobx.action.bound, _dec4 = _mobx.action.bound, (_class = (_temp = /*#__PURE__*/function () {
  function ServiceStore(app, options) {
    _classCallCheck(this, ServiceStore);

    _defineProperty(this, "app", undefined);

    _defineProperty(this, "idField", 'id');

    _defineProperty(this, "userService", 'users');

    _defineProperty(this, "entityField", 'user');

    _initializerDefineProperty(this, "accessToken", _descriptor, this);

    _initializerDefineProperty(this, "payload", _descriptor2, this);

    _initializerDefineProperty(this, "user", _descriptor3, this);

    _initializerDefineProperty(this, "isAuthenticatePending", _descriptor4, this);

    _initializerDefineProperty(this, "isLogoutPending", _descriptor5, this);

    _initializerDefineProperty(this, "errorOnAuthenticate", _descriptor6, this);

    _initializerDefineProperty(this, "errorOnLogout", _descriptor7, this);

    this.app = app;
    this.idField = options.idField;
    this.userService = options.userService;
    this.entityField = options.entityField;
  }

  _createClass(ServiceStore, [{
    key: "clearPending",
    value: function clearPending() {
      this.isAuthenticatePending = false;
      this.isLogoutPending = false;
    }
  }, {
    key: "clearErrors",
    value: function clearErrors() {
      this.errorOnAuthenticate = null;
      this.errorOnLogout = null;
    }
  }, {
    key: "clearData",
    value: function clearData() {
      this.user = null;
      this.payload = null;
      this.user = null;
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this.clearData();
      this.clearErrors();
      this.clearPending();
    }
  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.app.service(this.userService).get(userId);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUser(_x) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }, {
    key: "authenticateHandler",
    value: function () {
      var _authenticateHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.accessToken = data.accessToken;
                this.payload = data;
                user = data[entityField];

                if (!user) {
                  _context2.next = 7;
                  break;
                }

                this.user = user;
                _context2.next = 11;
                break;

              case 7:
                if (!(this.userService && data.hasOwnProperty(this.idField))) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 10;
                return this.getUser(data[this.idField]);

              case 10:
                this.user = _context2.sent;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function authenticateHandler(_x2) {
        return _authenticateHandler.apply(this, arguments);
      }

      return authenticateHandler;
    }()
  }, {
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                this.isFindPending = true;
                _context3.t0 = this;
                _context3.next = 5;
                return this.app.authenticate(data);

              case 5:
                _context3.t1 = _context3.sent;

                _context3.t0.authenticateHandler.call(_context3.t0, _context3.t1);

                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t2 = _context3["catch"](0);
                this.errorOnFind = _context3.t2;

              case 12:
                _context3.prev = 12;
                this.isFindPending = false;
                return _context3.finish(12);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9, 12, 15]]);
      }));

      function authenticate(_x3) {
        return _authenticate.apply(this, arguments);
      }

      return authenticate;
    }()
  }, {
    key: "reAuthenticate",
    value: function () {
      var _reAuthenticate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                this.isFindPending = true;
                _context4.t0 = this;
                _context4.next = 5;
                return this.app.reAuthenticate(data);

              case 5:
                _context4.t1 = _context4.sent;

                _context4.t0.authenticateHandler.call(_context4.t0, _context4.t1);

                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t2 = _context4["catch"](0);
                this.errorOnFind = _context4.t2;

              case 12:
                _context4.prev = 12;
                this.isFindPending = false;
                return _context4.finish(12);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9, 12, 15]]);
      }));

      function reAuthenticate(_x4) {
        return _reAuthenticate.apply(this, arguments);
      }

      return reAuthenticate;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ids, params) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                this.isLogoutPending = true;
                _context5.next = 4;
                return this.app.logout();

              case 4:
                this;
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                this.errorOnLogout = _context5.t0;

              case 10:
                _context5.prev = 10;
                this.isLogoutPending = false;
                return _context5.finish(10);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7, 10, 13]]);
      }));

      function logout(_x5, _x6) {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }]);

  return ServiceStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "accessToken", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "payload", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "user", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isAuthenticatePending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isLogoutPending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "errorOnAuthenticate", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "errorOnLogout", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "clearPending", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "clearPending"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearErrors", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "clearErrors"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearData", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "clearData"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearAll", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "clearAll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "authenticate", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "authenticate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "reAuthenticate", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "reAuthenticate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "logout", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "logout"), _class.prototype)), _class));
exports["default"] = ServiceStore;