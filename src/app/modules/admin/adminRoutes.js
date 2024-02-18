import express from "express";
const router = express.Router();

import * as adminController from "./adminController";
import authRoutes from "../authentication/authenticationRoutes";
import adminMiddleware from "../../middlewares/adminMiddleware";

router.use("/auth", authRoutes);
router.use(adminMiddleware);

// Admin Detials
router.route("/details").get(adminController.getAdminDetails);

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

// Category
router.route("/categories").get(adminController.getAllCategories);
router.route("/categories").post(adminController.saveCategory);
router.route("/category/:id").get(adminController.getSingleCategory);
router.route("/category/:id").delete(adminController.deleteCategory);

// Donated Item
router.route("/donated-items").get(adminController.getAllDonatedItems);
router.route("/donated-items").post(adminController.saveDonatedItem);
router.route("/donated-item/:id").get(adminController.getSingleDonatedItem);
router.route("/donated-item/:id").delete(adminController.deleteDonatedItem);

// orders
router.route("/orders").get(adminController.getAllOrders);
router.route("/orders").post(adminController.saveOrder);
router.route("/order/:id").get(adminController.getSingleOrder);
router.route("/order/:id").delete(adminController.deleteOrder);

// charts
router.route("/chart-orders").get(adminController.chartOrders);
router.route("/chart-donors").get(adminController.chartDonors);
router.route("/chart-organisations").get(adminController.chartOrganisations);
router.route("/chart-donations").get(adminController.chartDonations);

export default router;
