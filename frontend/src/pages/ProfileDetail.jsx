import { Edit2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileDetail() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilepic", file);

    try {
      const res = await fetch(`/api/v1/user/change-profile-photo`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed To Update Image");
        return;
      }
      toast.success(data.message);
      dispatch(setUser({ ...user, profilephoto: data.data?.profilephoto }));
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleDialogBox = () => {
    fileRef.current.click();
  };
  const sentResetToken = async () => {
    try {
      const res = await fetch("/api/v1/user/reset-password-token", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      toast.success(data.message);
      navigate("/verify-token", { state: { email: user.email } });
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6 sm:gap-10 p-4 sm:p-6 lg:p-10 bg-card dark:bg-card-dark">
      <div className="relative">
        <img
          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-border dark:border-border-dark"
          src={user.profilephoto}
          alt="user_Profile_Photo"
        />
        <Edit2
          size={32}
          onClick={handleDialogBox}
          className="p-2 absolute bottom-2 right-2 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 rounded-full border border-border dark:border-border-dark text-text dark:text-text-dark bg-muted dark:bg-muted-dark cursor-pointer hover:bg-accent-1 hover:dark:bg-accent-1-dark hover:text-card hover:dark:text-card-dark transition-colors"
        />
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileRef}
          className="hidden"
        />
      </div>
      <div className="w-full">
        <div className="max-w-7xl mx-auto p-4 flex flex-col justify-center items-start gap-4 sm:gap-5">
          <div className="w-full break-words">
            <p className="text-sm sm:text-base text-text dark:text-text-dark">
              <span className="font-bold text-base sm:text-xl text-text dark:text-text-dark">
                Full Name :{" "}
              </span>
              {user.fullname}
            </p>
          </div>
          <div className="w-full break-words">
            <p className="text-sm sm:text-base text-text dark:text-text-dark">
              <span className="font-bold text-base sm:text-xl text-text dark:text-text-dark">
                Username :{" "}
              </span>
              {user.username}
            </p>
          </div>
          <div className="w-full break-words">
            <p className="text-sm sm:text-base text-text dark:text-text-dark">
              <span className="font-bold text-base sm:text-xl text-text dark:text-text-dark">
                Email :{" "}
              </span>
              {user.email}
            </p>
          </div>

          <div className="w-full break-words">
            <button
              onClick={sentResetToken}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
