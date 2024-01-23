"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVICE_NAME = exports.RESPONSE_MESSAGES = exports.MYSQL_MOMENT_DATE_FORMAT = exports.MYSQL_MOMENT_DATETIME_FORMAT = exports.MESSAGE_NOT_FOUND_ERROR = exports.MESSAGE_NOT_ALLOWED = exports.MESSAGE_DB_ERROR = exports.MESSAGE_AUTH_ERROR = exports.MESSAGE_APP_ERROR = exports.CUSTOM_RESPONSE_MESSAGES = exports.APP_NAME = void 0;
var _appDetails = _interopRequireDefault(require("../enum/appDetails"));
// enums

var APP_NAME = exports.APP_NAME = _appDetails["default"].APPNAME;
var SERVICE_NAME = exports.SERVICE_NAME = _appDetails["default"].SERVICE_NAME;
var MYSQL_MOMENT_DATE_FORMAT = exports.MYSQL_MOMENT_DATE_FORMAT = 'YYYY-MM-DD';
var MYSQL_MOMENT_DATETIME_FORMAT = exports.MYSQL_MOMENT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
var MESSAGE_NOT_ALLOWED = exports.MESSAGE_NOT_ALLOWED = 'Not allowed to access customer services';
var MESSAGE_AUTH_ERROR = exports.MESSAGE_AUTH_ERROR = 'Unauthorized or invalid OTP.';
var MESSAGE_NOT_FOUND_ERROR = exports.MESSAGE_NOT_FOUND_ERROR = 'Not found. Please try after sometime.';
var MESSAGE_DB_ERROR = exports.MESSAGE_DB_ERROR = 'Something went wrong while processing data.';
var MESSAGE_APP_ERROR = exports.MESSAGE_APP_ERROR = 'Something went wrong while processing data.';

// Response Messages

var RESPONSE_MESSAGES = exports.RESPONSE_MESSAGES = {
  CODE_400: 'Auth Token is required. Please provide a valid auth token along with request.',
  CODE_401: 'You need to login to view this',
  CODE_403: 'You are forbidden from seeing this',
  CODE_404: 'The resource referenced by request does not exists.',
  CODE_405: 'Requested method is not valid',
  CODE_408: 'Request getting too much time. please try after some time',
  CODE_500: 'Something went wrong on server. Please contact server admin.',
  CODE_501: 'We will patch no such thing',
  CODE_503: 'Requested service is unavailable for this time',
  CODE_200: 'Success',
  CODE_201: 'Created',
  CODE_422: 'Something went wrong, Database error'
};
var CUSTOM_RESPONSE_MESSAGES = exports.CUSTOM_RESPONSE_MESSAGES = {
  USER_RES: 'Custom Response message will come here'
};