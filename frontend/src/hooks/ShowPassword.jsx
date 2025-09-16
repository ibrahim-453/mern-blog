import { useState } from "react";

export default function usePasswordToggle () {
    const [showPassword,setShowPassword] = useState(false)
    
    const togglepassword = () => {
        setShowPassword((prev)=> !prev)
    }
    return {showPassword,togglepassword}
}