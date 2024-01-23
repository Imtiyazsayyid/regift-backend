"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtAccessTokenEncode = jwtAccessTokenEncode;
exports.jwtAccessTokenVerify = jwtAccessTokenVerify;
exports.jwtDecode = jwtDecode;
exports.jwtRefreshTokenEncode = jwtRefreshTokenEncode;
exports.jwtRefreshTokenVerify = jwtRefreshTokenVerify;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _LoggingService = _interopRequireDefault(require("../services/LoggingService"));
function jwtRefreshTokenEncode(payload) {
  try {
    return _jsonwebtoken["default"].sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE
    });
  } catch (error) {
    _LoggingService["default"].consoleErrorLog("core", "Error in jwtRefreshTokenEncode", error);
    return null;
  }
}
function jwtRefreshTokenVerify(token) {
  try {
    return _jsonwebtoken["default"].verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    _LoggingService["default"].consoleErrorLog("core", "Error in jwtRefreshTokenVerify", error);
    return null;
  }
}
function jwtAccessTokenEncode(payload) {
  try {
    return _jsonwebtoken["default"].sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE
    });
  } catch (error) {
    _LoggingService["default"].consoleErrorLog("core", "Error in jwtAccessTokenEncode", error);
    return null;
  }
}
function jwtAccessTokenVerify(token) {
  try {
    return _jsonwebtoken["default"].verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    _LoggingService["default"].consoleErrorLog("core", "Error in jwtAccessTokenVerify", error);
    return null;
  }
}
function jwtDecode(token) {
  try {
    return _jsonwebtoken["default"].decode(token);
  } catch (error) {
    _LoggingService["default"].consoleErrorLog("core", "Error in jwtDecode", error);
    return null;
  }
}