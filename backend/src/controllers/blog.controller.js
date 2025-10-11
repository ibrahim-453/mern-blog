import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { Category } from "../models/category.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const createblog = asyncHandler(async (req, res) => {
  let { title, content, categoryName } = req.body;
  let userId = req.user._id;
  if (!title || !content || !categoryName) {
    throw new ApiError(400, "Please Fill All The Fields");
  }
  let category = await Category.findOne({ name: categoryName });
  if (!category) {
    category = await Category.create({ name: categoryName });
  }
  let bannerImageLocalPath = req.file?.path;
  if (!bannerImageLocalPath) {
    throw new ApiError(400, "Banner Image not Found");
  }
  let bannerImage = await uploadOnCloudinary(bannerImageLocalPath);
  let slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  let blogCreated = await Blog.create({
    userId,
    title,
    category: category._id,
    content,
    bannerImage: bannerImage.url,
    slug,
  });

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { blogs: blogCreated._id },
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog Created", blogCreated));
});

const getblog = asyncHandler(async (req, res) => {
  const startIndex = parseInt(req.query.startIndex) || 0
  const limit = parseInt(req.query.limit) || 9
  const sortDirection = req.query.order === 'asc' ? 1 : -1

  const blog = await Blog.find({
    ...(req.query.userId && { userId:req.query.userId }),
    ...(req.query.categoryName && { category:req.query.categoryName }),
    ...(req.query.blogId && { _id:req.query.blogId }),
    ...(req.query.slug && { slug:req.query.slug }),
    ...(req.query.searchTerm && {
      $or: [
        {title : {$regex:req.query.searchTerm, $options:'i'}},
        {content : {$regex:req.query.searchTerm, $options:'i'}}
      ]
    })
  })
  .sort({updatedAt:sortDirection})
  .skip(startIndex)
  .limit(limit)
  .populate("userId","fullname username profilephoto")
  .populate("category","name")

  const totalBlogs = await Blog.countDocuments()

  const now = new Date()

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  )

  const lastMonth = await Blog.countDocuments({
    createdAt : { $gte:oneMonthAgo }
  })

  return res
  .status(200)
  .json(
    new ApiResponse(200,"Blog Fetched",{blog,totalBlogs,lastMonth})
  )

});

const editblog = asyncHandler(async (req, res) => {
  let { blogId } = req.params;
  let { title, content, categoryName } = req.body;
  let userId = req.user._id;

  let blog = await Blog.findById(blogId).populate("userId");
  if (blog.userId._id.toString() !== userId.toString() && req.user.role !=="admin") {
    throw new ApiError(400, "Unaothorized Request");
  }

  if (!blogId) {
    throw new ApiError(404, "Blog Not Found");
  }
  if (!title || !content || !categoryName) {
    throw new ApiError(400, "Please Fill All The Fields");
  }

  let category = await Category.findOne({ name: categoryName });
  if (!category) {
    category = await Category.create({
      name: categoryName,
    });
  }
  let bannerImage = blog.bannerImage;
  let bannerImageLocalPath = req.file?.path;
  if (bannerImageLocalPath) {
    let newbannerImage = await uploadOnCloudinary(bannerImageLocalPath);
    bannerImage = newbannerImage.url;
  }

  let updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      title,
      content,
      category: category._id,
      bannerImage,
    },
    {
      new: true,
    }
  );
  return res
  .status(200)
  .json(
    new ApiResponse(200,"Blog Updated",updatedBlog)
  )
});

const deleteblog = asyncHandler(async (req, res) => {
  let { blogId } = req.params;
  let userId = req.user._id;

  let blog = await Blog.findById(blogId).populate("userId");
  if (blog.userId._id.toString() !== userId.toString() && req.user.role !=="admin") {
    throw new ApiError(400, "Unaothorized Request");
  }
  const deletedBlog = await Blog.findByIdAndDelete(blogId);
  await User.findByIdAndUpdate(blog.userId, {
    $pull: {
      blogs: blogId,
    },
  });

  return res.status(200).json(new ApiResponse(200, "Blog Deleted"));
});

export {
  createblog,
  getblog,
  editblog,
  deleteblog,
};
