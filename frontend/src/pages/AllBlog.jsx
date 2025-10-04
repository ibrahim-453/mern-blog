import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllBlog() {
  const [blog, setBlog] = useState([]);
  const [showmore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/v1/blog/get-blog", {
          method: "GET",
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
      const res = await fetch(`/api/v1/blog/get-blog?startIndex=${startIndex}`);
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
    <div className="w-full min-h-screen bg-gray-50 py-10 px-6">
      {blog.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium">
          No Blog Found
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
          {blog.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Banner Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  src={blog.bannerImage}
                  alt={blog.title}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2">
                  {blog.title}
                </h3>
                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 200) + "...",
                  }}
                ></div>

                <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={blog.userId?.profilephoto}
                      alt={blog.userId?.fullname}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {blog.userId?.fullname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link to={`/read-blog/${blog.slug}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
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
            className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

export default AllBlog;
