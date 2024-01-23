"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("module-alias/register");
var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("./app"));
var server = _http["default"].createServer(_app["default"]);
var port = _app["default"].get("port");
server.listen(_app["default"].get("port") || 8003, "0.0.0.0");
var onError = function onError(error) {
  if (error.syscall !== "listen") throw error;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("Port ".concat(port, " requires elevated privileges"));
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port ".concat(port, " is already in use"));
      process.exit(1);
      break;
    default:
      throw error;
  }
};
var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Server Listening on My custom port " + bind);
};
server.on("error", onError);
server.on("listening", onListening);