"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createService = void 0;

var _ServiceStore = _interopRequireDefault(require("./ServiceStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createService = function createService(feathers, name) {
  return new _ServiceStore["default"](feathers, name);
};

exports.createService = createService;