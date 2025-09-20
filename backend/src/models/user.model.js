import mongoose from 'mongoose'



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
        profilephoto : {
            type : String,
            default : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
        },
        blogs : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Blog"
        }
    }
    ,{timestamps : true}
)

export const User = mongoose.model("User",userSchema)