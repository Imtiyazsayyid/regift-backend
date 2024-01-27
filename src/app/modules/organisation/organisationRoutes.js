import express from "express";
const router = express.Router();

import * as organisationController from "./organisationController";
import authRoutes from "../authentication/authenticationRoutes";
import organisationMiddleware from "../../middlewares/organisationMiddleware";

router.use("/auth", authRoutes);
router.use(organisationMiddleware);

// Organisation Details
router.route("/details").get(organisationController.getOrganisationDetails);

// Donated Items
router.route("/donated-items").get(organisationController.getAllDonatedItems);
router.route("/donated-item/:id").get(organisationController.getSingleDonatedItem);

// Category
router.route("/categories").get(organisationController.getAllCategories);

// Cart
router.route("/cart-items").get(organisationController.getAllCartItems);
router.route("/cart-items").post(organisationController.saveCartItem);
router.route("/cart-item/:id").get(organisationController.getSingleCartItem);
router.route("/cart-item/:id").delete(organisationController.deleteCartItem);

export default router;
