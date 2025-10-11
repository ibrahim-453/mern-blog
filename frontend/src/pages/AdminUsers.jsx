import { useEffect, useState } from "react";
import { Trash2, Mail, User } from "lucide-react";

function AdminUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch("/api/v1/user/get-users", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setAllUsers(data.data.users || []);
          if (data.data.users.length < 9) {
            setShowMore(false);
          }
        } else {
          alert(data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.log("Fetch error:", error.message);
        alert("Failed to load users");
      }
    };
    fetchAllUsers();
  }, []);

  const handleShowMore = async () => {
    const startIndex = allUsers.length;
    try {
      const res = await fetch(
        `/api/v1/user/get-users?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAllUsers((prev) => [...prev, ...data.data.users]);
        if (data.data.users.length < 9) {
          setShowMore(false);
        }
      } else {
        alert(data.message || "Failed to load more users");
      }
    } catch (error) {
      console.log("Load more error:", error.message);
      alert("Failed to load more users");
    }
  };

  const handleDelete = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/user/delete-user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setAllUsers((prev) => prev.filter((u) => u._id !== userId));
        alert(data.message || "User deleted successfully");
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log("Delete error:", error.message);
      alert("Something went wrong while deleting the user");
    }
  };

  return (
    <div className="p-4 lg:p-6">
      {allUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <User
            size={48}
            className="text-text-secondary dark:text-text-secondary-dark mb-4"
          />
          <p className="text-center text-text-secondary dark:text-text-secondary-dark text-lg font-medium">
            No Users Found
          </p>
          <p className="text-center text-text-secondary dark:text-text-secondary-dark text-sm mt-2">
            There are no users in the system yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-lg shadow-md border border-border dark:border-border-dark">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted dark:bg-muted-dark text-text dark:text-text-dark uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Profile Photo</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card dark:bg-card-dark">
                {allUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-border dark:border-border-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={user.profilephoto}
                        alt="User Profile"
                        className="w-12 h-12 object-cover rounded-full border-2 border-border dark:border-border-dark"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-text dark:text-text-dark">
                      {user.fullname}
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark">
                      @{user.username}
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-accent-1 dark:bg-accent-1-dark text-card dark:text-card-dark"
                            : "bg-muted dark:bg-muted-dark text-text-secondary dark:text-text-secondary-dark"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 rounded-lg bg-error dark:bg-error-dark text-card dark:text-card-dark hover:opacity-80 transition-opacity"
                          aria-label="Delete user"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allUsers.map((user) => (
              <div
                key={user._id}
                className="bg-card dark:bg-card-dark rounded-lg shadow-md border border-border dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={user.profilephoto}
                      alt="User Profile"
                      className="w-16 h-16 object-cover rounded-full border-2 border-border dark:border-border-dark flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text dark:text-text-dark truncate">
                        {user.fullname}
                      </h3>
                      <p className="text-sm text-text-secondary dark:text-text-secondary-dark truncate">
                        @{user.username}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-accent-1 dark:bg-accent-1-dark text-card dark:text-card-dark"
                            : "bg-muted dark:bg-muted-dark text-text-secondary dark:text-text-secondary-dark"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
                    <Mail size={14} />
                    <span className="truncate">{user.email}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border dark:border-border-dark">
                    <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                      Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="py-2 px-4 rounded-lg bg-error dark:bg-error-dark text-card dark:text-card-dark hover:opacity-80 transition-opacity text-center font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="px-6 py-3 bg-accent-1 dark:bg-accent-1-dark text-card dark:text-card-dark text-sm font-semibold rounded-lg hover:bg-hover dark:hover:bg-hover-dark transition-colors shadow-md"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminUsers;
