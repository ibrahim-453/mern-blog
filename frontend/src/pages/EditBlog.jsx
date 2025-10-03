import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
function EditBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blogdata, setBlogData] = useState({
    title: "",
    content: "",
    categoryName: "",
    bannerUrl: "",
  });
  const [bannerImage, setBannerImage] = useState(null);
  const handleChange = (e) => {
    setBlogData({ ...blogdata, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerImage(file);
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await fetch(`/api/v1/blog/get-blog?blogId=${blogId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        const singleBlog = data.data.blog[0];
        if (res.ok) {
          setBlogData({
            title: singleBlog.title,
            content: singleBlog.content,
            categoryName: singleBlog.category.name,
            bannerUrl: singleBlog.bannerImage,
          });
        }
      } catch (error) {
        console.log("Something went wrong" || error.message);
      }
    };
    fetchBlogDetails();
  }, [blogId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("content", blogdata.content);
    formData.append("categoryName", blogdata.categoryName);
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }
    try {
      const res = await fetch(`/api/v1/blog/edit-blog/${blogId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      }
      alert(data.message);
      setBlogData({ title: "", content: "", categoryName: "" });
      setBannerImage(null);
      navigate("/my-blogs");
    } catch (error) {
      alert("Something went wrong" || error.message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 sm:p-12">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-10">
        <div className="text-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl text-gray-800">
            Edit Blog
          </h1>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                className="text-lg font-semibold text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 
                               outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                name="title"
                type="text"
                value={blogdata.title}
                onChange={handleChange}
                placeholder="Enter blog title"
              />
            </div>
             <div className="flex flex-col gap-2">
              <label
                className="text-lg font-semibold text-gray-700"
                htmlFor="categoryName"
              >
                Category
              </label>
              <select
                name="categoryName"
                value={blogdata.categoryName}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 
               outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
              <label className="text-lg font-semibold text-gray-700">
                Banner Image
              </label>

              {blogdata.bannerUrl && (
                <img
                  src={blogdata.bannerUrl}
                  alt="Current banner"
                  className="w-40 h-28 object-cover rounded-lg border"
                />
              )}

              <input
                className="cursor-pointer block w-full text-gray-700 border border-gray-300 rounded-lg
               file:py-2 file:px-5 file:rounded-md file:border-0
               file:bg-primary file:text-white file:font-medium
               hover:file:bg-black transition-all"
                name="bannerImage"
                onChange={handleFileChange}
                type="file"
                accept="image/*"
              />

              <p className="text-sm text-gray-500">
                Upload a new banner (optional, leave empty to keep the old one)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700">
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
              className="w-full bg-primary py-3 text-lg font-semibold text-white rounded-lg 
                             shadow-md hover:bg-black transition-all"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
