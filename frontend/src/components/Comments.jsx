import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

function Comments({ comment,onEdit,onDelete }) {
  const { user } = useSelector((state) => state.auth);
  const [likes, setLikes] = useState(false);
  const [numberoflikes, setNumberOfLikes] = useState(comment.numberoflikes || 0);
  const [isEdit,setIsEdit] = useState(false)
  const [editcomment,setEditComment] = useState("")

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
        alert(data.message);
        setLikes(!likes);
        setNumberOfLikes(data.data.likes);
      }
    } catch (error) {
      console.log("Something went wrong" || error.message);
    }
  };

  const handleEdit = ()=>{
    setIsEdit(true)
    setEditComment(comment.content)
  }
  const handleDelete = async(commentId)=>{
    try {
      const res = await fetch(`/api/v1/comment/delete-comment/${commentId}`,{
        method : "DELETE",
        credentials : "include"
      })
      const data = await res.json()
      onDelete(commentId)
    } catch (error) {
      console.log("Delete failed:", error.message);
    }
  }
  const handleUpdate = async(commentId)=>{
    try {
      const res = await fetch(`/api/v1/comment/edit-comment/${commentId}`,{
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({content : editcomment})
      })
      const data = await res.json()
      if(!res.ok){
        alert(data.message)
      }
      onEdit(commentId,data.data.content)
      setIsEdit(false)
    } catch (error) {
      console.log( error.message);
    }
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-4 border border-gray-300 rounded-xl bg-white">
      <div className="flex items-center gap-3 mb-3">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={comment.userId?.profilephoto}
          alt={comment.userId?.username}
        />
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-gray-900">
            @{comment.userId?.username}
          </h4>
          <p className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
      </div>
      {
        isEdit ? (
         <>
           <textarea
            maxLength={200}
            onChange={(e) => setEditComment(e.target.value)}
            value={editcomment}
            rows={3}
            placeholder="Add a message..."
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          />
          <button onClick={()=>handleUpdate(comment._id)} type="button">Save</button>
          <button onClick={()=>setIsEdit(false)} type="button">Cancel</button>
         </>
        )
        :
        (
          <p>{comment.content}</p>
        )
      }
      <div>
        <button onClick={() => handleLike(comment._id)}>
          {likes ? "Unlike" : "Like"}
        </button>
        <span>{numberoflikes}</span>
         {user && (user._id == comment.userId._id) && (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={()=>handleDelete(comment._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Comments;
