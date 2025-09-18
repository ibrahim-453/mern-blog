import express from "express";
import { googleauth, signin, signout, signup } from "../controllers/signup.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.route("/sign-up").post(signup);
router.route("/sign-in").post(signin);
router.route("/google-auth").post(googleauth)
router.route("/sign-out").post(verifyJWT,signout);

export default router;
