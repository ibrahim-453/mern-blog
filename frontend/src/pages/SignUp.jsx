import { Eye, EyeClosed } from "lucide-react";
import usePasswordToggle from "../hooks/ShowPassword";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const { showPassword, togglepassword } = usePasswordToggle();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    profilepic: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilepic: e.target.files[0] });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataTosend = new FormData();
      dataTosend.append("fullname", formData.fullname);
      dataTosend.append("username", formData.username);
      dataTosend.append("email", formData.email);
      dataTosend.append("password", formData.password);

     if (formData.profilepic) {
      dataTosend.append("profilepic", formData.profilepic); // field name must match multer
    } 

      const res = await fetch("/api/v1/auth/sign-up", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: dataTosend,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      alert(data.message);
      setFormData({ fullname: "", username: "", email: "", password: "" ,profilepic : null});
      navigate("/sign-in");
    } catch (error) {
      console.error("Something Went Wrong", error.message);
    }
  };
  return (
    <div className="w-full min-h-screen px-10 py-20 bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-16">
        <div className="flex flex-col gap-4 font-bold text-7xl text-white">
          <h1>Connect Today</h1>
          <h1>And Start</h1>
          <h1 className="text-primary">Telling Your Stories</h1>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_0_30px] shadow-white p-8">
          <OAuth />
          <p className="text-center text-sm my-3">or</p>
          <h1 className="text-2xl font-semibold text-center text-gray-80 mb-6">
            Join Now
          </h1>
          <hr />
          <form onSubmit={formSubmit} className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullname"
                className="text-sm font-medium text-gray-700"
              >
                Fullname
              </label>
              <input
                value={formData.fullname}
                onChange={handleChange}
                name="fullname"
                type="text"
                placeholder="Enter your fullname"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Enter your username"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 dark:bg-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 dark:bg-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="profilepic"
                className="text-sm font-medium text-gray-700"
              >
                Profile Photo
              </label>
              <input
                onChange={handleFileChange}
                name="profilepic"
                type="file"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 dark:bg-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300  text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={togglepassword}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer py-2 bg-primary hover:bg-hover text-white font-medium rounded-lg transition"
            >
              Create Account
            </button>
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-blue-600 hover:text-blue-700 underline decoration-blue-500"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;