import express from "express";
import { registerUser, verifyOtp, userlogin, userProfile } from "../controller/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify", verifyOtp);
router.post("/user/login", userlogin);
router.get("/user/profile", isAuth, userProfile);

export default router;