"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = writeMiddleware;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _statusTypes = _interopRequireDefault(require("../../@core/enum/statusTypes"));
var _prisma = _interopRequireDefault(require("../../@core/helpers/prisma"));
var _LoggingService = _interopRequireDefault(require("../../@core/services/LoggingService"));
function writeMiddleware(_x, _x2, _x3) {
  return _writeMiddleware.apply(this, arguments);
}
function _writeMiddleware() {
  _writeMiddleware = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var module_role_map;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _prisma["default"].module_role_map.findFirst({
            where: {
              mrm_role_id: userInfo.user_role_id,
              mrm_module_id: userInfo.module_id,
              mrm_access: "WRITE",
              mrm_is_active: true
            }
          });
        case 3:
          module_role_map = _context.sent;
          if (module_role_map) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", sendResponse(res, false, null, "Write Access required", _statusTypes["default"].UNAUTHORIZED));
        case 6:
          next();
          _context.next = 13;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in writeMiddleware ", _context.t0);
          return _context.abrupt("return", sendResponse(res, false, null, "Error in checking write access ", _statusTypes["default"].INTERNAL_SERVER_ERROR));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _writeMiddleware.apply(this, arguments);
}