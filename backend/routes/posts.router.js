import { Router } from "express";
import { verifyJWT } from "../middlewares/Authenticate.js";

import { upload } from "../middlewares/multer.js";
import { deletePost, editTweet, getTweets, likePost, tweetPost, viewTweet } from "../controllers/posts.controller.js";

const router = Router();


router.post('/postTweet', verifyJWT, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), tweetPost);

router.get('/getTweets',verifyJWT,getTweets);
router.delete('/deleteTweet/:post_id',verifyJWT,deletePost);
router.get('/viewTweet/:post_id',verifyJWT,viewTweet);
router.delete('/likeTweet/:post_id',verifyJWT,likePost);
router.put('/editTweet/:post_id',verifyJWT, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]),editTweet)


export default router;