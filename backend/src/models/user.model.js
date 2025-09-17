import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema(
    {
        fullname : {
            type : String,
            required : true,
            minLength : 3,
        },
        username : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        blogs : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Blog"
        }
    }
    ,{timestamps : true}
)

export const User = mongoose.model("User",userSchema)