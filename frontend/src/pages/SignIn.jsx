// import { useState } from "react";
// import usePasswordToggle from "../hooks/ShowPassword";
// import { Eye, EyeClosed } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { signin } from "../redux/auth/authSlice";
// import OAuth from "../components/OAuth";
// import { toast } from "react-toastify";

// function SignIn() {
//   const { showPassword, togglepassword } = usePasswordToggle();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/v1/auth/sign-in`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message);
//         return;
//       }

//       dispatch(signin({ user: data.data.user, token: data.data.accessToken }));
//       toast.success(data.message);
//       setFormData({ email: "", password: "" });
//       navigate("/");
//     } catch (error) {
//       console.error("Something Went Wrong", error.message);
//     }
//   };
//   return (
//     <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-16">
//         <div className="flex flex-col items-start gap-3 sm:gap-4 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text dark:text-text-dark text-center lg:text-left">
//           <h1>Connect Today</h1>
//           <h1>And Start</h1>
//           <h1 className="text-accent-1-dark dark:text-accent-1-dark">
//             Telling Your Stories
//           </h1>
//         </div>
//         <div className="w-full max-w-md rounded-2xl shadow-[0px_0px_30px] shadow-border dark:shadow-border-dark p-6 sm:p-8 bg-card dark:bg-card-dark  border-2 border-accent-2-dark">
//           <OAuth />
//           <p className="text-center text-sm my-3 text-text-secondary dark:text-text-secondary-dark">
//             or
//           </p>
//           <h1 className="text-xl sm:text-2xl font-semibold text-center text-text dark:text-text-dark mb-6">
//             Login Now
//           </h1>
//           <hr className="border-border dark:border-border-dark" />
//           <br />
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-4 sm:gap-6 mt-6"
//           >
//             <div className="flex flex-col gap-2">
//               <label
//                 className="text-text dark:text-text-dark text-sm font-medium"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="px-3 sm:px-4 py-2 rounded-lg text-text dark:text-text-dark bg-muted dark:bg-muted-dark border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark"
//                 type="text"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label
//                 className="text-text dark:text-text-dark text-sm font-medium"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <div className="flex relative">
//                 <input
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-3 sm:px-4 py-2 pr-10 rounded-lg text-text dark:text-text-dark bg-muted dark:bg-muted-dark border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   className="absolute inset-y-0 right-3 text-text-secondary dark:text-text-secondary-dark hover:text-text dark:hover:text-text-dark"
//                   type="button"
//                   onClick={togglepassword}
//                 >
//                   {showPassword ? <Eye /> : <EyeClosed />}
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 text-white rounded-lg font-medium transition cursor-pointer bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark"
//             >
//               Login
//             </button>
//             <div className="text-center text-sm">
//               <p className="text-text-secondary dark:text-text-secondary-dark">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   to="/sign-up"
//                   className="font-medium text-accent-2 dark:text-accent-2-dark hover:text-hover dark:hover:text-hover-dark underline decoration-accent-2 dark:decoration-accent-2-dark"
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

import { useState } from "react";
import usePasswordToggle from "../hooks/ShowPassword";
import {
  Eye,
  EyeClosed,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../redux/auth/authSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

function SignIn() {
  const { showPassword, togglepassword } = usePasswordToggle();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`/api/v1/auth/sign-in`, {
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
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-2 dark:bg-accent-2-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 sm:gap-12 lg:gap-16">
          {/* Left Side - Hero Text */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-5 text-center lg:text-left animate-fade-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 mx-auto lg:mx-0 w-fit rounded-full bg-accent-1/10 dark:bg-accent-1-dark/10 border border-accent-1/20 dark:border-accent-1-dark/20 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-accent-1 dark:text-accent-1-dark" />
              <span className="text-sm font-medium text-text dark:text-text-dark">
                Welcome Back
              </span>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text dark:text-text-dark leading-tight">
              Connect Today
            </h1>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text dark:text-text-dark leading-tight">
              And Start
            </h1>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark bg-clip-text text-transparent">
                Telling Your Stories
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-secondary dark:text-text-secondary-dark max-w-xl mx-auto lg:mx-0 mt-4">
              Sign in to continue your blogging journey and connect with your
              audience
            </p>

            {/* Stats - Hidden on mobile */}
            <div className="hidden lg:grid grid-cols-3 gap-6 mt-8 max-w-2xl">
              {[
                { num: "10K+", label: "Writers" },
                { num: "50K+", label: "Articles" },
                { num: "100K+", label: "Readers" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-card/50 dark:bg-card-dark/50 backdrop-blur-sm rounded-2xl p-5 border border-border dark:border-border-dark"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-accent-1 dark:text-accent-1-dark mb-1">
                    {stat.num}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="w-full max-w-md lg:max-w-lg animate-fade-in-right">
            <div className="relative bg-card dark:bg-card-dark rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
              {/* Decorative gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-1 via-accent-2 to-accent-1 dark:from-accent-1-dark dark:via-accent-2-dark dark:to-accent-1-dark opacity-20 blur-xl"></div>

              <div className="relative">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text dark:text-text-dark mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    Sign in to continue your journey
                  </p>
                </div>

                {/* OAuth */}
                <OAuth />

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border dark:border-border-dark"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card dark:bg-card-dark text-text-secondary dark:text-text-secondary-dark">
                      or sign in with email
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="john@example.com"
                      className="px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={togglepassword}
                        className="absolute inset-y-0 right-3 flex items-center text-text-secondary dark:text-text-secondary-dark hover:text-accent-1 dark:hover:text-accent-1-dark transition-colors"
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeClosed size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-3.5 bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden mt-2"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? "SigningIn..." : "Sign In"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center text-sm pt-2">
                    <p className="text-text-secondary dark:text-text-secondary-dark">
                      Don't have an account?{" "}
                      <Link
                        to="/sign-up"
                        className="font-semibold text-accent-1 dark:text-accent-1-dark hover:text-accent-2 dark:hover:text-accent-2-dark transition-colors"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 flex items-start gap-3 px-4">
              <Shield className="w-5 h-5 text-accent-1 dark:text-accent-1-dark flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Your connection is secure. We use industry-standard encryption
                to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in-left {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SignIn;
