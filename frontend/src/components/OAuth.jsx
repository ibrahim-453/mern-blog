import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signin } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("accessToken");
    if (token) headers["Authorization"] = `Bearer ${token}`;

  const handleOAuth = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      const res = await fetch(`${BASE_URL}/api/v1/auth/google-auth`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          fullname: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhoto: resultFromGoogle.user.photoURL,
        }),
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(
          signin({ user: data.data.user, token: data.data.accessToken })
        );
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error("SomeThing Went Wring Try Again Later");
      }
    } catch (error) {
      toast.error("LogoutFailed");
    }
  };

  return (
    <div
      onClick={handleOAuth}
      className="w-full cursor-pointer bg-black text-white duration-300 py-3 rounded-full flex justify-center items-center gap-6"
    >
      <img
        width={30}
        height={30}
        src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_sl.svg"
        alt=""
      />
      <button className="font-semibold cursor-pointer">
        Continue With Google
      </button>
    </div>
  );
}

export default OAuth;
