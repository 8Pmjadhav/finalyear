import { Router } from "express";
import { follow_un_User, getPeople } from "../controllers/follow.controller.js";


const router = Router();

router.post('/follow_un_User',follow_un_User);
router.get('/getPeople',getPeople);     // followers , followings






export default router;