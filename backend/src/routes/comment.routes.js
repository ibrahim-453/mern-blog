import express from 'express'
import {verifyJWT} from '../middlewares/auth.js'
import { createComment, deletecomment, editcomment, getallcomment, getcomment, likecomment } from '../controllers/comment.controller.js'

const router = express.Router()

router.route("/write-comment").post(verifyJWT,createComment)
router.route("/blog-comment/:blogId").get(verifyJWT,getcomment)
router.route("/comment-like/:commentId").put(verifyJWT,likecomment)
router.route("/edit-comment/:commentId").put(verifyJWT,editcomment)
router.route("/delete-comment/:commentId").delete(verifyJWT,deletecomment)
router.route("/get-comment").get(verifyJWT,getallcomment)
export default router