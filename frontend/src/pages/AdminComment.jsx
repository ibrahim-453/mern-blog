// import { useEffect } from 'react'
// import { Trash2 } from 'lucide-react'
// import { useState } from 'react'

// function AdminComment() {
//     const [allComments,setAllComments] = useState([])
//     const [showMore,setShowMore] = useState(true)
    
//     useEffect(()=>{
//         const fetchAllComments=async()=>{
//             try {
//                 const res = await fetch("/api/v1/comment/get-comment",{
//                     credentials:"include"
//                 })
//                 const data = await res.json()
//                 if(res.ok){
//                     setAllComments(data.data.comments.length || [])
//                     if(data.data.comments < 9){
//                         setShowMore(false)
//                     }
//                 }
//                 else{
//                     alert(data.message)
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }
//         fetchAllComments()
//     },[])
//     const handleShowMore = async()=>{
//         const startIndex = allComments.length
//         try {
//             const res = await fetch(`/api/v1/comment/get-comment?startIndex=${startIndex}`,{
//                 credentials : "include"
//             })
//             const data = await res.json()
//             if(res.ok){
//                 setAllComments((prev)=>[...prev,...data.data.comments])
//                 if(data.data.comments.length < 9){
//                     setShowMore(false)
//                 }
//             }
//         } catch (error) {
//            console.log(error.message); 
//         }
//     }
//     const handleDelete = async(commentId)=>{
//         try {
//             const res = await fetch(`/api/v1/comment/delete-comment/${commentId}`,{
//                 method : "DELETE",
//                 credentials : "include"
//             })
//              const data = await res.json()
//             if(res.ok){
//                 setAllComments((prev)=>prev.filter((c)=>c._id!==commentId))
//                 alert(data.message)
//             }
//             else{
//                 alert(data.message)
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
//     return (
//     <div className="p-4">
//       {allComments.length === 0 ? (
//         <p className="text-center text-gray-500">No Comments...</p>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
//           <table className="w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
//               <tr>
//                 <th className="px-6 py-3">Blog Banner Image</th>
//                 <th className="px-6 py-3">Blog Title</th>
//                 <th className="px-6 py-3">Blog Category</th>
//                 <th className="px-6 py-3">Comment By</th>
//                 <th className="px-6 py-3">Comment Content</th>
//                 <th className="px-6 py-3">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allComments.map((comment) => (
//                 <tr
//                   key={comment._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="px-6 py-3">
//                     <img
//                       src={comment.blogId?.bannerImage}
//                       alt="User_Image"
//                       className="w-20 h-14 object-cover rounded-md border"
//                     />
//                   </td>
//                   <td className="px-6 py-3 font-medium text-gray-900">
//                     {comment.blogId?.title}
//                   </td>
//                   <td className="px-6 py-3">{comment.blogId?.category.name}</td>
//                   <td className="px-6 py-3">@{comment.userId?.username}</td>
//                   <td className="px-6 py-3">@{comment.content}</td>
//                   <td className="px-6 py-3 text-gray-600">
//                     {new Date(comment.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </td>
//                   <td className="px-6 py-3">
//                       <button onClick={() => handleDelete(comment._id)}>
//                         <Trash2 />
//                       </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {showMore && <button onClick={handleShowMore}>Show more</button>}
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminComment

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

function AdminComment() {
  const [allComments, setAllComments] = useState([])
  const [showMore, setShowMore] = useState(true)

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await fetch("/api/v1/comment/get-comment", {
          credentials: "include"
        })
        const data = await res.json()
        if (res.ok) {
          setAllComments(data.data.comments || [])
          if (data.data.comments.length < 9) {
            setShowMore(false)
          }
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchAllComments() // <-- call it!
  }, [])

  const handleShowMore = async () => {
    const startIndex = allComments.length
    try {
      const res = await fetch(`/api/v1/comment/get-comment?startIndex=${startIndex}`, {
        credentials: "include"
      })
      const data = await res.json()
      if (res.ok) {
        setAllComments(prev => [...prev, ...data.data.comments])
        if (data.data.comments.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/v1/comment/delete-comment/${commentId}`, {
        method: "DELETE",
        credentials: "include"
      })
      const data = await res.json()
      if (res.ok) {
        setAllComments(prev => prev.filter(c => c._id !== commentId))
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="p-4">
      {allComments.length === 0 ? (
        <p className="text-center text-gray-500">No Comments...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Banner</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map(comment => (
                <tr key={comment._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <img
                      src={comment.blogId?.bannerImage}
                      alt="Banner"
                      className="w-20 h-14 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {comment.blogId?.title}
                  </td>
                  <td className="px-6 py-3">{comment.blogId?.category?.name}</td>
                  <td className="px-6 py-3">@{comment.userId?.username}</td>
                  <td className="px-6 py-3">{comment.content}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <div className="p-3 flex justify-center">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminComment
