import express from "express";
const router = express.Router();

import * as adminController from "./adminController";

router.route("/users").get(adminController.getAllUsers);
router.route("/users").post(adminController.saveUser);
router.route("/users/:id").get(adminController.getSingleUser);
router.route("/users/:id").delete(adminController.deleteUser);

export default router;
