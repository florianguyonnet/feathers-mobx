"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobx = require("mobx");

var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _temp;

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
  function ServiceStore(feathers, name) {
    _classCallCheck(this, ServiceStore);

    _defineProperty(this, "service", undefined);

    _defineProperty(this, "name", undefined);

    _initializerDefineProperty(this, "items", _descriptor, this);

    _initializerDefineProperty(this, "item", _descriptor2, this);

    _initializerDefineProperty(this, "pagination", _descriptor3, this);

    _initializerDefineProperty(this, "isFindPending", _descriptor4, this);

    _initializerDefineProperty(this, "isGetPending", _descriptor5, this);

    _initializerDefineProperty(this, "isCreatePending", _descriptor6, this);

    _initializerDefineProperty(this, "isUpdatePending", _descriptor7, this);

    _initializerDefineProperty(this, "isPatchPending", _descriptor8, this);

    _initializerDefineProperty(this, "isRemovePending", _descriptor9, this);

    _initializerDefineProperty(this, "errorOnFind", _descriptor10, this);

    _initializerDefineProperty(this, "errorOnGet", _descriptor11, this);

    _initializerDefineProperty(this, "errorOnCreate", _descriptor12, this);

    _initializerDefineProperty(this, "errorOnUpdate", _descriptor13, this);

    _initializerDefineProperty(this, "errorOnPatch", _descriptor14, this);

    _initializerDefineProperty(this, "errorOnRemove", _descriptor15, this);

    this.name = name;
    this.service = feathers.service(name); // if service has socket

    this.handleEvents();
  }

  _createClass(ServiceStore, [{
    key: "setItems",
    value: function setItems(items) {
      // pagination
      this.items = items === null || items === void 0 ? void 0 : items.data;
    }
  }, {
    key: "setItem",
    value: function setItem(item) {
      this.item = item;
    }
  }, {
    key: "patchItems",
    value: function patchItems(items) {}
  }, {
    key: "removeItems",
    value: function removeItems() {}
  }, {
    key: "clearPending",
    value: function clearPending() {
      this.isFindPending = false;
      this.isGetPending = false;
      this.isCreatePending = false;
      this.isUpdatePending = false;
      this.isPatchPending = false;
      this.isRemovePending = false;
    }
  }, {
    key: "clearErrors",
    value: function clearErrors() {
      this.errorOnFind = false;
      this.errorOnGet = false;
      this.errorOnCreate = false;
      this.errorOnUpdate = false;
      this.errorOnPatch = false;
      this.errorOnRemove = false;
    }
  }, {
    key: "clearData",
    value: function clearData() {
      this.items = [];
      this.pagination = {
        items: [],
        limit: 0,
        skip: 0,
        total: 0
      };
      this.item = undefined;
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this.clearData();
      this.clearErrors();
      this.clearPending();
    }
  }, {
    key: "handleEvents",
    value: function (_handleEvents) {
      function handleEvents() {
        return _handleEvents.apply(this, arguments);
      }

      handleEvents.toString = function () {
        return _handleEvents.toString();
      };

      return handleEvents;
    }(function () {
      this.service.on('created', function (item) {
        console.log('created');
      });
      this.service.on('updated', function (item) {
        handleEvents;
        console.log('updated');
      });
      this.service.on('patched', function (item) {
        console.log('patched');
      });
      this.service.on('removed', function (item) {
        console.log('removed');
      });
    })
  }, {
    key: "find",
    value: function () {
      var _find = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
        var items;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.isFindPending = true;
                _context.next = 4;
                return this.service.find(params);

              case 4:
                items = _context.sent;
                this.setItems(items);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                this.errorOnFind = _context.t0;

              case 11:
                _context.prev = 11;
                this.isFindPending = false;
                return _context.finish(11);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8, 11, 14]]);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, params) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                this.isGetPending = true;
                _context2.next = 4;
                return this.service.get(id, params);

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                this.errorOnGet = _context2.t0;

              case 9:
                _context2.prev = 9;
                this.isGetPending = false;
                return _context2.finish(9);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6, 9, 12]]);
      }));

      function get(_x2, _x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, params) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                this.isCreatePending = true;
                _context3.next = 4;
                return this.service.create(data, params);

              case 4:
                _context3.next = 9;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                this.errorOnCreate = _context3.t0;

              case 9:
                _context3.prev = 9;
                this.isCreatePending = false;
                return _context3.finish(9);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 6, 9, 12]]);
      }));

      function create(_x4, _x5) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ids, data, params) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                this.isUpdatePending = true;
                _context4.next = 4;
                return this.service.update(data, params);

              case 4:
                _context4.next = 9;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                this.errorOnUpdate = _context4.t0;

              case 9:
                _context4.prev = 9;
                this.isUpdatePending = false;
                return _context4.finish(9);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6, 9, 12]]);
      }));

      function update(_x6, _x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ids, data, params) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                this.isPatchPending = true;
                _context5.next = 4;
                return this.service.patch(params);

              case 4:
                _context5.next = 9;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                this.errorOnPatch = _context5.t0;

              case 9:
                _context5.prev = 9;
                this.isPatchPending = false;
                return _context5.finish(9);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6, 9, 12]]);
      }));

      function patch(_x9, _x10, _x11) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ids, params) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                this.isRemovePending = true;
                _context6.next = 4;
                return this.service.remove(ids);

              case 4:
                _context6.next = 9;
                break;

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                this.errorOnRemove = _context6.t0;

              case 9:
                _context6.prev = 9;
                this.isRemovePending = false;
                return _context6.finish(9);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6, 9, 12]]);
      }));

      function remove(_x12, _x13) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return ServiceStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "items", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "item", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "pagination", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      items: [],
      limit: 0,
      skip: 0,
      total: 0
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isFindPending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isGetPending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "isCreatePending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "isUpdatePending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "isPatchPending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "isRemovePending", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "errorOnFind", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "errorOnGet", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "errorOnCreate", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "errorOnUpdate", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "errorOnPatch", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "errorOnRemove", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "clearPending", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "clearPending"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearErrors", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "clearErrors"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearData", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "clearData"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearAll", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "clearAll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "find", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "find"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "get", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "get"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "create", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "create"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "update", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "patch", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "patch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "remove", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "remove"), _class.prototype)), _class));
exports["default"] = ServiceStore;