import { Router } from "express";
import { verifyJWT } from "../middlewares/Authenticate.js";

import { upload } from "../middlewares/multer.js";
import { tweetPost } from "../controllers/posts.controller.js";

const router = Router();

router.post('/post',verifyJWT,tweetPost);

export default router;