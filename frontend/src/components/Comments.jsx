import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

function Comments({ comment, onEdit, onDelete }) {
  const { user } = useSelector((state) => state.auth);
  const [likes, setLikes] = useState(false);
  const [numberoflikes, setNumberOfLikes] = useState(comment.numberoflikes || 0);
  const [isEdit, setIsEdit] = useState(false);
  const [editcomment, setEditComment] = useState("");
  const handleLike = async (commentId) => {
    try {
      const res = await fetch(`/api/v1/comment/comment-like/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setLikes(!likes);
        setNumberOfLikes(data.data.likes);
      }
    } catch (error) {
      console.log("Something went wrong" || error.message);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEditComment(comment.content);
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/v1/comment/delete-comment/${commentId}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      onDelete(commentId);
    } catch (error) {
      console.log("Delete failed:", error.message);
    }
  };

  const handleUpdate = async (commentId) => {
    try {
      const res = await fetch(`/api/v1/comment/edit-comment/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editcomment })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      onEdit(commentId, data.data.content);
      setIsEdit(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full p-4 sm:p-5 border border-border dark:border-border-dark rounded-xl bg-card dark:bg-card-dark shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          src={comment.userId?.profilephoto}
          alt={comment.userId?.username}
        />
        <div className="flex flex-col">
          <h4 className="text-sm sm:text-base font-semibold text-text dark:text-text-dark">
            @{comment.userId?.username}
          </h4>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {isEdit ? (
        <div className="space-y-3">
          <textarea
            maxLength={200}
            onChange={(e) => setEditComment(e.target.value)}
            value={editcomment}
            rows={3}
            placeholder="Edit your comment..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-text dark:text-text-dark bg-muted dark:bg-muted-dark border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark focus:outline-none resize-none placeholder-text-secondary dark:placeholder-text-secondary-dark transition-all"
          />
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => handleUpdate(comment._id)}
              type="button"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-accent-1 dark:bg-accent-1-dark text-white font-medium rounded-lg hover:bg-hover dark:hover:bg-hover-dark transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setIsEdit(false)}
              type="button"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-muted dark:bg-muted-dark text-text dark:text-text-dark font-medium rounded-lg border border-border dark:border-border-dark hover:bg-border dark:hover:bg-border-dark transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm sm:text-base text-text dark:text-text-dark mb-3 sm:mb-4 leading-relaxed">
          {comment.content}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 border-t border-border dark:border-border-dark">
        <button
          onClick={() => handleLike(comment._id)}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            likes
              ? "bg-accent-1 dark:bg-accent-1-dark text-white"
              : "bg-muted dark:bg-muted-dark text-text-secondary dark:text-text-secondary-dark hover:bg-border dark:hover:bg-border-dark"
          }`}
        >
          <ThumbsUp size={14} className="sm:w-4 sm:h-4" />
          <span>{likes ? "Unlike" : "Like"}</span>
          {numberoflikes > 0 && (
            <span className="ml-1 px-1.5 sm:px-2 py-0.5 bg-bg-primary dark:bg-bg-primary-dark rounded text-xs">
              {numberoflikes}
            </span>
          )}
        </button>

        {user && user._id == comment.userId._id && (
          <>
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-muted dark:bg-muted-dark text-text-secondary dark:text-text-secondary-dark rounded-lg hover:bg-border dark:hover:bg-border-dark hover:text-text dark:hover:text-text-dark transition-all"
            >
              <Edit2 size={14} className="sm:w-4 sm:h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDelete(comment._id)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-muted dark:bg-muted-dark text-error dark:text-error-dark rounded-lg hover:bg-error/10 dark:hover:bg-error-dark/10 transition-all"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" />
              <span>Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Comments;