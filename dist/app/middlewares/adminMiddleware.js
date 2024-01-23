"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authMiddleware;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ResponseService = require("../../@core/services/ResponseService");
var _statusTypes = _interopRequireDefault(require("../../@core/enum/statusTypes"));
var _prisma = _interopRequireDefault(require("../../@core/helpers/prisma"));
var _JwtClient = require("../../@core/securityService/JwtClient");
var _LoggingService = _interopRequireDefault(require("../../@core/services/LoggingService"));
function authMiddleware(_x, _x2, _x3) {
  return _authMiddleware.apply(this, arguments);
}
function _authMiddleware() {
  _authMiddleware = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authorization, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          authorization = req.headers.authorization;
          if (!(!authorization || typeof authorization !== "string")) {
            _context.next = 5;
            break;
          }
          _LoggingService["default"].consoleInfoLog(req.originalUrl, "No authorization Token Provided");
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "No authorization Token Provided", _statusTypes["default"].UNAUTHORIZED));
        case 5:
          decoded = (0, _JwtClient.jwtAccessTokenVerify)(authorization);
          if (decoded) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Token Invalid", _statusTypes["default"].UNAUTHORIZED));
        case 8:
          _context.next = 10;
          return _prisma["default"].admin.findUnique({
            where: {
              id: decoded.user_id
            }
          });
        case 10:
          user = _context.sent;
          if (user) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "No Such User", _statusTypes["default"].UNAUTHORIZED));
        case 13:
          req.app.set("userInfo", user);
          next();
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in accessMiddleware ", _context.t0);
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error in validating token", _statusTypes["default"].INTERNAL_SERVER_ERROR));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return _authMiddleware.apply(this, arguments);
}