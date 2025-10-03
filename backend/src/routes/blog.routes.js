import express from 'express'
import { createblog, deleteblog, editblog, getblog } from '../controllers/blog.controller.js'
import { verifyJWT } from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'

const router = express.Router()

router.route("/get-blog").get(getblog)
router.route("/create-blog").post(verifyJWT,upload.single("bannerImage"),createblog)
router.route("/edit-blog/:blogId").put(verifyJWT,upload.single("bannerImage"),editblog)
router.route("/delete-blog/:blogId").delete(verifyJWT,deleteblog)

export default router