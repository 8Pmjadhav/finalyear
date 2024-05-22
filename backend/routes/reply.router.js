import { Router } from "express";
import { deleteReply, doReply, editReply, getUserReplies, likeReply } from "../controllers/reply.controller.js";



const router = Router();


router.post('/post/:post_id/doReply',doReply);
router.delete('/deleteReply/:reply_id',deleteReply);
router.put('/editReply/:reply_id',editReply);
router.get('/getUserReplies',getUserReplies);
router.delete('/likeReply/:reply_id',likeReply);


export default router;