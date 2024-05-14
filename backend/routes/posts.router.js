import { Router } from "express";
import { verifyJWT } from "../middlewares/Authenticate.js";

import { upload } from "../middlewares/multer.js";
import { getTweets, tweetPost } from "../controllers/posts.controller.js";

const router = Router();


router.post('/postTweet', verifyJWT, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), tweetPost);

router.get('/getTweets',verifyJWT,getTweets);

export default router;