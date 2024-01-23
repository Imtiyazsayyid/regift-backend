"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Function = Function;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _core = _interopRequireDefault(require("../../../@core/core"));
function Function(_x, _x2) {
  return _Function.apply(this, arguments);
}
function _Function() {
  _Function = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", _core["default"].sendResponse(res, true, null, "Api Not Ready Yet"));
        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          _core["default"].logger.consoleErrorLog(req.originalUrl, "Error in functionName", _context.t0);
          return _context.abrupt("return", _core["default"].sendResponse(res, false, null, "Error ", _core["default"].statusType.DB_ERROR));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _Function.apply(this, arguments);
}