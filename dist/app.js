"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _router = _interopRequireDefault(require("./app/router"));
var app = (0, _express["default"])();
app.set("port", process.env.PORT || 8003);
app.use(_express["default"]["static"]("public"));
app.use(_bodyParser["default"].json({
  limit: "500mb"
}));
app.use((0, _cors["default"])());
app.use((0, _cookieParser["default"])());
app.use((0, _expressFileupload["default"])({
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  safeFileNames: false,
  abortOnLimit: true
}));
app.use(_router["default"]);
// Test
var _default = exports["default"] = app;