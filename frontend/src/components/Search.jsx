import { useEffect, useState, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { BASE_URL } from "../config";

function Search() {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
 
  useEffect(() => {
    if (!term) return setSuggestions([]);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/blog/get-blog?searchTerm=${term}`,{
          credentials : "include"
        });
        const data = await res.json();
        if (res.ok) setSuggestions(data.data.blog || []);
      } catch (error) {
        console.log("Error fetching blogs:", error.message);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex items-center justify-center">
      <div className="hidden sm:block relative w-52 md:w-72 transition-all duration-300">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Blog"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full px-4 py-1.5 text-sm md:text-base rounded-full border border-accent-2 dark:border-border-dark bg-white dark:bg-bg-primary-dark dark:text-text-dark placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent-2-dark"
          />
          <SearchIcon className="absolute right-3 text-gray-500" size={18} />
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full dark:bg-bg-primary-dark bg-white dark:text-text-dark border dark:border-border-dark rounded mt-1 max-h-60 overflow-auto z-20">
            {suggestions.map((blog) => (
              <li
                key={blog._id}
                className="p-2 font-normal text-sm cursor-pointer flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-accent-2-dark transition"
                onClick={() =>
                  (window.location.href = `/read-blog/${blog.slug}`)
                }
              >
                <img
                  className="w-10 h-10 object-cover rounded"
                  src={blog.bannerImage}
                  alt=""
                />
                {blog.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="block sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-hover-dark transition"
        >
          <SearchIcon size={20} />
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 animate-fadeIn">
            <div className="relative mt-24 w-11/12 max-w-md dark:bg-bg-primary-dark bg-white rounded-xl p-4 shadow-xl animate-slideDown">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTerm("");
                  setSuggestions([]);
                }}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-hover-dark"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2 border-b pb-2">
                <SearchIcon className="text-gray-500" size={18} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search Blog..."
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="flex-1 px-2 py-1 bg-transparent outline-none dark:text-text-dark text-gray-800"
                />
              </div>
              {suggestions.length > 0 && (
                <ul className="mt-3 border dark:border-border-dark rounded max-h-60 overflow-auto">
                  {suggestions.map((blog) => (
                    <li
                      key={blog._id}
                      className="p-2 text-sm cursor-pointer flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-accent-2-dark transition"
                      onClick={() =>
                        (window.location.href = `/read-blog/${blog.slug}`)
                      }
                    >
                      <img
                        className="w-10 h-10 object-cover rounded"
                        src={blog.bannerImage}
                        alt=""
                      />
                      {blog.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
