import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        content:{
            type : String,
            required : true
        },
        blogId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Blog",
            required : true
        },
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        likes:{
            type : [mongoose.Schema.Types.ObjectId],
            ref : "User",
            default : []
        },
        numberOfLikes:{
            type : Number,
            default : 0
        }
    },{timestamps : true})

    export const Comment = mongoose.model("Comment",commentSchema)