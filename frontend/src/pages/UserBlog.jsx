import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

function UserBlog() {
  const { user } = useSelector((state) => state.auth);
  const [myblog, setMyBlog] = useState([]);
  const [showmore, setShowMore] = useState(true);
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await fetch(`/api/v1/blog/get-blog?userId=${user._id}`);
        const data = await res.json();
        if (res.ok) {
          setMyBlog(data.data.blog || []);
          if (data.data.blog.length < 2) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log("Error occured" || error.message);
      }
    };
    fetchUserBlogs();
  }, []);
  const handleDelete = async (blogId) => {
    try {
      const res = await fetch(`/api/v1/blog/delete-blog/${blogId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      alert(data.message);
      setMyBlog((prev) => prev.filter((b) => b._id !== blogId));
    } catch (error) {
      alert("Something went wrong" || error.message);
    }
  };
  const handleShowMore = async () => {
    const startIndex = myblog.length;
    try {
      const res = await fetch(
        `/api/v1/blog/get=blog?userId=${user._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setMyBlog((prev) => [...prev, ...data.data.blog]);
        if (data.data.blog.length < 2) {
          setShowMore(false);
        }
      }
    } catch (error) {}
  };
  return (
    <div className="p-4">
      {myblog.length === 0 ? (
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
              {myblog.map((blog) => (
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
                    <div className="flex justify-center items-center gap-2">
                      <Link to={`/edit-blog/${blog._id}`}>
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
          {showmore && <button onClick={handleShowMore}>Show more</button>}
        </div>
      )}
    </div>
  );
}

export default UserBlog;
