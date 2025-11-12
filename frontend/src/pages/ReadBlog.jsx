import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { BASE_URL } from "../config";

function ReadBlog() {
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/blog/get-blog?slug=${blogSlug}`,{
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setBlog(data.data.blog[0]);
        }
      } catch (error) {
        console.log("Failed to load blog" || error.message);
      }
    };
    fetchBlog();
  }, [blogSlug]);
  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark py-10 px-6">
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
            <span className="px-4 py-1 rounded-full bg-muted dark:bg-muted-dark text-accent-1 dark:text-accent-1-dark text-sm font-medium">
              {blog.category?.name || "Uncategorized"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
            <img
              className="w-12 h-12 rounded-full object-cover border border-border dark:border-border-dark"
              src={blog.userId?.profilephoto}
              alt={blog.userId?.fullname}
            />
            <div>
              <p className="text-text dark:text-text-dark font-medium">
                {blog.userId?.fullname}
              </p>
              <p className="text-text-secondary dark:text-text-secondary-dark text-sm">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div
            className="
              prose prose-lg max-w-none leading-relaxed
              text-text dark:text-text-dark

              /* Headings */
              prose-headings:text-text dark:prose-headings:text-text-dark
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-h1:font-bold prose-h2:font-semibold prose-h3:font-medium

              /* Paragraphs & lists */
              prose-p:text-text dark:prose-p:text-text-dark
              prose-li:text-text dark:prose-li:text-text-dark
              prose-strong:text-text dark:prose-strong:text-text-dark

              /* Links */
              prose-a:text-accent-1 dark:prose-a:text-accent-1-dark
              prose-a:no-underline hover:prose-a:underline

              /* Blockquotes & code */
              prose-blockquote:border-l-accent-1 dark:prose-blockquote:border-l-accent-1-dark
              prose-code:text-accent-1 dark:prose-code:text-accent-1-dark

              /* Images */
              prose-img:rounded-xl
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          <CommentSection blogId={blog._id} />
        </div>
      ) : (
        <>
          <h3 className="text-center font-bold text-6xl text-text dark:text-text-dark">
            Loading Blog
          </h3>
        </>
      )}
    </div>
  );
}

export default ReadBlog;
