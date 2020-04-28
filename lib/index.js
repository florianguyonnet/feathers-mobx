"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAuthStore = exports.createServiceStore = void 0;

var _ServiceStore = _interopRequireDefault(require("./ServiceStore"));

var _AuthStore = _interopRequireDefault(require("./AuthStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createServiceStore = function createServiceStore(feathers, name) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new _ServiceStore["default"](feathers, name, options);
};

exports.createServiceStore = createServiceStore;

var createAuthStore = function createAuthStore(feathers) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new _AuthStore["default"](feathers, options);
};

exports.createAuthStore = createAuthStore;