import { useEffect, useState } from "react";
import { Trash2, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

function AdminComment() {
  const [allComments, setAllComments] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/comment/get-comment`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setAllComments(data.data.comments || []);
          if (data.data.comments.length < 9) {
            setShowMore(false);
          }
        } else {
          toast.error(data.message || "Failed to fetch comments");
        }
      } catch (error) {
        console.log("Fetch error:", error.message);
        toast.error("Failed to load comments");
      }
    };
    fetchAllComments();
  }, []);

  const handleShowMore = async () => {
    const startIndex = allComments.length;
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/comment/get-comment?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAllComments((prev) => [...prev, ...data.data.comments]);
        if (data.data.comments.length < 9) {
          setShowMore(false);
        }
      } else {
        toast.error(data.message || "Failed to load more comments");
      }
    } catch (error) {
      console.log("Load more error:", error.message);
      toast.error("Failed to load more comments");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/comment/delete-comment/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAllComments((prev) => prev.filter((c) => c._id !== commentId));
        toast.success(data.message || "Comment deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.log("Delete error:", error.message);
      toast.error("Something went wrong while deleting the comment");
    }
  };

  return (
    <div className="p-4 lg:p-6">
      {allComments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <MessageSquare
            size={48}
            className="text-text-secondary dark:text-text-secondary-dark mb-4"
          />
          <p className="text-center text-text-secondary dark:text-text-secondary-dark text-lg font-medium">
            No Comments Found
          </p>
          <p className="text-center text-text-secondary dark:text-text-secondary-dark text-sm mt-2">
            There are no comments in the system yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-lg shadow-md border border-border dark:border-border-dark">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted dark:bg-muted-dark text-text dark:text-text-dark uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Banner</th>
                  <th className="px-6 py-4">Blog Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-card dark:bg-card-dark">
                {allComments.map((comment) => (
                  <tr
                    key={comment._id}
                    className="border-b border-border dark:border-border-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={comment.blogId?.bannerImage}
                        alt="Blog Banner"
                        className="w-20 h-14 object-cover rounded-md border border-border dark:border-border-dark"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-text dark:text-text-dark max-w-xs">
                      <div className="line-clamp-2">
                        {comment.blogId?.title || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark">
                      {comment.blogId?.category?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark">
                      @{comment.userId?.username || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark max-w-xs">
                      <div className="line-clamp-2">{comment.content}</div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary dark:text-text-secondary-dark whitespace-nowrap">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="p-2 rounded-lg bg-error dark:bg-error-dark text-card dark:text-card-dark hover:opacity-80 transition-opacity"
                          aria-label="Delete comment"
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
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {allComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-card dark:bg-card-dark rounded-lg shadow-md border border-border dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 p-4 border-b border-border dark:border-border-dark bg-muted dark:bg-muted-dark">
                  <img
                    src={comment.blogId?.bannerImage}
                    alt="Blog Banner"
                    className="w-16 h-16 object-cover rounded-md border border-border dark:border-border-dark flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text dark:text-text-dark line-clamp-2 text-sm">
                      {comment.blogId?.title || "Unknown Blog"}
                    </h3>
                    <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1">
                      {comment.blogId?.category?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted dark:bg-muted-dark flex items-center justify-center">
                        <MessageSquare
                          size={16}
                          className="text-text-secondary dark:text-text-secondary-dark"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text dark:text-text-dark">
                          @{comment.userId?.username || "Unknown"}
                        </p>
                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-text dark:text-text-dark bg-muted dark:bg-muted-dark p-3 rounded-lg">
                    {comment.content}
                  </p>

                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="w-full py-2 px-4 rounded-lg bg-error dark:bg-error-dark text-card dark:text-card-dark hover:opacity-80 transition-opacity text-center font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete Comment
                  </button>
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

export default AdminComment;
