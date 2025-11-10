import {
  Eye,
  EyeClosed,
  User,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import usePasswordToggle from "../hooks/ShowPassword";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

function SignUp() {
  const { showPassword, togglepassword } = usePasswordToggle();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/sign-up`, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary dark:bg-bg-primary-dark overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-2 dark:bg-accent-2-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-accent-1 dark:bg-accent-1-dark rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 sm:gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-4 sm:gap-5 text-center lg:text-left animate-fade-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 mx-auto lg:mx-0 w-fit rounded-full bg-accent-1/10 dark:bg-accent-1-dark/10 border border-accent-1/20 dark:border-accent-1-dark/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-accent-1 dark:text-accent-1-dark" />
              <span className="text-sm font-medium text-text dark:text-text-dark">
                Join Our Community
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
              Join thousands of writers sharing their stories and inspiring
              others every day
            </p>

            <div className="hidden lg:flex flex-col gap-4 mt-8">
              {[
                "Free account with unlimited articles",
                "Connect with readers worldwide",
                "Build your personal brand",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent-1 dark:bg-accent-1-dark rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-text dark:text-text-dark font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md lg:max-w-lg animate-fade-in-right">
            <div className="relative bg-card dark:bg-card-dark rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-1 via-accent-2 to-accent-1 dark:from-accent-1-dark dark:via-accent-2-dark dark:to-accent-1-dark opacity-20 blur-xl"></div>

              <div className="relative">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text dark:text-text-dark mb-2">
                    Create Account
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                    Start your blogging journey today
                  </p>
                </div>

                <OAuth />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border dark:border-border-dark"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card dark:bg-card-dark text-text-secondary dark:text-text-secondary-dark">
                      or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="fullname"
                      className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      value={formData.fullname}
                      onChange={handleChange}
                      name="fullname"
                      type="text"
                      placeholder="John Doe"
                      className="px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="username"
                      className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Username
                    </label>
                    <input
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      className="px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-3.5 bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden mt-2"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? "Creating Account..." : "Create Account"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <div className="text-center text-sm pt-2">
                    <p className="text-text-secondary dark:text-text-secondary-dark">
                      Already have an account?{" "}
                      <Link
                        to="/sign-in"
                        className="font-semibold text-accent-1 dark:text-accent-1-dark hover:text-accent-2 dark:hover:text-accent-2-dark transition-colors"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
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

export default SignUp;
