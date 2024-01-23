"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHome = getHome;
exports.postHome = postHome;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ResponseService = require("../../../@core/services/ResponseService");
var _statusTypes = _interopRequireDefault(require("../../../@core/enum/statusTypes"));
var _LoggingService = _interopRequireDefault(require("../../../@core/services/LoggingService"));
function getHome(_x, _x2) {
  return _getHome.apply(this, arguments);
}
function _getHome() {
  _getHome = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, true, null, "get home routes"));
        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getHome ", _context.t0);
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _getHome.apply(this, arguments);
}
function postHome(_x3, _x4) {
  return _postHome.apply(this, arguments);
}
function _postHome() {
  _postHome = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, true, null, "post home routes"));
        case 4:
          _context2.prev = 4;
          _context2.t0 = _context2["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in postHome", _context2.t0);
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return _postHome.apply(this, arguments);
}