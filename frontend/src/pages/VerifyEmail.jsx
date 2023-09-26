import React, { useState, useEffect } from "react"
import VerifyEmailSVG from "../SVG/VerifyEmailSVG.jsx"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from 'axios'

const VerifyEmail = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [userId, setUserId] = useState('')
  const [path, setPath] = useState('')
  const [timer,setTimer]=useState(20)

  const submitForm = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/verifyemail`, { userId, otp })
      console.log(res.data)
      toast.success(res.data.massage)
      setOtp('')
      navigate(path)
    } catch (error) {
      toast.error(error.response.data.massage)
    }
  }
  const resendOtp = async()=>{
    console.log("Resend Otp")
  }

  // useEffect(() => {
  //   if (location.state) {
  //     if (!location.state.userId || !location.state.path) {
  //       navigate('/login')
  //     } else {
  //       setUserId(location.state.userId)
  //       setPath(location.state.path)
        
  //       const interval = setInterval(() => {
  //         if(timer>0){
  //           setTimer(timer => timer-1)
  //         }
  //       }, 1000);
  //       return () => clearInterval(interval);
  //     }
  //   } else {
  //     navigate('/login')
  //   }
  // }, [location,timer])

  useEffect(()=>{
    const interval = setInterval(() => {
      if(timer>0){
        setTimer(timer => timer-1)
      }
    }, 1000);
    return () => clearInterval(interval);
  },[timer])

  console.log(timer)
  return (
    <div className="flex items-center justify-center h-screen bg-primary-800">
      <div className="flex md:w-[90%] px-10 sm:px-16 md:px-0 bg-white rounded-xl m-4">
        <div className="md:w-1/2 pl-10 hidden md:flex items-center justify-center">
          <VerifyEmailSVG />
        </div>
        <div className="w-full md:w-1/2 flex items-center flex-col justify-evenly">
          <h1 className="text-center text-4xl text-primary-800 font-semibold my-5">Connectify</h1>
          <div className="w-full px-5 py-3 text-center">
            <p>Please enter the 4-digit verification code that was sent to your email id</p>
            <p>The code is valid for 15 minutes.</p>
          </div>
          <div className="flex items-center justify-center flex-col md:w-[90%]">
            <div className="w-full">
              <label className="block text-2xl text-primary-800 font-semibold" htmlFor="new_pass">Verification code</label>
              <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" autoComplete="new-off" type="text" id="password" placeholder="Enter verification code" name="otp" value={otp} onChange={(e) => { setOtp(e.target.value) }} />
            </div>
            <div className="flex items-center justify-between whitespace-nowrap w-full flex-col md:flex-row">
              <button onClick={resendOtp} disabled={(timer<=0)?false:true} className={`w-full md:w-fit ${(timer<=0)?'bg-primary-800 border-primary-800 hover:text-primary-800 hover:bg-[#b141fc24] ':'bg-[#712b9f] border-[#712b9f]'} text-white px-5 py-2 md:mr-2 text-2xl border-2   md:mb-5 mt-5  rounded-md transition duration-300 ease-in-out`}>{(timer<=0)?'Resend':`Resend(${timer})`}</button>
              <button className="w-full md:w-fit bg-primary-800 text-white px-5 py-2 md:ml-2 text-2xl border-2 border-primary-800 hover:bg-[#b141fc24] mt-5 mb-5 hover:text-primary-800 rounded-md transition duration-300 ease-in-out" onClick={submitForm}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
