import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const createComment = asyncHandler( async(req,res)=>{
    let{content,userId,blogId} = req.body

    if(userId !== req.user._id){
        throw new ApiError(400,"Unathorized Request")
    }
    if(content == ""){
        throw new ApiError(400,"Please fill all the fields")
    }
   const comment = await Comment({
    content,
    userId,
    blogId
   })

   return res
   .status(200)
   .json(
    new ApiResponse(200,"Commented",comment)
   )
})