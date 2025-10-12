import { Eye, EyeClosed } from "lucide-react";
import usePasswordToggle from "../hooks/ShowPassword";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

function SignUp() {
  const { showPassword, togglepassword } = usePasswordToggle();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v1/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/verify-email", { state: { email: formData.email } });
      setFormData({ fullname: "", username: "", email: "", password: "" });
    } catch (error) {
      console.error("Something Went Wrong", error.message);
    }
  };
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20 bg-bg-primary dark:bg-bg-primary-dark">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-16 ">
        <div className="flex flex-col gap-3 sm:gap-4 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text dark:text-text-dark text-center lg:text-left">
          <h1>Connect Today</h1>
          <h1>And Start</h1>
          <h1 className="text-accent-1-dark dark:text-accent-1-dark">
            Telling Your Stories
          </h1>
        </div>
        <div className="w-full max-w-md bg-card dark:bg-card-dark rounded-2xl shadow-[0_0_30px] shadow-border dark:shadow-border-dark p-6 sm:p-8  border-2 border-accent-2-dark">
          <OAuth />
          <p className="text-center text-sm my-3 text-text-secondary dark:text-text-secondary-dark">
            or
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-text dark:text-text-dark mb-6">
            Join Now
          </h1>
          <hr className="border-border dark:border-border-dark" />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6 mt-6 "
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullname"
                className="text-sm font-medium text-text dark:text-text-dark"
              >
                Fullname
              </label>
              <input
                value={formData.fullname}
                onChange={handleChange}
                name="fullname"
                type="text"
                placeholder="Enter your fullname"
                className="px-3 sm:px-4 py-2 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-text dark:text-text-dark"
              >
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Enter your username"
                className="px-3 sm:px-4 py-2 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text dark:text-text-dark"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="px-3 sm:px-4 py-2 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text dark:text-text-dark"
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
                  className="w-full px-3 sm:px-4 py-2 pr-10 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark"
                />
                <button
                  type="button"
                  onClick={togglepassword}
                  className="absolute inset-y-0 right-3 flex items-center text-text-secondary dark:text-text-secondary-dark hover:text-text dark:hover:text-text-dark"
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer py-2 bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark text-white font-medium rounded-lg transition"
            >
              Create Account
            </button>
            <div className="text-center text-sm">
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-accent-2 dark:text-accent-2-dark hover:text-hover dark:hover:text-hover-dark underline decoration-accent-2 dark:decoration-accent-2-dark"
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
