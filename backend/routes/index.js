import { Router } from "express";
import userRoutes from './user.routes.js'
import profileRoutes from './profile.router.js'
import postRoutes from './posts.router.js'
import replyRoutes from './reply.router.js'

const router = Router();

router.use('/profile',profileRoutes);
router.use('/user',userRoutes);
router.use('/posts',postRoutes);
router.use('/reply',replyRoutes);

  

export default router;