"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var adminController = _interopRequireWildcard(require("./adminController"));
var _authenticationRoutes = _interopRequireDefault(require("../authentication/authenticationRoutes"));
var _adminMiddleware = _interopRequireDefault(require("../../middlewares/adminMiddleware"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();
router.use("/auth", _authenticationRoutes["default"]);
router.use(_adminMiddleware["default"]);

// Admin Detials
router.route("/details").get(adminController.getAdminDetails);

// Donor
router.route("/donors").get(adminController.getAllDonors);
router.route("/donors").post(adminController.saveDonor);
router.route("/donor/:id").get(adminController.getSingleDonor);
router.route("/donor/:id")["delete"](adminController.deleteDonor);

// Organisation
router.route("/organisations").get(adminController.getAllOrganisations);
router.route("/organisations").post(adminController.saveOrganisation);
router.route("/organisation/:id").get(adminController.getSingleOrganisation);
router.route("/organisation/:id")["delete"](adminController.deleteOrganisation);

// Category
router.route("/categories").get(adminController.getAllCategories);
router.route("/categories").post(adminController.saveCategory);
router.route("/category/:id").get(adminController.getSingleCategory);
router.route("/category/:id")["delete"](adminController.deleteCategory);

// Donated Item
router.route("/donated-items").get(adminController.getAllDonatedItems);
router.route("/donated-items").post(adminController.saveDonatedItem);
router.route("/donated-item/:id").get(adminController.getSingleDonatedItem);
router.route("/donated-item/:id")["delete"](adminController.deleteDonatedItem);
var _default = exports["default"] = router;