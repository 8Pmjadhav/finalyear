import { Router } from "express";

import { upload } from "../middlewares/multer.js";
import { deletePost, editTweet, getTweets, likePost, tweetPost, viewTweet } from "../controllers/posts.controller.js";

const router = Router();


router.post('/postTweet', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), tweetPost);

router.get('/getTweets',getTweets);
router.delete('/deleteTweet/:post_id',deletePost);
router.get('/viewTweet/:post_id',viewTweet);
router.delete('/likeTweet/:post_id',likePost);
router.put('/editTweet/:post_id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]),editTweet)


export default router;