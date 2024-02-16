import express from "express";
const router = express.Router();

import * as donorController from "./donorController";
import authRoutes from "../authentication/authenticationRoutes";
import donorMiddleware from "../../middlewares/donorMiddleware";

router.use("/auth", authRoutes);
router.use(donorMiddleware);

// Donor Details
router.route("/details").get(donorController.getDonorDetails);

// Donated Items
router.route("/donated-items").get(donorController.getAllDonatedItems);
router.route("/donated-item").post(donorController.saveDonatedItem);

// Categories
router.route("/categories").get(donorController.getAllCategories);

export default router;
