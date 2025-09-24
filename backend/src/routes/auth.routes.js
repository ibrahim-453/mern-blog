import express from "express";
import { googleauth, signin, signout, signup } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/sign-up").post(upload.single("profilepic"),signup);
router.route("/sign-in").post(signin);
router.route("/google-auth").post(googleauth)
router.route("/sign-out").post(verifyJWT,signout);

export default router;
