import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-full bg-bg-primary dark:bg-bg-primary-dark text-text dark:text-text-dark">
      <div className="grid lg:grid-cols-[250px_1fr] min-h-screen">
        {/* Sidebar (Always Visible) */}
        <aside className="bg-card dark:bg-card-dark border-r border-border dark:border-border-dark shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-accent-1 dark:text-accent-1-dark mb-2">
            Dashboard
          </h2>

          <NavLink
            to="/profile-details"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition-colors font-medium flex justify-between items-center ${
                isActive
                  ? "bg-muted dark:bg-muted-dark text-accent-1 dark:text-accent-1-dark"
                  : "hover:bg-muted dark:hover:bg-muted-dark text-text dark:text-text-dark"
              }`
            }
          >
            Profile
            {user && (
              <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                {user.role}
              </span>
            )}
          </NavLink>

          <NavLink
            to={user?.role === "admin" ? "/all-blogs" : "/my-blogs"}
            className={({ isActive }) =>
              `py-2 px-4 rounded transition-colors font-medium ${
                isActive
                  ? "bg-muted dark:bg-muted-dark text-accent-1 dark:text-accent-1-dark"
                  : "hover:bg-muted dark:hover:bg-muted-dark text-text dark:text-text-dark"
              }`
            }
          >
            Blogs
          </NavLink>

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/all-users"
                className={({ isActive }) =>
                  `py-2 px-4 rounded transition-colors font-medium ${
                    isActive
                      ? "bg-muted dark:bg-muted-dark text-accent-1 dark:text-accent-1-dark"
                      : "hover:bg-muted dark:hover:bg-muted-dark text-text dark:text-text-dark"
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
                      ? "bg-muted dark:bg-muted-dark text-accent-1 dark:text-accent-1-dark"
                      : "hover:bg-muted dark:hover:bg-muted-dark text-text dark:text-text-dark"
                  }`
                }
              >
                Comments
              </NavLink>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="p-4 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Profile;
