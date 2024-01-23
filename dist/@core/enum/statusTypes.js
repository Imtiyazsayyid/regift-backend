"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var statusType = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIME_OUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED_UNAUTHORIZED: 501,
  SERVICE_UNAVAILABLE: 503,
  SUCCESS: 200,
  CREATED: 201,
  DB_ERROR: 422
};
var _default = exports["default"] = statusType;