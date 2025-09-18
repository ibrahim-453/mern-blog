import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signin } from '../redux/auth/authSlice'
function OAuth() {

  const dispatch = useDispatch()

  const handleOAuth = async()=>{
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt :'select_account'})

    try {
      const resultFromGoogle = await signInWithPopup(auth,provider)
      console.log(resultFromGoogle);
      const res = await fetch("/api/v1/auth/google-auth",{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({
          fullname:resultFromGoogle.user.displayName,
          email:resultFromGoogle.user.email
        })
      })
      const data = await res.json()
      if(res.ok){
        dispatch(signin({user:data.data.user,token:data.data.accessToken}))
      }
      
    } catch (error) {
      
    }
  }

  return (
    <div onClick={handleOAuth} className='w-full cursor-pointer bg-black text-white duration-300 py-3 rounded-full flex justify-center items-center gap-6'>
        <img width={30} height={30} src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_sl.svg" alt="" />
        <button className='font-semibold cursor-pointer'>Continue With Google</button>
        
    </div>
  )
}

export default OAuth