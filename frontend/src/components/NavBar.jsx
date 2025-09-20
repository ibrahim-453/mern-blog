import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/auth/authSlice";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated,user } = useSelector((state) => state.auth);

  const toggletheme = () => {
    setToggle(!toggle);
  };
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        dispatch(signout());
        navigate("/sign-in");
      } else {
        alert("SignOut Failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={toggle ? "dark" : "light"}>
      <header className="fixed top-0 left-0 min-w-full h-16 py-4 bg-primary dark:bg-primary-dark dark:text-white">
        <nav className="max-w-7xl mx-auto flex flex-wrap justify-between items-center font-semibold">
          <div>
            <Link className="text-2xl font-bold " to="/">
              MyBlog
            </Link>
          </div>
          <div className="flex gap-8 ">
            <Link
              className="hover:bg-black px-2 hover:text-white rounded-md py-1 duration-300 dark:hover:bg-primary dark:hover:text-black"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:bg-black px-2 hover:text-white rounded-md py-1 duration-300 dark:hover:bg-primary dark:hover:text-black"
              to="/blogs"
            >
              Blogs
            </Link>
            <Link
              className="hover:bg-black px-2 hover:text-white rounded-md py-1 duration-300 dark:hover:bg-primary dark:hover:text-black"
              to="/about"
            >
              About
            </Link>
            <Link
              className="hover:bg-black px-2 hover:text-white rounded-md py-1 duration-300 dark:hover:bg-primary dark:hover:text-black"
              to="/contact-us"
            >
              Contact
            </Link>
          </div>
          <div>
            <input
              className="w-full px-4 py-1 rounded-full border border-gray-300 bg-white text-black placeholder-gray-400 outline-none focus:ring focus:ring-black focus:border-black"
              type="text"
              placeholder="Search Blog"
            />
          </div>
          <div className="flex gap-5">
            {user && isAuthenticated ? (
              <>
              <Avatar>
                  <img src={user.profilephoto} alt="user_Profile_Pic" />
              </Avatar>
              </>
            ) : (
              <>
                <Link
                  className=" bg-black text-white hover:bg-transparent hover:text-black px-3 rounded-md py-1 duration-300 dark:hover:text-white dark:hover:bg-none dark:bg-primary dark:text-black"
                  to="sign-up"
                >
                  SignUp
                </Link>
                <Link
                  className="hover:bg-black px-3 hover:text-white rounded-md py-1 duration-300 dark:hover:bg-primary dark:hover:text-black"
                  to="sign-in"
                >
                  SignIn
                </Link>
              </>
            )}
          </div>
          <div>
            <button onClick={toggletheme}>
              {toggle == false ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
