import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

function ReadBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/v1/blog/get-blog?blogId=${blogId}`);
        const data = await res.json();
        if (res.ok) {
          setBlog(data.data.blog[0]);
        }
      } catch (error) {
        console.log("Failed to load blog" || error.message);
      }
    };
    fetchBlog();
  }, [blogId]);
  return (
    <div className="w-full min-h-screen py-10 px-6">
      {blog ? (
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="w-full h-80 rounded-2xl overflow-hidden">
          <img
            className="w-full h-full object-center"
            src={blog.bannerImage}
            alt={blog.title}
          />
        </div>
        <div className="flex justify-start">
          <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
            {blog.category?.name || "Uncategorized"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 border-b pb-4">
          <img
            className="w-12 h-12 rounded-full object-cover border"
            src={blog.userId?.profilephoto}
            alt={blog.userId?.fullname}
          />
          <div>
            <p className="text-gray-800 font-medium">{blog.userId?.fullname}</p>
            <p className="text-gray-500 text-sm">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div
          className="prose prose-lg text-gray-800 max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
        <CommentSection blogId = {blog._id} />
      </div>
      ) : (
        <>
          <h3 className="text-center font-bold text-6xl">No Blog Found</h3>
        </>
      )}
    </div>
  );
}

export default ReadBlog;
