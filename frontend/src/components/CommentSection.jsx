import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { toast } from "react-toastify";

function CommentSection({ blogId }) {
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await fetch(`/api/v1/comment/write-comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, content: comment }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      toast.success(data.message);
      setComments((prev) => [...prev, data.data]);
      setComment("");
    } catch (error) {
      console.log("Something went wrong" || error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/blog-comment/${blogId}`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          setComments(data.data || []);
        }
      } catch (error) {
        console.log("Something went wrong" || error.message);
      }
    };
    getComments();
  }, [blogId]);

  const handleEdit = async (commentId, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id == commentId ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setComments(comments.filter((c) => c._id !== commentId));
  };

  return (
    <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
      {user ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <h3 className="font-semibold text-sm sm:text-base text-text dark:text-text-dark">
            Signed in as:
          </h3>
          <div className="bg-muted dark:bg-muted-dark flex items-center gap-2 sm:gap-3 py-2 px-3 sm:px-4 rounded-lg shadow-sm border border-border dark:border-border-dark">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              src={user.profilephoto}
              alt="profile"
            />
            <Link
              className="font-medium text-sm sm:text-base text-text dark:text-text-dark hover:text-accent-1 dark:hover:text-accent-1-dark transition"
              to="/profile-details"
            >
              @{user.username}
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-text-secondary dark:text-text-secondary-dark text-sm sm:text-base">
          You must{" "}
          <Link
            className="text-accent-1 dark:text-accent-1-dark hover:text-hover dark:hover:text-hover-dark underline"
            to="/sign-in"
          >
            Sign In
          </Link>
          &nbsp;to comment.
        </p>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-lg p-4 sm:p-5 shadow-sm space-y-3 sm:space-y-4"
        >
          <textarea
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            rows={3}
            placeholder="Add a comment..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-text dark:text-text-dark bg-muted dark:bg-muted-dark border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark focus:outline-none resize-none placeholder-text-secondary dark:placeholder-text-secondary-dark transition-all"
          />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark">
            <p>{200 - comment.length} characters remaining</p>
            <button
              type="submit"
              className="w-full sm:w-auto bg-accent-1 dark:bg-accent-1-dark text-white px-4 sm:px-5 py-2 rounded-lg font-medium hover:bg-hover dark:hover:bg-hover-dark transition-all"
            >
              Comment
            </button>
          </div>
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-text-secondary dark:text-text-secondary-dark text-sm sm:text-base">
          No comments yet
        </p>
      ) : (
        <>
          <div className="flex gap-2 sm:gap-3 items-center">
            <p className="text-sm sm:text-base font-semibold text-text dark:text-text-dark">
              Comments
            </p>
            <div className="border border-border dark:border-border-dark bg-muted dark:bg-muted-dark px-2 sm:px-3 py-0.5 sm:py-1 rounded">
              <p className="text-xs sm:text-sm font-medium text-text dark:text-text-dark">
                {comments.length}
              </p>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {comments.map((comment) => {
              return (
                <Comments
                  key={comment._id}
                  comment={comment}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CommentSection;
