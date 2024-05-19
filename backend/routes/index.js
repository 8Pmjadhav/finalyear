import { Router } from "express";
import userRoutes from './user.routes.js'
import profileRoutes from './profile.router.js'
import postRoutes from './posts.router.js'
import replyRoutes from './reply.router.js'
import followRoutes from './follow.router.js'
import { verifyJWT } from "../middlewares/Authenticate.js";

const router = Router();

router.use('/profile',verifyJWT,profileRoutes);
router.use('/user',userRoutes);
router.use('/posts',verifyJWT,postRoutes);
router.use('/reply',verifyJWT,replyRoutes);
router.use('/follow',verifyJWT,followRoutes);

  

export default router;