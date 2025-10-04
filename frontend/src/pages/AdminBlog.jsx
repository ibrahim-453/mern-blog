import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit,Trash2 } from 'lucide-react'
function AdminBlog() {
    const [allBlog,setAllBlog] = useState([])
    const [showMore,setShowMore] = useState(true)
    useEffect(()=>{
        const fetchallBlog = async()=>{
            try {
                const res = await fetch("/api/v1/blog/get-blog")
                const data = await res.json()
                if(res.ok){
                    setAllBlog(data.data.blog)
                    if(data.data.blog < 9){
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
    }
    fetchallBlog()
    },[])

    const handleShowMore = async()=>{
        const startIndex = allBlog.length
        try {
            const res = await fetch(`/api/v1/blog/get-blog?startIndex=${startIndex}`)
            const data = await res.json()
            if(res.ok){
                setAllBlog((prev)=>[...prev,...data.data.blog])
                if(data.data.blog < 9){
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDelete = async(blogId)=>{
        try {
            const res = await fetch(`/api/v1/blog/delete-blog/${blogId}`,{
                method : "DELETE",
                credentials : "include"
            })
            const data = await res.json()
            if(res.ok){
                setAllBlog((prev)=>prev.filter((b)=>b._id!==blogId))
                alert(data.message);
            }
            else{
                alert(data.message)
                return
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className="p-4">
      {allBlog.length === 0 ? (
        <p className="text-center text-gray-500">No Blogs...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Banner</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBlog.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">
                    <img
                      src={blog.bannerImage}
                      alt="Blog_Image"
                      className="w-20 h-14 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {blog.title}
                  </td>
                  <td className="px-6 py-3">{blog.category?.name}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-between items-center gap-2">
                      <Link to={`/edit-blog/${blog.slug}`}>
                        <Edit />
                      </Link>
                      <button onClick={() => handleDelete(blog._id)}>
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && <button onClick={handleShowMore}>Show more</button>}
        </div>
      )}
    </div>
  )
}

export default AdminBlog