"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessToken = getAccessToken;
exports.login = login;
exports.register = register;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ResponseService = require("../../../@core/services/ResponseService");
var _statusTypes = _interopRequireDefault(require("../../../@core/enum/statusTypes"));
var _LoggingService = _interopRequireDefault(require("../../../@core/services/LoggingService"));
var _validationHelper = require("../../../@core/helpers/validationHelper");
var _prisma = _interopRequireDefault(require("../../../@core/helpers/prisma"));
var _CryptoClient = require("../../../@core/securityService/CryptoClient");
var _JwtClient = require("../../../@core/securityService/JwtClient");
function login(_x, _x2) {
  return _login.apply(this, arguments);
}
function _login() {
  _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var body, validate, user, payload, refreshToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          body = {
            email: req.body.email,
            password: req.body.password,
            user_role: "admin"
          };
          validate = (0, _validationHelper.validateLogin)(body);
          if (validate) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Fields validation failed!"));
        case 5:
          if (!(body.user_role === "admin")) {
            _context.next = 9;
            break;
          }
          _context.next = 8;
          return _prisma["default"].admin.findFirst({
            where: {
              email: body.email,
              status: true
            }
          });
        case 8:
          user = _context.sent;
        case 9:
          if (user) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "No Such User"));
        case 11:
          if (!(user.password !== body.password)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "No Such User"));
        case 13:
          payload = {
            user_id: user.id,
            user_role: body.user_role
          };
          refreshToken = (0, _JwtClient.jwtRefreshTokenEncode)(payload);
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, true, refreshToken, "Login Successfull"));
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in login", _context.t0);
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error in login", _statusTypes["default"].DB_ERROR));
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return _login.apply(this, arguments);
}
function register(_x3, _x4) {
  return _register.apply(this, arguments);
}
function _register() {
  _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var body, validate, insertUser, payload, refreshToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          body = {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile
          };
          validate = (0, _validationHelper.validateRegister)(body);
          if (validate) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Fields validation failed!"));
        case 5:
          _context2.next = 7;
          return _prisma["default"].u_user.create({
            data: {
              user_email: body.email,
              user_mobile: body.mobile,
              user_password: (0, _CryptoClient.hash)(body.password),
              user_first_name: body.firstname,
              user_last_name: body.lastname,
              user_role_id: 2
            }
          });
        case 7:
          insertUser = _context2.sent;
          payload = {
            user_id: insertUser.user_id
          };
          refreshToken = (0, _JwtClient.jwtRefreshTokenEncode)(payload);
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, true, refreshToken, "Registration Successfull"));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in register", _context2.t0);
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error in register", _statusTypes["default"].DB_ERROR));
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _register.apply(this, arguments);
}
function getAccessToken(_x5, _x6) {
  return _getAccessToken.apply(this, arguments);
}
function _getAccessToken() {
  _getAccessToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var refreshToken, decoded, user, payload, accessToken;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          refreshToken = req.body.refreshToken;
          decoded = (0, _JwtClient.jwtRefreshTokenVerify)(refreshToken);
          if (decoded) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Refresh Token Not Valid", _statusTypes["default"].UNAUTHORIZED));
        case 5:
          if (!(decoded.user_role === "admin")) {
            _context3.next = 9;
            break;
          }
          _context3.next = 8;
          return _prisma["default"].admin.findUnique({
            where: {
              id: decoded.user_id,
              status: true
            }
          });
        case 8:
          user = _context3.sent;
        case 9:
          if (user) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "No such user!"));
        case 11:
          payload = {
            user_id: user.id,
            user_role: decoded.user_role
          };
          accessToken = (0, _JwtClient.jwtAccessTokenEncode)(payload);
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, true, accessToken, "Access Token"));
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getAccessToken", _context3.t0);
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error in getting access token", _statusTypes["default"].DB_ERROR));
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return _getAccessToken.apply(this, arguments);
}