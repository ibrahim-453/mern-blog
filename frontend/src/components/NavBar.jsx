import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/auth/authSlice";
import { useRef } from "react";
import { useEffect } from "react";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <header className="sticky top-0 left-0 min-w-full h-16 py-4 bg-primary dark:bg-primary-dark dark:text-white">
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
          <div ref={dropdownRef} className="flex items-center relative gap-5">
            {user && isAuthenticated ? (
              <>
                <img
                  onClick={() => setDropDown(!dropdown)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:scale-110 transition duration-200 object-cover"
                  src={user.profilephoto}
                  alt="User profile"
                />
                {dropdown && (
                  <div className="absolute top-12 left-0 min-w-55 bg-white rounded-lg p-4 flex flex-col items-start gap-2 z-50">
                    <p className="font-semibold text-gray-700">
                      @{user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <hr className="w-full border-gray-300 my-2" />

                    <Link
                      to="profile-details"
                      className="w-full text-left px-3 py-1 rounded-md hover:bg-primary duration-300"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1 rounded-md bg-black text-white hover:bg-transparent hover:text-black border border-black duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  className=" bg-black text-white hover:bg-transparent hover:text-black px-3 rounded-md py-1 duration-300"
                  to="sign-up"
                >
                  SignUp
                </Link>
                <Link
                  className="hover:bg-black px-3 hover:text-white rounded-md py-1 duration-300"
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
