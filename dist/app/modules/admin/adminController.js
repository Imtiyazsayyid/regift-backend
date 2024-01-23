"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCategory = deleteCategory;
exports.deleteDonatedItem = deleteDonatedItem;
exports.deleteDonor = deleteDonor;
exports.deleteOrganisation = deleteOrganisation;
exports.getAdminDetails = getAdminDetails;
exports.getAllCategories = getAllCategories;
exports.getAllDonatedItems = getAllDonatedItems;
exports.getAllDonors = getAllDonors;
exports.getAllOrganisations = getAllOrganisations;
exports.getSingleCategory = getSingleCategory;
exports.getSingleDonatedItem = getSingleDonatedItem;
exports.getSingleDonor = getSingleDonor;
exports.getSingleOrganisation = getSingleOrganisation;
exports.saveCategory = saveCategory;
exports.saveDonatedItem = saveDonatedItem;
exports.saveDonor = saveDonor;
exports.saveOrganisation = saveOrganisation;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _statusTypes = _interopRequireDefault(require("../../../@core/enum/statusTypes"));
var _LoggingService = _interopRequireDefault(require("../../../@core/services/LoggingService"));
var _ResponseService = require("../../../@core/services/ResponseService");
var _prisma = _interopRequireDefault(require("../../../@core/helpers/prisma"));
var _commonHelpers = require("../../../@core/helpers/commonHelpers");
var _validationSchema = require("../validationSchema");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Admin Details
function getAdminDetails(_x, _x2) {
  return _getAdminDetails.apply(this, arguments);
} // Donor Functions
function _getAdminDetails() {
  _getAdminDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var admin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _prisma["default"].admin.findFirst();
        case 3:
          admin = _context.sent;
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, true, admin, "Success"));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getAllDonors", _context.t0);
          return _context.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getAdminDetails.apply(this, arguments);
}
function getAllDonors(_x3, _x4) {
  return _getAllDonors.apply(this, arguments);
}
function _getAllDonors() {
  _getAllDonors = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var searchText, where, donors;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          searchText = req.query.searchText;
          where = {};
          if (searchText) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              OR: [{
                firstName: {
                  contains: searchText
                }
              }, {
                lastName: {
                  contains: searchText
                }
              }, {
                email: {
                  contains: searchText
                }
              }]
            });
          }
          _context2.next = 6;
          return _prisma["default"].donor.findMany({
            where: where
          });
        case 6:
          donors = _context2.sent;
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, true, donors, "Success"));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getAllDonors", _context2.t0);
          return _context2.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _getAllDonors.apply(this, arguments);
}
function saveDonor(_x5, _x6) {
  return _saveDonor.apply(this, arguments);
}
function _saveDonor() {
  _saveDonor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, id, firstName, lastName, email, password, gender, profileImg, address, status, donorData, validation, savedDonor;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, id = _req$body.id, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, profileImg = _req$body.profileImg, address = _req$body.address, status = _req$body.status;
          donorData = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            gender: gender,
            profileImg: profileImg,
            address: address,
            status: status
          };
          validation = _validationSchema.donorSchema.safeParse(donorData);
          if (validation.success) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, false, donorData, "Error ", _statusTypes["default"].BAD_REQUEST));
        case 6:
          if (!donorData.id) {
            _context3.next = 12;
            break;
          }
          _context3.next = 9;
          return _prisma["default"].donor.update({
            data: donorData,
            where: {
              id: donorData.id
            }
          });
        case 9:
          savedDonor = _context3.sent;
          _context3.next = 15;
          break;
        case 12:
          _context3.next = 14;
          return _prisma["default"].donor.create({
            data: donorData
          });
        case 14:
          savedDonor = _context3.sent;
        case 15:
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, true, savedDonor, "Success"));
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in saveDonor", _context3.t0);
          return _context3.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return _saveDonor.apply(this, arguments);
}
function getSingleDonor(_x7, _x8) {
  return _getSingleDonor.apply(this, arguments);
}
function _getSingleDonor() {
  _getSingleDonor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, donor;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _commonHelpers.getIntOrNull)(id))) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Invalid Donor ID", _statusTypes["default"].BAD_REQUEST));
        case 4:
          _context4.next = 6;
          return _prisma["default"].donor.findUnique({
            where: {
              id: parseInt(id)
            }
          });
        case 6:
          donor = _context4.sent;
          return _context4.abrupt("return", (0, _ResponseService.sendResponse)(res, true, donor, "Success"));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getSingleDonor", _context4.t0);
          return _context4.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return _getSingleDonor.apply(this, arguments);
}
function deleteDonor(_x9, _x10) {
  return _deleteDonor.apply(this, arguments);
} // Organisation Functions
function _deleteDonor() {
  _deleteDonor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, deletedDonor;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _commonHelpers.getIntOrNull)(id))) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Invalid Donor ID", _statusTypes["default"].BAD_REQUEST));
        case 4:
          _context5.next = 6;
          return _prisma["default"].donor["delete"]({
            where: {
              id: parseInt(id)
            }
          });
        case 6:
          deletedDonor = _context5.sent;
          return _context5.abrupt("return", (0, _ResponseService.sendResponse)(res, true, deletedDonor, "Success"));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in deleteDonor", _context5.t0);
          return _context5.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return _deleteDonor.apply(this, arguments);
}
function getAllOrganisations(_x11, _x12) {
  return _getAllOrganisations.apply(this, arguments);
}
function _getAllOrganisations() {
  _getAllOrganisations = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$query, searchText, approvalStatus, where, organisations;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$query = req.query, searchText = _req$query.searchText, approvalStatus = _req$query.approvalStatus;
          where = {};
          if (searchText) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              OR: [{
                name: {
                  contains: searchText
                }
              }, {
                acronym: {
                  contains: searchText
                }
              }, {
                email: {
                  contains: searchText
                }
              }]
            });
          }
          if (approvalStatus) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              approvalStatus: approvalStatus
            });
          }
          _context6.next = 7;
          return _prisma["default"].organisation.findMany({
            where: where
          });
        case 7:
          organisations = _context6.sent;
          return _context6.abrupt("return", (0, _ResponseService.sendResponse)(res, true, organisations, "Success"));
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getAllOrganisations", _context6.t0);
          return _context6.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return _getAllOrganisations.apply(this, arguments);
}
function saveOrganisation(_x13, _x14) {
  return _saveOrganisation.apply(this, arguments);
}
function _saveOrganisation() {
  _saveOrganisation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$body2, id, name, acronym, email, password, websiteUrl, logo, address, approvalStatus, status, organisationData, validation, savedOrganisation;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name, acronym = _req$body2.acronym, email = _req$body2.email, password = _req$body2.password, websiteUrl = _req$body2.websiteUrl, logo = _req$body2.logo, address = _req$body2.address, approvalStatus = _req$body2.approvalStatus, status = _req$body2.status;
          organisationData = {
            id: id,
            name: name,
            acronym: acronym,
            email: email,
            password: password,
            websiteUrl: websiteUrl,
            logo: logo,
            address: address,
            approvalStatus: approvalStatus || null,
            status: status
          };
          validation = _validationSchema.organisationSchema.safeParse(organisationData);
          if (validation.success) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", (0, _ResponseService.sendResponse)(res, false, organisationData, "Error", _statusTypes["default"].BAD_REQUEST));
        case 6:
          if (!organisationData.id) {
            _context7.next = 12;
            break;
          }
          _context7.next = 9;
          return _prisma["default"].organisation.update({
            data: organisationData,
            where: {
              id: organisationData.id
            }
          });
        case 9:
          savedOrganisation = _context7.sent;
          _context7.next = 15;
          break;
        case 12:
          _context7.next = 14;
          return _prisma["default"].organisation.create({
            data: organisationData
          });
        case 14:
          savedOrganisation = _context7.sent;
        case 15:
          return _context7.abrupt("return", (0, _ResponseService.sendResponse)(res, true, organisationData, "Success"));
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in saveOrganisation", _context7.t0);
          return _context7.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return _saveOrganisation.apply(this, arguments);
}
function getSingleOrganisation(_x15, _x16) {
  return _getSingleOrganisation.apply(this, arguments);
}
function _getSingleOrganisation() {
  _getSingleOrganisation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, organisation;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _commonHelpers.getIntOrNull)(id))) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Invalid Organisation id", _statusTypes["default"].BAD_REQUEST));
        case 4:
          _context8.next = 6;
          return _prisma["default"].organisation.findUnique({
            where: {
              id: parseInt(id)
            }
          });
        case 6:
          organisation = _context8.sent;
          return _context8.abrupt("return", (0, _ResponseService.sendResponse)(res, true, organisation, "Success"));
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getSingleOrganisation", _context8.t0);
          return _context8.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return _getSingleOrganisation.apply(this, arguments);
}
function deleteOrganisation(_x17, _x18) {
  return _deleteOrganisation.apply(this, arguments);
} // Category
function _deleteOrganisation() {
  _deleteOrganisation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var id, deletedOrganisation;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _commonHelpers.getIntOrNull)(id))) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", (0, _ResponseService.sendResponse)(res, null, "Invalid Organisation id", _statusTypes["default"].BAD_REQUEST));
        case 4:
          _context9.next = 6;
          return _prisma["default"].organisation["delete"]({
            where: {
              id: parseInt(id)
            }
          });
        case 6:
          deletedOrganisation = _context9.sent;
          return _context9.abrupt("return", (0, _ResponseService.sendResponse)(res, true, deletedOrganisation, "Success"));
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in deleteOrganisation", _context9.t0);
          return _context9.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error ", _statusTypes["default"].DB_ERROR));
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return _deleteOrganisation.apply(this, arguments);
}
function getAllCategories(_x19, _x20) {
  return _getAllCategories.apply(this, arguments);
}
function _getAllCategories() {
  _getAllCategories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _prisma["default"].category.findMany();
        case 3:
          categories = _context10.sent;
          return _context10.abrupt("return", (0, _ResponseService.sendResponse)(res, true, categories, "Success"));
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in getAllCategories", _context10.t0);
          return _context10.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return _getAllCategories.apply(this, arguments);
}
function saveCategory(_x21, _x22) {
  return _saveCategory.apply(this, arguments);
}
function _saveCategory() {
  _saveCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          return _context11.abrupt("return", (0, _ResponseService.sendResponse)(res, true, null, "Api Not Ready Yet"));
        case 4:
          _context11.prev = 4;
          _context11.t0 = _context11["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in saveCategory", _context11.t0);
          return _context11.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 8:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 4]]);
  }));
  return _saveCategory.apply(this, arguments);
}
function getSingleCategory(_x23, _x24) {
  return _getSingleCategory.apply(this, arguments);
}
function _getSingleCategory() {
  _getSingleCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          return _context12.abrupt("return", (0, _ResponseService.sendResponse)(res, true, nul, "Api Not Ready Yet"));
        case 4:
          _context12.prev = 4;
          _context12.t0 = _context12["catch"](0);
          _LoggingService["default"].consoleErrorLog(res.originalUrl, "Error in getSingleCategory", _context12.t0);
          return _context12.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 8:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 4]]);
  }));
  return _getSingleCategory.apply(this, arguments);
}
function deleteCategory(_x25, _x26) {
  return _deleteCategory.apply(this, arguments);
} // DonatedItem
function _deleteCategory() {
  _deleteCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          return _context13.abrupt("return", (0, _ResponseService.sendResponse)(res, true, null, "Api Not Ready Yet"));
        case 4:
          _context13.prev = 4;
          _context13.t0 = _context13["catch"](0);
          _LoggingService["default"].consoleErrorLog(res.originalUrl, "Error in deleteCategory", _context13.t0);
          return _context13.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 8:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 4]]);
  }));
  return _deleteCategory.apply(this, arguments);
}
function getAllDonatedItems(_x27, _x28) {
  return _getAllDonatedItems.apply(this, arguments);
}
function _getAllDonatedItems() {
  _getAllDonatedItems = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var _req$query2, searchText, approvalStatus, categoryId, condition, availability, where, donatedItems;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _req$query2 = req.query, searchText = _req$query2.searchText, approvalStatus = _req$query2.approvalStatus, categoryId = _req$query2.categoryId, condition = _req$query2.condition, availability = _req$query2.availability;
          where = {};
          if (searchText) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              OR: [{
                title: {
                  contains: searchText
                }
              }]
            });
          }
          if (approvalStatus) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              approvalStatus: approvalStatus
            });
          }
          if (categoryId) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              categoryId: parseInt(categoryId)
            });
          }
          if (condition) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              condition: condition
            });
          }
          if (availability) {
            where = _objectSpread(_objectSpread({}, where), {}, {
              isAvailable: availability == "true" ? true : false
            });
          }
          _context14.next = 10;
          return _prisma["default"].donatedItem.findMany({
            include: {
              donor: true,
              category: true
            },
            where: where
          });
        case 10:
          donatedItems = _context14.sent;
          return _context14.abrupt("return", (0, _ResponseService.sendResponse)(res, true, donatedItems, "Success"));
        case 14:
          _context14.prev = 14;
          _context14.t0 = _context14["catch"](0);
          _LoggingService["default"].consoleErrorLog(res.originalUrl, "Error in getAllDonatedItems", _context14.t0);
          return _context14.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 18:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 14]]);
  }));
  return _getAllDonatedItems.apply(this, arguments);
}
function saveDonatedItem(_x29, _x30) {
  return _saveDonatedItem.apply(this, arguments);
}
function _saveDonatedItem() {
  _saveDonatedItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var _req$body3, id, title, image, condition, approvalStatus, categoryId, quantity, description, donorId, donatedItemData, validation, savedDonatedItem;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body3 = req.body, id = _req$body3.id, title = _req$body3.title, image = _req$body3.image, condition = _req$body3.condition, approvalStatus = _req$body3.approvalStatus, categoryId = _req$body3.categoryId, quantity = _req$body3.quantity, description = _req$body3.description, donorId = _req$body3.donorId;
          donatedItemData = {
            id: id,
            title: title,
            image: image,
            condition: condition,
            approvalStatus: approvalStatus,
            categoryId: categoryId,
            quantity: quantity,
            description: description,
            donorId: donorId
          };
          validation = _validationSchema.donatedItemSchema.safeParse(donatedItemData);
          if (validation.success) {
            _context15.next = 6;
            break;
          }
          return _context15.abrupt("return", (0, _ResponseService.sendResponse)(res, false, donatedItemData, "Error", _statusTypes["default"].BAD_REQUEST));
        case 6:
          if (!donatedItemData.id) {
            _context15.next = 12;
            break;
          }
          _context15.next = 9;
          return _prisma["default"].donatedItem.update({
            data: donatedItemData,
            where: {
              id: donatedItemData.id
            }
          });
        case 9:
          savedDonatedItem = _context15.sent;
          _context15.next = 15;
          break;
        case 12:
          _context15.next = 14;
          return _prisma["default"].donatedItem.create({
            data: donatedItemData
          });
        case 14:
          savedDonatedItem = _context15.sent;
        case 15:
          return _context15.abrupt("return", (0, _ResponseService.sendResponse)(res, true, savedDonatedItem, "Success"));
        case 18:
          _context15.prev = 18;
          _context15.t0 = _context15["catch"](0);
          _LoggingService["default"].consoleErrorLog(req.originalUrl, "Error in saveDonatedItem", _context15.t0);
          return _context15.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 22:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 18]]);
  }));
  return _saveDonatedItem.apply(this, arguments);
}
function getSingleDonatedItem(_x31, _x32) {
  return _getSingleDonatedItem.apply(this, arguments);
}
function _getSingleDonatedItem() {
  _getSingleDonatedItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var id, donatedItem;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _commonHelpers.getIntOrNull)(id))) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Invalid Donated Item ID", _statusTypes["default"].BAD_REQUEST));
        case 4:
          _context16.next = 6;
          return _prisma["default"].donatedItem.findUnique({
            where: {
              id: parseInt(id)
            }
          });
        case 6:
          donatedItem = _context16.sent;
          return _context16.abrupt("return", (0, _ResponseService.sendResponse)(res, true, donatedItem, "Success"));
        case 10:
          _context16.prev = 10;
          _context16.t0 = _context16["catch"](0);
          _LoggingService["default"].consoleErrorLog(res.originalUrl, "Error in getSingleDonatedItems", _context16.t0);
          return _context16.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 14:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return _getSingleDonatedItem.apply(this, arguments);
}
function deleteDonatedItem(_x33, _x34) {
  return _deleteDonatedItem.apply(this, arguments);
}
function _deleteDonatedItem() {
  _deleteDonatedItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          return _context17.abrupt("return", (0, _ResponseService.sendResponse)(res, true, null, "Api Not Ready Yet"));
        case 4:
          _context17.prev = 4;
          _context17.t0 = _context17["catch"](0);
          _LoggingService["default"].consoleErrorLog(res.originalUrl, "Error in deleteDonatedItems", _context17.t0);
          return _context17.abrupt("return", (0, _ResponseService.sendResponse)(res, false, null, "Error", _statusTypes["default"].DB_ERROR));
        case 8:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 4]]);
  }));
  return _deleteDonatedItem.apply(this, arguments);
}