import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/auth/authSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import Search from "./Search";
import {toast} from 'react-toastify'

function NavBar() {
  const { theme } = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dropdown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        dispatch(signout());
        navigate("/sign-in");
      } else {
        toast.error("SignOut Failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-bg-primary text-text dark:bg-bg-primary-dark dark:text-text-dark sticky top-0 left-0 w-full h-16 z-50 duration-300 border-b-2 border-accent-1">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 md:gap-8 py-3 px-4 md:px-8 font-semibold">
        <div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-accent-2 hover:text-white dark:hover:bg-hover-dark transition duration-300"
          >
            <Menu size={22} />
          </button>
        </div>
        <div>
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-accent-1 hover:text-accent-2 dark:hover:text-accent-1-dark dark:text-accent-2-dark transition duration-300"
          >
            MyBlog
          </Link>
        </div>
        <div className="hidden md:flex gap-4">
          {["Home", "Blogs", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="px-3 py-1 font-medium hover:bg-accent-1 hover:text-white dark:text-text-dark dark:hover:bg-accent-2-dark rounded-md transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="mx-2 md:mx-0 md:flex-1">
          <Search />
        </div>
        <div className="flex items-center gap-3">
          <div ref={dropdownRef} className="relative flex items-center gap-3">
            {user && isAuthenticated ? (
              <>
                <img
                  onClick={() => setDropDown(!dropdown)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-accent-2 dark:border-accent-1-dark hover:scale-110 transform transition duration-300 object-cover"
                  src={user.profilephoto}
                  alt="User profile"
                />
                {dropdown && (
                  <div className="absolute right-0 top-12 w-56 bg-bg-primary text-text dark:bg-bg-primary-dark dark:text-text-dark rounded-lg shadow-lg p-4 flex flex-col items-start gap-2 z-50 animate-fadeIn transition-all duration-300">
                    <p className="font-semibold">@{user.username}</p>
                    <p className="text-sm truncate">{user.email}</p>
                    <hr className="w-full border-gray-300 my-2" />

                    <Link
                      to="profile-details"
                      className="w-full text-left px-3 py-1 rounded-md hover:bg-accent-1 hover:text-white dark:text-text-dark dark:hover:bg-accent-2-dark transition duration-200"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1 rounded-md bg-accent-1 hover:bg-accent-2 dark:bg-accent-2-dark text-white dark:hover:bg-accent-1-dark transition duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link
                  to="sign-up"
                  className="px-4 py-1 rounded-md border-2 border-accent-1-dark bg-accent-2 hover:bg-bg-primary text-white hover:text-text dark:bg-accent-2-dark  dark:hover:text-text-dark dark:hover:bg-bg-primary-dark dark:hover:border-accent-1-dark transition duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="sign-in"
                  className="px-4 py-1 rounded-md border-2  border-accent-1-dark hover:bg-accent-2 hover:text-white dark:border-accent-1-dark dark:hover:bg-accent-2-dark transition duration-300"
                >
                  Sign In
                </Link>
              </div>
            )}

            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full dark:hover:bg-hover-dark hover:bg-gray-300 transition duration-300"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "backdrop-blur-lg"
            : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute top-0 left-0 h-full w-3/4 max-w-sm dark:bg-bg-primary-dark bg-white dark:text-text-dark transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-border-dark">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-accent-2 hover:text-white dark:hover:bg-hover-dark transition duration-300"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-5 text-lg">
            {["Home", "Blogs", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md  hover:bg-accent-1 hover:text-white dark:hover:bg-accent-2-dark transition duration-300"
              >
                {item}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-center rounded-md border-2 bg-accent-2 hover:bg-bg-primary text-white hover:text-text border-accent-1-dark dark:bg-accent-2-dark dark:hover:text-text-dark dark:hover:bg-bg-primary-dark transition duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-center rounded-md border-2 border-accent-1-dark hover:bg-accent-2 hover:text-white dark:border-accent-1-dark dark:hover:bg-accent-2-dark transition duration-300"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
