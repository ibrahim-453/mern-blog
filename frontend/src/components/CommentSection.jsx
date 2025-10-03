import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentSection({ blogId }) {
  const { user } = useSelector((state) => state.auth);
  const [comment,setComment] = useState("")
  return (
    <div className="max-w-md w-full space-y-4">
  {user ? (
    <div className="flex items-center gap-3">
      <h3 className="font-semibold text-gray-700">Signed in as:</h3>
      <div className="bg-blue-100 flex items-center gap-2 py-2 px-3 rounded-lg shadow-sm">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user.profilephoto}
          alt="profile"
        />
        <Link
          className="font-medium text-gray-700 hover:text-blue-600 transition"
          to="/profile-details"
        >
          @{user.username}
        </Link>
      </div>
    </div>
  ) : (
    <p className="text-gray-600 text-sm">
      You must <Link className="text-blue-600 hover:underline" to="/sign-in">Sign In</Link> 
      &nbsp;to comment.
    </p>
  )}

  {user && (
    <form
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3"
    >
      <textarea
        maxLength={200}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        rows={3}
        placeholder="Add a message..."
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
      />
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>{200 - comment.length} characters remaining</p>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Comment
        </button>
      </div>
    </form>
  )}
</div>

  );
}

export default CommentSection;
