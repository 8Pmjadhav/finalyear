import { Router } from "express";
import { verifyJWT } from "../middlewares/Authenticate.js";
import { deleteReply, doReply } from "../controllers/reply.controller.js";



const router = Router();


router.post('/post/:post_id/doReply',verifyJWT,doReply);
router.delete('/deleteReply/:reply_id',verifyJWT,deleteReply);


export default router;