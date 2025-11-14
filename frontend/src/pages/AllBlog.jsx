import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";

function AllBlog() {
  const [blog, setBlog] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/blog/get-blog`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setBlog(data.data.blog || []);
          if (data.data.blog.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBlogs();
  }, []);

  const handleShowMore = async () => {
    const startIndex = blog.length;
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/blog/get-blog?startIndex=${startIndex}`,{
          method: "GET",
          headers: { Authorization: `Bearer ${token}`}
        }
      );
      const data = await res.json();
      if (res.ok) {
        setBlog((prev) => [...prev, ...data.data.blog]);
        if (data.data.blog.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log("Load More Failed" || error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark py-10 px-6">
      {blog.length === 0 ? (
        <p className="text-center text-text-secondary dark:text-text-secondary-dark text-lg font-medium">
          Loading Blog
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blog.map((blog) => (
            <div
              key={blog._id}
              className="bg-card dark:bg-card-dark rounded-2xl shadow-md border border-border dark:border-border-dark flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-52 w-full overflow-hidden">
                <img
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  src={blog.bannerImage}
                  alt={blog.title}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text dark:text-text-dark leading-snug mb-2">
                  {blog.title}
                </h3>
                <div
                  className="text-text-secondary dark:text-text-secondary-dark text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 200) + "...",
                  }}
                ></div>

                <div className="mt-auto pt-5 flex items-center justify-between border-t border-border dark:border-border-dark">
                  <div className="flex items-center gap-3">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={blog.userId?.profilephoto}
                      alt={blog.userId?.fullname}
                    />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-dark">
                        {blog.userId?.fullname}
                      </p>
                      <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/read-blog/${blog.slug}`}
                    className="text-accent-1 dark:text-accent-1-dark hover:text-hover dark:hover:text-hover-dark font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showmore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-text dark:bg-text-dark text-card dark:text-text text-sm font-semibold rounded-lg hover:bg-hover dark:hover:bg-border transition"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

export default AllBlog;
