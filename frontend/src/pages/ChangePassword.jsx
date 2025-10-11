import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePasswordToggle from "../hooks/ShowPassword";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const { showPassword, togglepassword } = usePasswordToggle();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/profile-details");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 sm:px-6 md:px-8 bg-bg-primary dark:bg-bg-primary-dark">
      <div className="w-full max-w-md bg-card dark:bg-card-dark backdrop-blur-md rounded-2xl shadow-xl border border-border dark:border-border-dark p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text dark:text-text-dark">
            Change Password
          </h1>
        </div>

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm sm:text-base font-medium text-text dark:text-text-dark"
            >
              New Password
            </label>
            <div className="relative">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg border border-border dark:border-border-dark bg-muted dark:bg-muted-dark text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark transition-all"
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
            className="w-full py-2 sm:py-3 bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
