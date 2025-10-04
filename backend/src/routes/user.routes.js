import express from 'express'
import { verifyJWT } from '../middlewares/auth.js'
import { changepassword, changeprofilepic, deleteuser, getusers, resettoken, resettokenverification } from '../controllers/user.controller.js'
import upload from '../middlewares/multer.js'
const router = express.Router()

router.route("/reset-password-token").post(verifyJWT,resettoken)
router.route("/reset-password").post(verifyJWT,resettokenverification)
router.route("/change-password").post(verifyJWT,changepassword)
router.route("/change-profile-photo").post(verifyJWT,upload.single("profilepic"),changeprofilepic)
router.route("/get-users").get(verifyJWT,getusers)
router.route("/delete-user/:userId").delete(verifyJWT,deleteuser)
export default router