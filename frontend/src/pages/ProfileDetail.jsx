import { Edit2, User, Mail, AtSign, Lock, Camera, Shield } from "lucide-react";
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
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-bg-primary-dark py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-3">
            Profile Settings
          </h1>
          <p className="text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark">
            Manage your account information and preferences
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card dark:bg-card-dark rounded-3xl border border-border dark:border-border-dark shadow-xl overflow-hidden">
          {/* Profile Header with Gradient Background */}
          <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          </div>

          {/* Profile Picture Section */}
          <div className="relative px-6 sm:px-8 md:px-10 pb-8 sm:pb-10 md:pb-12">
            <div className="flex flex-col items-center -mt-16 sm:-mt-20 md:-mt-24">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <img
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-card dark:border-card-dark shadow-2xl"
                  src={user.profilephoto}
                  alt="user_Profile_Photo"
                />
                <button
                  onClick={handleDialogBox}
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-3 sm:p-3.5 rounded-full bg-accent-1 dark:bg-accent-1-dark text-white border-4 border-card dark:border-card-dark hover:bg-hover dark:hover:bg-hover-dark transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group"
                >
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileRef}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              {/* User Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-1/10 dark:bg-accent-1-dark/10 border border-accent-1/20 dark:border-accent-1-dark/20">
                <Shield className="w-4 h-4 text-accent-1 dark:text-accent-1-dark" />
                <span className="text-sm font-medium text-text dark:text-text-dark">
                  Verified Account
                </span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {/* Full Name Card */}
              <div className="group bg-bg-primary dark:bg-bg-primary-dark rounded-2xl p-5 sm:p-6 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-1/10 dark:bg-accent-1-dark/10 rounded-xl flex items-center justify-center group-hover:bg-accent-1 dark:group-hover:bg-accent-1-dark transition-colors duration-300">
                    <User className="w-6 h-6 text-accent-1 dark:text-accent-1-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                      Full Name
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-text dark:text-text-dark break-words">
                      {user.fullname}
                    </p>
                  </div>
                </div>
              </div>

              {/* Username Card */}
              <div className="group bg-bg-primary dark:bg-bg-primary-dark rounded-2xl p-5 sm:p-6 border border-border dark:border-border-dark hover:border-accent-2 dark:hover:border-accent-2-dark transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-2/10 dark:bg-accent-2-dark/10 rounded-xl flex items-center justify-center group-hover:bg-accent-2 dark:group-hover:bg-accent-2-dark transition-colors duration-300">
                    <AtSign className="w-6 h-6 text-accent-2 dark:text-accent-2-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                      Username
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-text dark:text-text-dark break-words">
                      {user.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card - Full Width */}
              <div className="lg:col-span-2 group bg-bg-primary dark:bg-bg-primary-dark rounded-2xl p-5 sm:p-6 border border-border dark:border-border-dark hover:border-accent-1 dark:hover:border-accent-1-dark transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-1/10 dark:bg-accent-1-dark/10 rounded-xl flex items-center justify-center group-hover:bg-accent-1 dark:group-hover:bg-accent-1-dark transition-colors duration-300">
                    <Mail className="w-6 h-6 text-accent-1 dark:text-accent-1-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">
                      Email Address
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-text dark:text-text-dark break-words">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gradient-to-br from-accent-1/5 to-accent-2/5 dark:from-accent-1-dark/5 dark:to-accent-2-dark/5 rounded-2xl border border-accent-1/20 dark:border-accent-1-dark/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-1 dark:bg-accent-1-dark rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-text dark:text-text-dark mb-1">
                      Password & Security
                    </h3>
                    <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark">
                      Keep your account secure by updating your password regularly
                    </p>
                  </div>
                </div>
                <button
                  onClick={sentResetToken}
                  className="w-full sm:w-auto group relative px-6 py-3 bg-accent-1 dark:bg-accent-1-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-hover dark:hover:bg-hover-dark hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;