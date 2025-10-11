import { useState } from "react";
import usePasswordToggle from "../hooks/ShowPassword";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../redux/auth/authSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

function SignIn() {
  const { showPassword, togglepassword } = usePasswordToggle();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      dispatch(signin({ user: data.data.user, token: data.data.accessToken }));
      toast.success(data.message);
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Something Went Wrong", error.message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-16">
        <div className="flex flex-col items-start gap-3 sm:gap-4 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text dark:text-text-dark text-center lg:text-left">
          <h1>Connect Today</h1>
          <h1>And Start</h1>
          <h1 className="text-accent-1-dark dark:text-accent-1-dark">
            Telling Your Stories
          </h1>
        </div>
        <div className="w-full max-w-md rounded-2xl shadow-[0px_0px_30px] shadow-border dark:shadow-border-dark p-6 sm:p-8 bg-card dark:bg-card-dark  border-2 border-accent-2-dark">
          <OAuth />
          <p className="text-center text-sm my-3 text-text-secondary dark:text-text-secondary-dark">
            or
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-text dark:text-text-dark mb-6">
            Login Now
          </h1>
          <hr className="border-border dark:border-border-dark" />
          <br />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6 mt-6"
          >
            <div className="flex flex-col gap-2">
              <label
                className="text-text dark:text-text-dark text-sm font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 sm:px-4 py-2 rounded-lg text-text dark:text-text-dark bg-muted dark:bg-muted-dark border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark"
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-text dark:text-text-dark text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 pr-10 rounded-lg text-text dark:text-text-dark bg-muted dark:bg-muted-dark border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  className="absolute inset-y-0 right-3 text-text-secondary dark:text-text-secondary-dark hover:text-text dark:hover:text-text-dark"
                  type="button"
                  onClick={togglepassword}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white rounded-lg font-medium transition cursor-pointer bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark"
            >
              Login
            </button>
            <div className="text-center text-sm">
              <p className="text-text-secondary dark:text-text-secondary-dark">
                Don&apos;t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-accent-2 dark:text-accent-2-dark hover:text-hover dark:hover:text-hover-dark underline decoration-accent-2 dark:decoration-accent-2-dark"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
