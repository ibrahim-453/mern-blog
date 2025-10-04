import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/auth/authSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import Search from "./Search";

function NavBar() {
  const { theme } = useSelector((state) => state.theme);
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
    <header className="sticky top-0 left-0 w-full z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-between py-3 px-4 md:px-8 font-semibold">
        <div>
          <Link
            className="text-2xl md:text-3xl font-bold text-black hover:text-gray-700 transition"
            to="/"
          >
            MyBlog
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          {["Home", "Blogs", "About", "Contact"].map((item) => (
            <Link
              key={item}
              className="px-3 py-1 text-gray-700 hover:text-black hover:font-medium transition"
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 mx-4 md:mx-6">
          <Search />
        </div>

        {/* Profile / Auth */}
        <div ref={dropdownRef} className="relative flex items-center gap-4">
          {user && isAuthenticated ? (
            <>
              <img
                onClick={() => setDropDown(!dropdown)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:scale-110 transform transition duration-300 object-cover"
                src={user.profilephoto}
                alt="User profile"
              />
              {dropdown && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg p-4 flex flex-col items-start gap-2 z-50">
                  <p className="font-semibold text-gray-700">@{user.username}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  <hr className="w-full border-gray-300 my-2" />

                  <Link
                    to="profile-details"
                    className="w-full text-left px-3 py-1 rounded-md hover:bg-gray-100 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                className="px-4 py-1 rounded-md bg-black text-white hover:bg-gray-900 transition"
                to="sign-up"
              >
                Sign Up
              </Link>
              <Link
                className="px-4 py-1 rounded-md border border-black text-black hover:bg-black hover:text-white transition"
                to="sign-in"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
