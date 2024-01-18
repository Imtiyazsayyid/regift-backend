import express from "express";
const router = express.Router();

import * as adminController from "./adminController";

router.route("/donors").get(adminController.getAllDonors);
router.route("/donors").post(adminController.saveDonor);
router.route("/donor/:id").get(adminController.getSingleDonor);
router.route("/donor/:id").delete(adminController.deleteDonor);

router.route("/organisations").get(adminController.getAllOrganisations);
router.route("/organisations").post(adminController.saveOrganisation);
router.route("/organisations/:id").get(adminController.getSingleOrganisation);
router.route("/organisations/:id").delete(adminController.deleteOrganisation);

router.route("/inventory").get(adminController.getAllInventories);
router.route("/inventory").post(adminController.saveInventory);
router.route("/inventory/:id").get(adminController.getSingleInventory);
router.route("/inventory/:id").delete(adminController.deleteInventory);

export default router;
