"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var path = require('path');
var Jimp = require('jimp');
var imageCompression = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(imageURL, type, maxWidth, maxHeight, compressionQuality, downloadPath, saveActualPath) {
    var compressionService,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          compressionService = _args.length > 7 && _args[7] !== undefined ? _args[7] : "";
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            if (compressionService == 'tinypng') {} else {
              Jimp.read(imageURL).then(function (lenna) {
                var fileName = "".concat(saveActualPath, "-").concat(lenna.bitmap.width, "x").concat(lenna.bitmap.height, ".").concat(type);
                if (lenna.bitmap.width > maxWidth) {
                  return lenna.resize(maxWidth, Jimp.AUTO, function (err, res) {
                    fileName = "".concat(saveActualPath, "-").concat(res.bitmap.width, "x").concat(res.bitmap.height, ".").concat(type);
                    res.quality(compressionQuality).writeAsync(path.join(downloadPath, fileName)).then(function (resWrite) {
                      resolve({
                        status: true,
                        fileName: fileName
                      });
                    });
                  });
                  // .quality(compressionQuality) // set JPEG quality
                  // .writeAsync(path.join(downloadPath,fileName))
                } else if (lenna.bitmap.height > maxHeight) {
                  return lenna.resize(Jimp.AUTO, maxHeight, function (err, res) {
                    fileName = "".concat(saveActualPath, "-").concat(res.bitmap.width, "x").concat(res.bitmap.height, ".").concat(type);
                    res.quality(compressionQuality).writeAsync(path.join(downloadPath, fileName)).then(function (resWrite) {
                      resolve({
                        status: true,
                        fileName: fileName
                      });
                    });
                  });
                } else {
                  return lenna // resize
                  .quality(compressionQuality) // set JPEG quality
                  .writeAsync(path.join(downloadPath, fileName)).then(function (resWrite) {
                    resolve({
                      status: true,
                      fileName: fileName
                    });
                  });
                }
              })["catch"](function (err) {
                console.log(err);
                resolve({
                  status: false
                });
              });
            }
          }));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function imageCompression(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = imageCompression;