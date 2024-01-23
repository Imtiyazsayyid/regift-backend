"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organisationSchema = exports.donorSchema = exports.donatedItemSchema = exports.categorySchema = void 0;
var _zod = _interopRequireDefault(require("zod"));
var allowedGenders = ["male", "female", "other"];
var donorSchema = exports.donorSchema = _zod["default"].object({
  firstName: _zod["default"].string({
    required_error: "First Name is required"
  }).min(2, "First Name is too short").max(100, "First Name is too long"),
  lastName: _zod["default"].string({
    required_error: "Last Name is required"
  }).min(2, "Last Name is too short").max(100, "Last Name is too long"),
  email: _zod["default"].string({
    required_error: "Email is required"
  }).email(),
  password: _zod["default"].string({
    required_error: "Password is required"
  }).min(3, "Password is too short").max(45, "Password is too long"),
  gender: _zod["default"].string({
    required_error: "Gender is required"
  }).refine(function (data) {
    return allowedGenders.includes(data);
  }, {
    message: "Invalid gender"
  })
});
var allowedApprovalStatus = ["pending", "approved", "rejected"];
var organisationSchema = exports.organisationSchema = _zod["default"].object({
  name: _zod["default"].string({
    required_error: "Name is required"
  }).min(2, "Name is too short").max(100, "Name is too long"),
  email: _zod["default"].string({
    required_error: "Email is required"
  }).email(),
  password: _zod["default"].string({
    required_error: "Password is required"
  }).min(3, "Password is too short").max(45, "Password is too long"),
  websiteUrl: _zod["default"].string({
    required_error: "Website is required"
  }),
  address: _zod["default"].string({
    required_error: "Address is required"
  }).min(5, "Address is too short").max(255, "Address is too long")
});
var allowedCondtions = ["new", "like_new", "used_good", "used_fair", "used_poor"];
var donatedItemSchema = exports.donatedItemSchema = _zod["default"].object({
  title: _zod["default"].string({
    required_error: "Title is required"
  }).min(2, "Title is too short").max(100, "Title is too long"),
  image: _zod["default"].string({
    required_error: "Image is required"
  }),
  quantity: _zod["default"].number({
    required_error: "Quantity is required"
  }),
  condition: _zod["default"].string({
    required_error: "Condition is required"
  }).refine(function (data) {
    return allowedCondtions.includes(data);
  }, {
    message: "Invalid condition"
  }),
  approvalStatus: _zod["default"].string({
    required_error: "Approval Status is required"
  }).refine(function (data) {
    return allowedApprovalStatus.includes(data);
  }, {
    message: "Invalid approval status"
  }),
  categoryId: _zod["default"].number({
    required_error: "Category is required"
  }),
  donorId: _zod["default"].number({
    required_error: "User Id is required"
  })
});
var categorySchema = exports.categorySchema = _zod["default"].object({
  name: _zod["default"].string({
    required_error: "Name is required"
  }).min(2, "Name is too small").max(100, "Name is too long"),
  key: _zod["default"].string({
    required_error: "Key is required"
  }).min(2, "Key is too small").max(50, "Key is too long"),
  donationItems: _zod["default"].array(donatedItemSchema)
});