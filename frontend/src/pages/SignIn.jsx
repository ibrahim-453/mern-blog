import { useState } from "react";
import usePasswordToggle from "../hooks/ShowPassword";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../redux/auth/authSlice";
function SignIn() {
  const { showPassword, togglepassword } = usePasswordToggle();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }

      dispatch(signin({ user: data.data.user, token: data.data.accessToken }));
      alert(data.message);
      setFormData({ username: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Something Went Wrong", error.message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-black px-10 py-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-16">
        <div className="flex flex-col items-start gap-4 font-bold text-7xl text-white">
          <h1>Connect Today</h1>
          <h1>And Start</h1>
          <h1 className="text-primary">Telling Your Stories</h1>
        </div>
        <div className="w-full max-w-md rounded-2xl shadow-[0px_0px_30px] shadow-white p-8 bg-white">
          <h1 className="text-2xl font-semibold text-center text-gray-80 mb-6">
            Login Now
          </h1>
          <hr />
          <br />
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-700 text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black/50 placeholder:text-gray-400"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                className="text-gray-700 text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex relative">
                <input
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pr-8 rounded-lg text-gray-700 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black/50 placeholder:text-gray-400"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  className="absolute inset-y-0 right-3"
                  type="button"
                  onClick={togglepassword}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white rounded-lg font-medium transition cursor-pointer bg-primary hover:bg-hover"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
