import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { Comment } from '../models/comment.js'

const createComment = asyncHandler( async(req,res)=>{
    let{content,blogId} = req.body
    let userId = req.user._id

    if(!userId){
        throw new ApiError(400,"Login First to comment")
    }
    if(!content){
        throw new ApiError(400,"Please fill all the fields")
    }
   const comment = await Comment.create({
    content,
    userId,
    blogId
   })
   const populatedComment = await comment.populate("userId", "_id username profilephoto");

   return res
   .status(200)
   .json(
    new ApiResponse(200,"Commented",populatedComment)
   )
})

const getcomment = asyncHandler(async (req,res)=>{
    let {blogId} = req.params
    if(!blogId){
        throw new ApiError(404,"Comment on Blog not Found")
    }
    const comments = await Comment.find({blogId}).sort({createdAt:-1}).populate("userId","username profilephoto _id")

    return res 
    .status(200)
    .json(
        new ApiResponse(200,"Blog Comment fetched",comments)
    )
})

const likecomment = asyncHandler(async (req,res)=>{
    let{commentId} = req.params
    let userId = req.user._id
    if(!commentId){
        throw new ApiError(404,"Comment Not Found")
    }
    const comment = await Comment.findById(commentId)
    const alreadyliked = comment.likes.includes(userId)
    if(alreadyliked){
        comment.likes = comment.likes.filter((id)=>id.toString() !== userId.toString())
        comment.numberOfLikes = comment.likes.length
    }
    else{
        comment.likes.push(userId)
    }
    comment.numberOfLikes = comment.likes.length
    await comment.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,alreadyliked ? "Unliked Comment" : "Liked Comment",{likes:comment.numberOfLikes})
    )
})

const editcomment = asyncHandler(async (req,res)=>{
    let{content} = req.body
    let {commentId} = req.params
    let userId = req.user._id

    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404,"Comment not found")
    }
    if(comment.userId.toString() !== userId.toString()){
        throw new ApiError(400,"Unauthorized Request")
    }
    const editedcomment = await Comment.findByIdAndUpdate(
        commentId,
        {
            content
        },
        {new : true}
    )
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Comment Edited",editedcomment)
    )
})

const deletecomment = asyncHandler(async (req,res)=>{
    let {commentId} = req.params
    let userId = req.user._id
    if(!userId && req.user.role !== "admin"){
        throw new ApiError(400,"Unauthorized request")
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if(!deletedComment){
        throw new ApiError(404,"Comment Not Found")
    }
    return res 
    .status(200)
    .json(
        new ApiResponse(200,"Comment deleted")
    ) 
})

const getallcomment = asyncHandler(async (req,res)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(400,"Unauthorized Request")
    }
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.order=="asc" ? 1 : -1

    const comments = await Comment.find()
    .sort({updatedAt : sortDirection})
    .skip(startIndex)
    .limit(limit)
    .populate("userId","username profilephoto")
    .populate({
        path : "blogId",
        select : "title category bannerImage",
        populate : {
            path : "category",
            select : "name"
        }
    })

    const totalcomment = await Comment.countDocuments()
    const now = new Date()
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() -1,
        now.getDate()
    )
    const lastMonth = await Comment.countDocuments({
        createdAt : {$gte:oneMonthAgo}
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Comments Fetched",{comments,totalcomment,lastMonth})
    )
})

export {createComment, getcomment, likecomment, editcomment, deletecomment, getallcomment}