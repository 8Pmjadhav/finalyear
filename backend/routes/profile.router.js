import { Router } from "express";
import { verifyJWT } from "../middlewares/Authenticate.js";
import { getProfile, updateAvatar, updateBackcover, updateDescription, updateProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route('/profile').get(verifyJWT,getProfile);
router.route('/updateProfile').put(verifyJWT,upload.fields([
    {
        name:'avatar'
    },
    {
        name:'backcover'
    }
]),updateProfile);
router.route('/updateAvatar').put(verifyJWT,upload.single("avatar"),updateAvatar);
router.route('/updateBackcover').put(verifyJWT,upload.single("backcover"),updateBackcover);
router.route('/updateDescription').put(verifyJWT,updateDescription);



export default router;