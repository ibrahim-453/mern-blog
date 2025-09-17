import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHander from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHander(async(req,res,next)=>{
    try {
        let token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
        let decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        let user = await User.findOne({email : decoded?.email}).select("-password")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(400,error?.message || "Unauthorized Request")
    }
})

export {verifyJWT}