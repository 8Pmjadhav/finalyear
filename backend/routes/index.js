import { Router } from "express";
import userRoutes from './user.routes.js'
import profileRoutes from './profile.router.js'

const router = Router();

router.use('/profile',profileRoutes);
router.use('/user',userRoutes);


export default router;