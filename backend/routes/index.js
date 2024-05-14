import { Router } from "express";
import userRoutes from './user.routes.js'
import profileRoutes from './profile.router.js'
import postRoutes from './posts.router.js'

const router = Router();

router.use('/profile',profileRoutes);
router.use('/user',userRoutes);
router.use('/posts',postRoutes);

  

export default router;