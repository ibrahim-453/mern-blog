import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullname : {
            type : String,
            required : true,
            minLength : 3
        },
        username : {
            type : String,
            required : true,
            unique : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true,
            minLength : 8,
            maxLength : 12
        },
        blogs : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Blog"
        }
    }
    ,{timestamps : true}
)

export const User = mongoose.model("User",userSchema)