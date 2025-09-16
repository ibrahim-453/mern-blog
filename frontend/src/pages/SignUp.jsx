import { Eye, EyeClosed } from "lucide-react";
import usePasswordToggle from "../hooks/ShowPassword";

function SignUp() {
  const {showPassword,togglepassword} = usePasswordToggle()

  return (
    <div className="w-full min-h-screen px-10 py-20 bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-16">
        <div className="flex flex-col gap-4 font-bold text-7xl text-white">
          <h1>Connect Today</h1>
          <h1>And Start</h1>
          <h1 className="text-primary">
            Telling Your Stories
          </h1>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_0_30px] shadow-white p-8">
          <h1 className="text-2xl font-semibold text-center text-gray-80 mb-6">
            Join Now
          </h1>
          <hr />
          <form className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullname"className="text-sm font-medium text-gray-700">
                Fullname
              </label>
              <input
                id="fullname" type="text" placeholder="Enter your fullname" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50"/>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input id="username" type="text" placeholder="Enter your username" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 dark:bg-gray-700"/>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input id="email" type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 dark:bg-gray-700"/>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300  text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"/>
                <button
                  type="button"
                  onClick={togglepassword}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer py-2 bg-primary hover:bg-hover text-white font-medium rounded-lg transition">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
