import express from "express";
const router = express.Router();

import * as adminController from "./adminController";

router.route("/donors").get(adminController.getAllDonors);
router.route("/donors").post(adminController.saveDonor);
router.route("/donor/:id").get(adminController.getSingleDonor);
router.route("/donor/:id").delete(adminController.deleteDonor);

export default router;
