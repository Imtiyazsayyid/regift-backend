"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponse = sendResponse;
function sendResponse(res, status, data, message) {
  var statusCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;
  var apiVersion = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var obj = {
    status: status,
    data: data,
    message: message,
    apiVersion: apiVersion || 'No Version'
  };
  return res.status(statusCode).json(obj);
}