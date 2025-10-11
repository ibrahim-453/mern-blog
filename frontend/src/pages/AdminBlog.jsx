import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

function AdminBlog() {
  const [allBlog, setAllBlog] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchallBlog = async () => {
      try {
        const res = await fetch("/api/v1/blog/get-blog");
        const data = await res.json();
        if (res.ok) {
          setAllBlog(data.data.blog || []);
          if (data.data.blog.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log("Fetch error:", error.message);
      }
    };
    fetchallBlog();
  }, []);

  const handleShowMore = async () => {
    const startIndex = allBlog.length;
    try {
      const res = await fetch(`/api/v1/blog/get-blog?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setAllBlog((prev) => [...prev, ...data.data.blog]);
        if (data.data.blog.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log("Load more error:", error.message);
      alert("Failed to load more blogs");
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/blog/delete-blog/${blogId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setAllBlog((prev) => prev.filter((b) => b._id !== blogId));
        alert(data.message || "Blog deleted successfully");
      } else {
        alert(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.log("Delete error:", error.message);
      alert("Something went wrong while deleting the blog");
    }
  };

  return (
    <div className="p-4 lg:p-6">
      {allBlog.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-center text-text-secondary dark:text-text-secondary-dark text-lg font-medium">
            No Blogs Found
          </p>
          <p className="text-center text-text-secondary dark:text-text-secondary-dark text-sm mt-2">
            There are no blogs in the system yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-lg shadow-md border border-border dark:border-border-dark">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted dark:bg-muted-dark text-text dark:text-text-dark uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Banner</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card dark:bg-card-dark">
                {allBlog.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b border-border dark:border-border-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={blog.bannerImage}
                        alt="Blog Banner"
                        className="w-20 h-14 object-cover rounded-md border border-border dark:border-border-dark"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-text dark:text-text-dark max-w-xs">
                      <div className="line-clamp-2">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark">
                      {blog.userId?.fullname || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark">
                      {blog.category?.name || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-3">
                        <Link
                          to={`/edit-blog/${blog.slug}`}
                          className="p-2 rounded-lg bg-accent-1 dark:bg-accent-1-dark text-card dark:text-card-dark hover:bg-hover dark:hover:bg-hover-dark transition-colors"
                          aria-label="Edit blog"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 rounded-lg bg-error dark:bg-error-dark text-card dark:text-card-dark hover:opacity-80 transition-opacity"
                          aria-label="Delete blog"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allBlog.map((blog) => (
              <div
                key={blog._id}
                className="bg-card dark:bg-card-dark rounded-lg shadow-md border border-border dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={blog.bannerImage}
                  alt="Blog Banner"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="font-semibold text-text dark:text-text-dark line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.userId?.profilephoto}
                      alt={blog.userId?.fullname}
                      className="w-8 h-8 rounded-full object-cover border border-border dark:border-border-dark"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text dark:text-text-dark truncate">
                        {blog.userId?.fullname || "Unknown"}
                      </p>
                      <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                        {blog.category?.name || "Uncategorized"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Link
                      to={`/edit-blog/${blog.slug}`}
                      className="flex-1 py-2 px-4 rounded-lg bg-accent-1 dark:bg-accent-1-dark text-card dark:text-card-dark hover:bg-hover dark:hover:bg-hover-dark transition-colors text-center font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 py-2 px-4 rounded-lg bg-error dark:bg-error-dark text-card dark:text-card-dark hover:opacity-80 transition-opacity text-center font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="px-6 py-3 bg-accent-1 dark:bg-accent-1-dark text-card dark:text-card-dark text-sm font-semibold rounded-lg hover:bg-hover dark:hover:bg-hover-dark transition-colors shadow-md"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminBlog;
