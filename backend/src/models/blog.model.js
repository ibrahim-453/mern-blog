import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        title : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
        bannerImage : {
            type : String,
            required : true
        },
        category : {
            type : String,
            required : true
        },
        slug : {
            type : String,
            required : true
        }
    }
    ,{timestamps : true}
)

export const Blog = mongoose.model("Blog",blogSchema)