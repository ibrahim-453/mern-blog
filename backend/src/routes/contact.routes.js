import express from "express";
import { createContact } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.route("/send-message").post(verifyJWT,createContact)

export default router;