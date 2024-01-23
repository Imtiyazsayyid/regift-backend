"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminRoutes = _interopRequireDefault(require("./modules/admin/adminRoutes"));
// import accessMiddleware from "./middlewares/accessMiddleware";
// import homeRoutes from "./modules/home/homeRoutes";
// import userRoutes from "./modules/users/userRoutes";

var router = _express["default"].Router();
router.use("/api/admin", _adminRoutes["default"]);

// router.use('/user', accessMiddleware('user'), userRoutes);
// router.use('/home', accessMiddleware('home'), homeRoutes);
var _default = exports["default"] = router;