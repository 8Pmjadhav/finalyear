import { Router } from "express";
import { verifyJWT } from "../middlewares/Authenticate.js";
import { deleteReply, doReply, editReply } from "../controllers/reply.controller.js";



const router = Router();


router.post('/post/:post_id/doReply',verifyJWT,doReply);
router.delete('/deleteReply/:reply_id',verifyJWT,deleteReply);
router.put('/editReply/:reply_id',verifyJWT,editReply);


export default router;