import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

function VerifyToken() {
  const { state } = useLocation();
  let email = state?.email || "";
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
 const userToken = localStorage.getItem("accessToken");
    const googleToken = localStorage.getItem("googleToken");
    const token = userToken || googleToken;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}`},
        credentials: "include",
        body: JSON.stringify({ resetToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/change-password");
    } catch (error) {
      console.log(error.message);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 sm:px-6 md:px-8 bg-bg-primary dark:bg-bg-primary-dark">
      <div className="w-full max-w-md bg-card dark:bg-card-dark backdrop-blur-md rounded-2xl shadow-xl border border-border dark:border-border-dark p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text dark:text-text-dark">
            Verify Token
          </h1>
          <p className="text-text-secondary dark:text-text-secondary-dark text-sm sm:text-base mt-2 sm:mt-3">
            We've sent a reset code to {email}.
          </p>
        </div>

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Code"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border dark:border-border-dark bg-muted dark:bg-muted-dark rounded-xl text-text dark:text-text-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-1 dark:focus:ring-accent-1-dark focus:border-accent-1 dark:focus:border-accent-1-dark transition-all"
          />
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-accent-1 dark:bg-accent-1-dark hover:bg-hover dark:hover:bg-hover-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyToken;
