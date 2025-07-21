import { Router } from "express";
import { loginUser, 
    logoutUser,
     refreshAccessToken, 
    registerUser ,
    changedCurrentPassword,
    getCurrentUser,
    updateUserAvatar,
    updateUserCoverImage,
    getuserChannelprofile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser)

router.route("/login").post(loginUser)
// secured route
router.route("/logout").post(verifyJWT, logoutUser) 
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT ,changedCurrentPassword);
router.route("/user-detail").get(verifyJWT ,getCurrentUser);
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar") ,updateUserAvatar);
router.route("/update-cover-image").patch(verifyJWT ,upload.single("coverimage") ,updateUserCoverImage);
router.route("/c/:username").get( verifyJWT, getuserChannelprofile);
router.route("/watch-history").get(verifyJWT ,getWatchHistory);
export default router;