import { useEffect } from "react";
import { useState } from "react";
import { Trash2 } from 'lucide-react'

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
          alert(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllUsers();
  }, []);
  const handleShowMore = async () => {
    const startIndex = allUsers.length
    try {
        const res = await fetch(`/apiv1/user/get-users?startIndex=${startIndex}`,{
            credentials : "include"
        })
         const data = await res.json()
        if(res.ok){
            setAllUsers((prev)=>[...prev,...data.data.users])
            if(data.data.users.length < 9){
                setShowMore(false)
            }
        }
        else{
            alert(data.message)
        }
    } catch (error) {
        console.log(error.message);
    }
  };
  const handleDelete = async(userId)=>{
    try {
        const res = await fetch(`/api/v1/user/delete-user/${userId}`,{
            method : "DELETE",
            credentials : "include"
        })
        const data = await res.json()
        if(res.ok){
            setAllUsers((prev)=>prev.filter((u)=>u._id!==userId))
            alert(data.message)
        }
        else{
            alert(data.message)
        }
    } catch (error) {
         console.log(error.message);
    }
  }
  return (
    <div className="p-4">
      {allUsers.length === 0 ? (
        <p className="text-center text-gray-500">No Users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Profile Photo</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">
                    <img
                      src={user.profilephoto}
                      alt="User_Image"
                      className="w-20 h-14 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {user.fullname}
                  </td>
                  <td className="px-6 py-3">{user.username}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3">
                      <button onClick={() => handleDelete(user._id)}>
                        <Trash2 />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && <button onClick={handleShowMore}>Show more</button>}
        </div>
      )}
    </div>
  )
}

export default AdminUsers;
