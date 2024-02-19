import express from "express";
const router = express.Router();

import * as donorController from "./donorController";
import authRoutes from "../authentication/authenticationRoutes";
import donorMiddleware from "../../middlewares/donorMiddleware";

router.use("/auth", authRoutes);

router.route("/register").post(donorController.register);

router.route("/send-otp").post(donorController.sendOTP);
router.route("/verify-otp").post(donorController.verifyOTP);
router.route("/reset-password").post(donorController.resetPassword);

router.use(donorMiddleware);

// Donor Details
router.route("/details").get(donorController.getDonorDetails);
router.route("/delete").delete(donorController.deleteDonor);
router.route("/donors").post(donorController.saveDonor);

// Donated Items
router.route("/donated-items").get(donorController.getAllDonatedItems);
router.route("/donated-item").post(donorController.saveDonatedItem);

// Categories
router.route("/categories").get(donorController.getAllCategories);

export default router;
