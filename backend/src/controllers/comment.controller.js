import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Comment } from '../models/comment.js';

// CREATE COMMENT
const createComment = asyncHandler(async (req, res) => {
  const { content, blogId } = req.body;
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Login first to comment");
  if (!content) throw new ApiError(400, "Content is required");

  const comment = await Comment.create({
    content,
    userId,
    blogId
  });

  const populatedComment = await comment.populate("userId", "_id username profilephoto");

  return res.status(200).json(
    new ApiResponse(200, "Comment added", populatedComment)
  );
});

// GET BLOG COMMENTS
const getcomment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) throw new ApiError(404, "Blog not found");

  const comments = await Comment.find({ blogId })
    .sort({ createdAt: -1 })
    .populate("userId", "username profilephoto _id");

  return res.status(200).json(
    new ApiResponse(200, "Comments fetched", comments)
  );
});

// LIKE / UNLIKE COMMENT
const likecomment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!commentId) throw new ApiError(404, "Comment not found");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  const alreadyLiked = comment.likes.includes(userId);

  if (alreadyLiked) {
    comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
  } else {
    comment.likes.push(userId);
  }

  comment.numberOfLikes = comment.likes.length;
  await comment.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      alreadyLiked ? "Comment unliked" : "Comment liked",
      { likes: comment.numberOfLikes }
    )
  );
});

// EDIT COMMENT
const editcomment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  // only owner can edit
  if (comment.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  comment.content = content;
  await comment.save();

  return res.status(200).json(
    new ApiResponse(200, "Comment edited", comment)
  );
});

// DELETE COMMENT
const deletecomment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  // owner or admin only
  if (
    comment.userId.toString() !== userId.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Unauthorized");
  }

  await Comment.findByIdAndDelete(commentId);

  return res.status(200).json(
    new ApiResponse(200, "Comment deleted")
  );
});

// GET ALL COMMENTS (ADMIN)
const getallcomment = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Unauthorized");
  }

  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const order = req.query.order === "asc" ? 1 : -1;

  const comments = await Comment.find()
    .sort({ updatedAt: order })
    .skip(startIndex)
    .limit(limit)
    .populate("userId", "username profilephoto")
    .populate({
      path: "blogId",
      select: "title category bannerImage",
      populate: {
        path: "category",
        select: "name"
      }
    });

  const total = await Comment.countDocuments();

  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const lastMonth = await Comment.countDocuments({
    createdAt: { $gte: oneMonthAgo }
  });

  return res.status(200).json(
    new ApiResponse(200, "All comments fetched", {
      comments,
      total,
      lastMonth
    })
  );
});

export {
  createComment,
  getcomment,
  likecomment,
  editcomment,
  deletecomment,
  getallcomment
};
