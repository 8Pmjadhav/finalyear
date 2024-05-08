import { Router } from "express";
import {register,login,logout, refreshAccessToken, getCurrentUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/Authenticate.js";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',verifyJWT,logout);
router.post('/refreshToken',refreshAccessToken);
router.get('/getCurrentUser',verifyJWT,getCurrentUser);


export default router;