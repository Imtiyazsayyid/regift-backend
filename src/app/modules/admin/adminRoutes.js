import express from "express";
const router = express.Router();

import * as adminController from "./adminController";
// Donor
router.route("/donors").get(adminController.getAllDonors);
router.route("/donors").post(adminController.saveDonor);
router.route("/donor/:id").get(adminController.getSingleDonor);
router.route("/donor/:id").delete(adminController.deleteDonor);

// Organisation
router.route("/organisations").get(adminController.getAllOrganisations);
router.route("/organisations").post(adminController.saveOrganisation);
router.route("/organisation/:id").get(adminController.getSingleOrganisation);
router.route("/organisation/:id").delete(adminController.deleteOrganisation);

// Inventory
router.route("/inventories").get(adminController.getAllInventories);
router.route("/inventories").post(adminController.saveInventory);
router.route("/inventory/:id").get(adminController.getSingleInventory);
router.route("/inventory/:id").delete(adminController.deleteInventory);

// Category
router.route("/categories").get(adminController.getAllCategories);
router.route("/categories").post(adminController.saveCategory);
router.route("/category/:id").get(adminController.getSingleCategory);
router.route("/category/:id").delete(adminController.deleteCategory);

// Donated Item
router.route("/donated-items").get(adminController.getAllDonatedItems);
router.route("/donated-item/:id").get(adminController.getSingleDonatedItem);
router.route("/donated-item/:id").delete(adminController.deleteDonatedItem);

export default router;
