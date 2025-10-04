// import React, { useEffect, useState } from 'react'
// import {Search} from 'lucide-react'

// function Search() {
//     const [term,setTerm] = useState("")
//     const [suggestion,setSuggestion] = useState([])
    
//     useEffect(()=>{
//         const handleSearch = async(e)=>{
//             e.preventDefault()
//             try {
//                 const res = await fetch(`/api/v1/blog/get-blog?searchTerm=${term}`)
//                 const data = await res.json()
//                 if(res.ok){
//                     setSuggestion(data.blog || [])
//                 }
//             } catch (error) {
//                 console.log("No Blog Found" || error.message);
//             }
        
//     }
//     handleSearch()
//     },[term])
//   return (
//     <div>
//        <form >
//          <input
//               className="w-full px-4 py-1 rounded-full border border-gray-300 bg-white text-black placeholder-gray-400 outline-none focus:ring focus:ring-black focus:border-black"
//               type="text"
//               placeholder="Search Blog"
//               value={term}
//               onChange={(e)=>setTerm(e.target.value)}
//             />
//             <button type='submit'>
//                 <Search />
//             </button>
//        </form>
//     </div>
//   )
// }

// export default Search
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

function Search() {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!term) return setSuggestions([]);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/v1/blog/get-blog?searchTerm=${term}`);
        const data = await res.json();
        if (res.ok) {
          setSuggestions(data.data.blog || []);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error.message);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  return (
    <div className="relative w-80">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search Blog"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-4 py-1 rounded-full border border-gray-300 bg-white text-black placeholder-gray-400 outline-none focus:ring focus:ring-black focus:border-black"
        />
        <SearchIcon className="absolute right-3 ml-2 text-gray-500" />
      </div>

      {suggestions.length > 0  && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded mt-1 max-h-60 overflow-auto z-10 shadow-lg">
          {suggestions.map((blog) => (
            <li
              key={blog._id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => (window.location.href = `/read-blog/${blog.slug}`)}
            >
                <img className="w-10 h-10 object-center" src={blog.bannerImage} alt="" />
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
