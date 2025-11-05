import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { 
  User, 
  FileText, 
  Users, 
  MessageSquare, 
  Menu, 
  X,
  ChevronRight,
  Sparkles
} from "lucide-react";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      to: "/profile-details",
      label: "Profile",
      icon: User,
      badge: user?.role,
    },
    {
      to: user?.role === "admin" ? "/all-blogs" : "/my-blogs",
      label: "Blogs",
      icon: FileText,
    },
    ...(user?.role === "admin"
      ? [
          {
            to: "/all-users",
            label: "Users",
            icon: Users,
          },
          {
            to: "/all-comments",
            label: "Comments",
            icon: MessageSquare,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen w-full bg-bg-primary dark:bg-bg-primary-dark text-text dark:text-text-dark">
      <div className="grid lg:grid-cols-[280px_1fr] min-h-screen">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-40 p-3 rounded-xl bg-card dark:bg-card-dark border border-border dark:border-border-dark shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-text dark:text-text-dark" />
        </button>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen
            bg-card dark:bg-card-dark 
            border-r border-border dark:border-border-dark 
            shadow-xl lg:shadow-md
            p-6 
            flex flex-col gap-6
            z-50 lg:z-auto
            w-[280px]
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark rounded-lg blur-md opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-r from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark bg-clip-text text-transparent">
                  Dashboard
                </h2>
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                  Welcome back!
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted dark:hover:bg-muted-dark transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info Card */}
          {user && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-1/10 to-accent-2/10 dark:from-accent-1-dark/10 dark:to-accent-2-dark/10 p-4 border border-accent-2/20 dark:border-border-dark">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-1/20 to-accent-2/20 dark:from-accent-1-dark/20 dark:to-accent-2-dark/20 rounded-full blur-2xl"></div>
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark rounded-full blur opacity-50"></div>
                  <img
                    src={user.profilephoto}
                    alt={user.username}
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-white dark:border-card-dark shadow-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text dark:text-text-dark truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-2">
            <p className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-3 mb-1">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    group relative py-3 px-4 rounded-xl transition-all duration-300 font-medium 
                    flex items-center justify-between gap-3 overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-accent-1/10 to-accent-2/10 dark:from-accent-1-dark/10 dark:to-accent-2-dark/10 text-accent-1 dark:text-accent-1-dark shadow-sm"
                        : "hover:bg-muted dark:hover:bg-muted-dark text-text dark:text-text-dark"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-accent-1 to-accent-2 dark:from-accent-1-dark dark:to-accent-2-dark rounded-r-full"></div>
                      )}
                      
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Icon
                          size={20}
                          className={`flex-shrink-0 transition-transform duration-300 ${
                            isActive ? "scale-110" : "group-hover:scale-110"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-2/20 dark:bg-accent-2-dark/20 text-accent-1 dark:text-accent-1-dark font-semibold uppercase tracking-wide">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight
                          size={16}
                          className={`flex-shrink-0 transition-all duration-300 ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-border dark:border-border-dark">
            <div className="text-xs text-text-secondary dark:text-text-secondary-dark text-center">
              <p className="mb-1">Dashboard v2.0</p>
              <p className="opacity-60">© 2024 MyBlog</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative p-4 sm:p-6 lg:p-8 overflow-x-auto">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-1/5 to-accent-2/5 dark:from-accent-1-dark/5 dark:to-accent-2-dark/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Content wrapper */}
          <div className="relative">
            <Outlet />
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Custom scrollbar for sidebar */
        aside::-webkit-scrollbar {
          width: 6px;
        }

        aside::-webkit-scrollbar-track {
          background: transparent;
        }

        aside::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }

        aside::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
}

export default Profile;