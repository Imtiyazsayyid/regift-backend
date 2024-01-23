"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegister = exports.validateLogin = exports.checkEmail = void 0;
var checkEmail = exports.checkEmail = function checkEmail(value) {
  var emailRegex = /\S+@\S+\.\S+/;
  if (emailRegex.test(value)) {
    return true;
  }
  return false;
};
var validateLogin = exports.validateLogin = function validateLogin(body) {
  var isEmail = checkEmail(body.email);
  var isPassword = body.password && body.password.length < 40;
  if (isEmail && isPassword) {
    return true;
  } else {
    return false;
  }
};
var validateRegister = exports.validateRegister = function validateRegister(body) {
  var isEmail = checkEmail(body.email);
  var isPassword = body.password && body.password.length < 40;
  var isFirstname = body.firstname && body.firstname.length < 20;
  var isLastname = body.lastname && body.lastname.length < 20;
  var isMobile = body.mobile && body.mobile.length <= 12 && body.mobile.length >= 10 && !isNaN(body.mobile);
  if (isEmail && isPassword && isFirstname && isLastname && isMobile) {
    return true;
  } else {
    return false;
  }
};