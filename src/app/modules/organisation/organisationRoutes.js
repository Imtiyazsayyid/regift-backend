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

// Organisation

router.route("/organisations").post(organisationController.saveOrganisation);

export default router;
