import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

function EditBlog() {
  const { blogSlug } = useParams();
  const navigate = useNavigate();

  const [blogdata, setBlogData] = useState({
    title: "",
    content: "",
    categoryName: "",
    bannerUrl: "",
  });
  const [bannerImage, setBannerImage] = useState(null);
   const API_BASE = import.meta.env.VITE_API_URL;
  const handleChange = (e) =>
    setBlogData({ ...blogdata, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImage(file);
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await fetch(`${API_BASE}/blog/get-blog?slug=${blogSlug}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        const blog = data.data.blog[0];
        if (res.ok) {
          setBlogData({
            id: blog._id,
            title: blog.title,
            content: blog.content,
            categoryName: blog.category.name,
            bannerUrl: blog.bannerImage,
          });
        }
      } catch (err) {
        console.error("Error fetching blog:", err.message);
      }
    };
    fetchBlogDetails();
  }, [blogSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("content", blogdata.content);
    formData.append("categoryName", blogdata.categoryName);
    if (bannerImage) formData.append("bannerImage", bannerImage);

    try {
      const res = await fetch(`${API_BASE}/blog/edit-blog/${blogdata.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
      if (res.ok) navigate("/my-blogs");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg-primary dark:bg-bg-primary-dark p-4 sm:p-8 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-text dark:text-text-dark text-center">
          Edit Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-card dark:bg-card-dark border border-border dark:border-border-dark 
          rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col gap-6"
        >
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-text-secondary dark:text-text-secondary-dark">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blogdata.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              className="px-4 py-3 rounded-lg border border-border dark:border-border-dark 
              bg-muted dark:bg-muted-dark text-text dark:text-text-dark 
              focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark outline-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-text-secondary dark:text-text-secondary-dark">
              Category
            </label>
            <select
              name="categoryName"
              value={blogdata.categoryName}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-border dark:border-border-dark 
              bg-muted dark:bg-muted-dark text-text dark:text-text-dark 
              focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark outline-none"
            >
              <option value="">Select a category</option>
              {[
                "Web Development",
                "React JS",
                "Next JS",
                "Tailwind CSS",
                "CSS",
                "HTML",
                "JavaScript",
                "Artificial Intelligence",
                "Machine Learning",
                "Data Science",
                "WordPress",
                "PHP",
                "Laravel",
                "Rest API",
                "Python",
                "MongoDB",
                "MySQL",
                "Front End Development",
                "Back End Development",
                "Git",
                "GitHub",
                "Postman",
                "API Testing",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Banner */}
          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold text-text-secondary dark:text-text-secondary-dark">
              Banner Image
            </label>

            {blogdata.bannerUrl && (
              <img
                src={blogdata.bannerUrl}
                alt="Banner"
                className="w-40 h-28 sm:w-52 sm:h-36 object-cover rounded-lg border border-border dark:border-border-dark"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer block w-full text-text dark:text-text-dark 
              border border-border dark:border-border-dark rounded-lg
              file:py-2 file:px-5 file:rounded-md file:border-0
              file:bg-accent-1 dark:file:bg-accent-1-dark file:text-white file:font-medium 
              hover:file:bg-hover dark:hover:file:bg-hover-dark transition-all"
            />
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              Upload a new banner (optional)
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-text-secondary dark:text-text-secondary-dark">
              Content
            </label>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              initialValue="<p>Write your story...</p>"
              value={blogdata.content}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6 }",
              }}
              onEditorChange={(newContent) =>
                setBlogData({ ...blogdata, content })
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white rounded-lg 
            bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark 
            shadow-md transition-colors"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
