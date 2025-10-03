import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            unique : true,
            trim : true,
            match: [/^[a-zA-Z0-9 ]+$/, "Category name can only contain letters, numbers, and spaces"]
        }
    }
)

export const Category = mongoose.model("Category",categorySchema) 