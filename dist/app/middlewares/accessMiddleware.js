"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = accessMiddleware;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _statusTypes = _interopRequireDefault(require("../../@core/enum/statusTypes"));
var _prisma = _interopRequireDefault(require("../../@core/helpers/prisma"));
var _JwtClient = require("../../@core/securityService/JwtClient");
var _LoggingService = _interopRequireDefault(require("../../@core/services/LoggingService"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function accessMiddleware(module_key) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var decoded, user, module_role_map;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            decoded = (0, _JwtClient.jwtAccessTokenVerify)(req.headers.Authorization);
            if (decoded) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", sendResponse(res, false, null, "Token Invalid", _statusTypes["default"].FORBIDDEN));
          case 4:
            _context.next = 6;
            return _prisma["default"].u_user.findUnique({
              where: {
                user_id: decoded.user_id
              }
            });
          case 6:
            user = _context.sent;
            if (user) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", sendResponse(res, false, null, "No Such User", _statusTypes["default"].FORBIDDEN));
          case 9:
            _context.next = 11;
            return _prisma["default"].module_role_map.findFirst({
              where: {
                mrm_role_id: user.user_role_id,
                mrm_module_relation: {
                  module_key: module_key
                }
              }
            });
          case 11:
            module_role_map = _context.sent;
            if (module_role_map) {
              _context.next = 14;
              break;
            }
            return _context.abrupt("return", sendResponse(res, false, null, "This role is not Authorized for this module", _statusTypes["default"].UNAUTHORIZED));
          case 14:
            req.userInfo = _objectSpread(_objectSpread({}, user), {}, {
              module_id: module_role_map.mrm_module_id
            });
            next();
            _context.next = 22;
            break;
          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in accessMiddleware ", _context.t0);
            return _context.abrupt("return", sendResponse(res, false, null, "Error in validating token", _statusTypes["default"].INTERNAL_SERVER_ERROR));
          case 22:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 18]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}