import express from "express";
// import accessMiddleware from "./middlewares/accessMiddleware";
// import homeRoutes from "./modules/home/homeRoutes";
// import userRoutes from "./modules/users/userRoutes";
import adminRoutes from "./modules/admin/adminRoutes";
import organisationRoutes from "./modules/organisation/organisationRoutes";

const router = express.Router();

router.use("/api/admin", adminRoutes);
router.use("/api/organisation", organisationRoutes);

// router.use('/user', accessMiddleware('user'), userRoutes);
// router.use('/home', accessMiddleware('home'), homeRoutes);

export default router;
