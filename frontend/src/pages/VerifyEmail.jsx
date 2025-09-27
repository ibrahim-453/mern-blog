import { useState } from "react"
import { useLocation,useNavigate } from "react-router-dom"

function VerifyEmail() {
    const {state} = useLocation()
    let email = state.email || ""
    const [otp,setOtp] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch("/api/v1/auth/verify-email",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({email,otp})
            })
            const data = await res.json()
            if(!res.ok){
                alert(data.message)
                return
            }
            alert(data.message)
            navigate('/sign-in')
        } catch (error) {
            alert(error.message)
        }
    }
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 text-white">
  <div className="w-full max-w-md bg-primary backdrop-blur-md rounded-2xl shadow-xl p-8">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-gray-300text-sm mt-2">
        We’ve sent a verification code to {email}.
      </p>
    </div>

    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-gray-white placeholder-gray-300"
      />
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
      >
        Verify
      </button>
    </form>
  </div>
</div>

  )
}

export default VerifyEmail