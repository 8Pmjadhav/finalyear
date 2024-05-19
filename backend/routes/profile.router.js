import { Router } from "express";
import { getProfile, updateAvatar, updateBackcover, updateDescription, updateProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route('/profile').get(getProfile);
router.route('/updateProfile').put(upload.fields([
    {
        name:'avatar'
    },
    {
        name:'backcover'
    }
]),updateProfile);
router.route('/updateAvatar').put(upload.single("avatar"),updateAvatar);
router.route('/updateBackcover').put(upload.single("backcover"),updateBackcover);
router.route('/updateDescription').put(updateDescription);



export default router;