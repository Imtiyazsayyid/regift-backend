"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _winston = _interopRequireDefault(require("winston"));
var _logType = _interopRequireDefault(require("../enum/logType"));
var LoggingService = /*#__PURE__*/function () {
  function LoggingService() {
    (0, _classCallCheck2["default"])(this, LoggingService);
    this.DEBUG_LOGGING_ON = (process.env.NODE_ENV && process.env.NODE_ENV) === 'production' ? false : true;
    this.logger = _winston["default"].createLogger({
      levels: _winston["default"].config.npm.levels,
      level: _logType["default"].DEBUG,
      // defaultMeta: { service: constant.SERVICE_NAME },
      format: _winston["default"].format.combine(_winston["default"].format.timestamp(), _winston["default"].format.json()),
      transports: [new _winston["default"].transports.Console(), new _winston["default"].transports.File({
        filename: "logs/error.log",
        level: "error"
      }), new _winston["default"].transports.File({
        filename: "logs/combined.log"
      })]
    });
  }
  (0, _createClass2["default"])(LoggingService, [{
    key: "getWinstonLogger",
    value: function getWinstonLogger() {
      return this.logger;
    }
  }, {
    key: "consoleLog",
    value: function consoleLog(route, message) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _logType["default"].VERBOSE;
      if (error || level == _logType["default"].ERROR || level == _logType["default"].WARNING) {
        this.consoleErrorLog(route, message, error);
      } else if (level == _logType["default"].VERBOSE || level == _logType["default"].INFO || level == _logType["default"].DEBUG) {
        this.consoleDebugLog(route, message);
      }
    }
  }, {
    key: "consoleErrorLog",
    value: function consoleErrorLog(route, message, error) {
      this.logger.error({
        route: route,
        message: message,
        error: error
      });
    }
  }, {
    key: "consoleInfoLog",
    value: function consoleInfoLog(route, message) {
      if (!this.DEBUG_LOGGING_ON) return;
      this.logger.info({
        route: route,
        message: message
      });
    }
  }]);
  return LoggingService;
}();
var logger = new LoggingService();
var _default = exports["default"] = logger;