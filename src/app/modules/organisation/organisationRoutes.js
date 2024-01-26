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

export default router;
