"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = decrypt;
exports.encrypt = encrypt;
exports.hash = hash;
var _crypto = _interopRequireDefault(require("crypto"));
var _LoggingService = _interopRequireDefault(require("../services/LoggingService"));
var algorithm = 'aes-128-ccm';
var iv = Buffer.from(process.env.ENCRYPT_IV, 'hex');
var key = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
function hash(plainText) {
  try {
    return _crypto["default"].createHash('md5').update(plainText).digest('hex');
  } catch (error) {
    _LoggingService["default"].consoleErrorLog('core SECURITY', 'Error in hash', error);
    return null;
  }
}
function encrypt(plainText) {
  try {
    var crypt = _crypto["default"].createCipheriv(algorithm, key, iv).update(plainText);
    return Buffer.concat([crypt]).toString('hex');
  } catch (error) {
    _LoggingService["default"].consoleErrorLog('core SECURITY', 'Error in hash', error);
    return null;
  }
}
function decrypt(cipherText) {
  try {
    var encryptedText = Buffer.from(cipherText, 'hex');
    var _decrypt = _crypto["default"].createDecipheriv(algorithm, key, iv).update(encryptedText);
    return Buffer.concat([_decrypt]).toString();
  } catch (error) {
    _LoggingService["default"].consoleErrorLog('core SECURITY', 'Error in hash', error);
    return null;
  }
}