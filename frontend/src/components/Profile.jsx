import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

function Profile() {
  const{user} = useSelector((state)=>state.auth)
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="grid grid-cols-[250px_1fr] min-h-screen">
        <div className="bg-white shadow-md p-6 flex flex-col gap-4 border-r">
          <NavLink
            to="/profile-details"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition-colors font-medium flex justify-between items-center gap-2 ${
                isActive
                  ? 'bg-gray-200 text-blue-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            Profile {user &&(
              <p className='text-sm text-black'>{user.role}</p>
            )}
          </NavLink>
          <NavLink
            to={user.role=="admin" ? "/all-blogs" : "/my-blogs"}
            className={({ isActive }) =>
              `py-2 px-4 rounded transition-colors font-medium ${
                isActive
                  ? 'bg-gray-200 text-blue-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            Blogs
          </NavLink>
          {
            user.role == "admin" && (
              <>
                <NavLink
            to="/all-users"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition-colors font-medium ${
                isActive
                  ? 'bg-gray-200 text-blue-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/all-comments"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition-colors font-medium ${
                isActive
                  ? 'bg-gray-200 text-blue-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            Comments
          </NavLink>
              </>
            )
          }
        </div>
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Profile