import express from 'express';
import accessMiddleware from './middlewares/accessMiddleware';
import homeRoutes from './modules/home/homeRoutes';
import userRoutes from './modules/users/userRoutes';

const router = express.Router();

router.use('/user', accessMiddleware('user'), userRoutes);
router.use('/home', accessMiddleware('home'), homeRoutes);

export default router;