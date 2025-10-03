import { Edit2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../redux/auth/authSlice'
import { useRef } from "react";
function ProfileDetail() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const handleFileChange = async (e)=>{
    const file = e.target.files[0]
    if(!file) return

    const formData = new FormData()
    formData.append("profilepic",file)

    try {
      const res = await fetch("/api/v1/user/change-profile-photo",{
        method : "POST",
        body : formData,
        credentials : "include"
      })
      const data = await res.json()
      if(!res.ok){
        alert(data.message || "Failed To Update Image")
        return
      }
      alert(data.message)
      dispatch(setUser({...user,profilephoto : data.data?.profilephoto}))
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong")
    }
  }

  const handleDialogBox = () => {
    fileRef.current.click()
  }

  return (
        <div className="flex flex-col justify-center items-center gap-10 p-10 bg-black text-white">
          <div className="relative">
            <img
              className="w-70 h-70 rounded-full object-cover border border-white"
              src={user.profilephoto}
              alt="user_Profile_Photo"
            />
            <Edit2
              size={40}
              onClick={handleDialogBox}
              className="py-2 absolute bottom-6 right-6 rounded-full border border-black text-black bg-white"
            />
            <input 
            type="file"
            onChange={handleFileChange}
            ref={fileRef}
            className="hidden"
             />
          </div>
          <div className="w-full">
            <div className="max-w-7xl mx-auto p-4 flex flex-col justify-center items-start gap-5">
              <div>
                <p className="text-semibold">
                  <span className="text-bold text-xl">Full Name : </span>
                  {user.fullname}
                </p>
              </div>
              <div>
                <p className="text-semibold">
                  <span className="text-bold text-xl">Username : </span>
                  {user.username}
                </p>
              </div>
              <div>
                <p className="text-semibold">
                  <span className="text-bold text-xl">Email : </span>
                  {user.email}
                </p>
              </div>
              
            </div>
          </div>
        </div>
  );
}

export default ProfileDetail;
