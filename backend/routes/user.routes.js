import { Router } from "express";
import {register,login,logout, refreshAccessToken, getCurrentUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/Authenticate.js";
import { verifyOTPbeforeSignUp,ForgotPasswordGetOTP } from "../controllers/email.controller.js";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',verifyJWT,logout);
router.post('/refreshToken',refreshAccessToken);
router.get('/getCurrentUser',verifyJWT,getCurrentUser);

router.post('/verifyOTP', verifyOTPbeforeSignUp);
router.post('/forgotPassword/getOTP',ForgotPasswordGetOTP);
// router.post('/forgotPassword/verifyOTP',ForgotPasswordverifyOTP);



export default router;