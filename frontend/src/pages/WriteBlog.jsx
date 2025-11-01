import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

function WriteBlog() {
  const [blogdata, setBlogData] = useState({
    title: "",
    categoryName: "",
    content: "",
  });
  const [bannerImage, setBannerImage] = useState(null);
  const [loading,setLoading] = useState(false)
  const handleChange = (e) => {
    setBlogData({ ...blogdata, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("categoryName", blogdata.categoryName);
    (formData.append("content", blogdata.content),
      formData.append("bannerImage", bannerImage));
    try {
      const res = await fetch(`/api/v1/blog/create-blog`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Something Went Wrong while Creating Blog");
      }
      toast.success(data.message);
      setBlogData({ title: "", categoryName: "", content: "" });
      setBannerImage(null);
    } catch (error) {
      toast.error(error.message || "Something Went Wrong");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10">
        <div className="text-center">
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text dark:text-text-dark">
            Write a Blog
          </h1>
          <p className="mt-2 text-text-secondary dark:text-text-secondary-dark text-base sm:text-lg">
            Share your ideas and stories with the world
          </p>
        </div>
        <div className="w-full bg-card dark:bg-card-dark rounded-2xl shadow-lg border border-border dark:border-border-dark p-6 sm:p-8 lg:p-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-2">
              <label
                className="text-base sm:text-lg font-semibold text-text dark:text-text-dark"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark 
                           outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark"
                name="title"
                type="text"
                value={blogdata.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-base sm:text-lg font-semibold text-text dark:text-text-dark"
                htmlFor="categoryName"
              >
                Category
              </label>
              <select
                name="categoryName"
                value={blogdata.categoryName}
                onChange={handleChange}
                required
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark 
               outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark"
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="React JS">React JS</option>
                <option value="Next JS">Next JS</option>
                <option value="Tailwind CSS">Tailwind CSS</option>
                <option value="CSS">CSS</option>
                <option value="HTML">HTML</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="WordPress">WordPress</option>
                <option value="PHP">PHP</option>
                <option value="Laravel">Laravel</option>
                <option value="Rest API">Rest API</option>
                <option value="Python">Python</option>
                <option value="MongoDB">MongoDB</option>
                <option value="MySQL">MySQL</option>
                <option value="Front End Development">
                  Front End Development
                </option>
                <option value="Back End Development">
                  Back End Development
                </option>
                <option value="Git">Git</option>
                <option value="GitHub">GitHub</option>
                <option value="Postman">Postman</option>
                <option value="API Testing">API Testing</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-base sm:text-lg font-semibold text-text dark:text-text-dark"
                htmlFor="bannerImage"
              >
                Banner Image
              </label>
              <input
                className="cursor-pointer block w-full text-text dark:text-text-dark border border-border dark:border-border-dark rounded-lg
                           file:py-2 file:px-4 sm:file:px-5 file:rounded-md file:border-0
                           file:bg-accent-1 dark:file:bg-accent-1-dark file:text-white file:font-medium
                           hover:file:bg-hover dark:hover:file:bg-hover-dark transition-all"
                name="bannerImage"
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                required
              />
              <p className="text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark">
                Upload a banner for your blog post
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base sm:text-lg font-semibold text-text dark:text-text-dark">
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
                  setBlogData({ ...blogdata, content: newContent })
                }
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-1 dark:bg-accent-1-dark py-2 sm:py-3 text-base sm:text-lg font-semibold text-white rounded-lg 
                         shadow-md hover:bg-hover dark:hover:bg-hover-dark transition-all"
            >
              {loading ? "Publishing Blog..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;