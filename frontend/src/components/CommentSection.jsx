import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./Comments";

function CommentSection({ blogId }) {
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await fetch("/api/v1/comment/write-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId,content:comment }),
        credentials : "include"
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      }
      alert(data.message);
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
          alert(data.message);
        } else {
          setComments(data.data || []);
        }
      } catch (error) {
        console.log("Something went wrong" || error.message);
      }
    };
    getComments();
  }, [blogId]);
  const handleEdit = async(commentId,editedContent)=>{
    setComments(
      comments.map((c) => c._id == commentId ? {...c,content:editedContent} : c
      )
    )
  }
  const handleDelete = async(commentId)=>{
    setComments(comments.filter((c)=>c._id !== commentId))
  }
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
          You must{" "}
          <Link className="text-blue-600 hover:underline" to="/sign-in">
            Sign In
          </Link>
          &nbsp;to comment.
        </p>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
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
      {comments.length === 0 ? (
        <p>No Comment Yet</p>
      ) : (
        <>
          <div className="flex gap-2 items-center">
            <p>Comments </p>
            <div className="border border-black px-2">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => {
            return <Comments key={comment._id} comment={comment} onEdit={handleEdit} onDelete={handleDelete} />;
          })}
        </>
      )}
    </div>
  );
}

export default CommentSection;
