import React, { useState,useEffect } from "react"
import ChangePassSVG from "../SVG/ChangePassSVG.jsx"
import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'


const ChangePass = () => {

  const navigate = useNavigate()
  const token = new URLSearchParams(useLocation().search).get("token")
  const userId = new URLSearchParams(useLocation().search).get("id")
  const [input,setInput]=useState({token:token,userId:userId,new_pass:'',confirm_pass:''})
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  
  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${BACKEND_URL}/changepass`,input)
      toast.success(res.data.massage)
      setInput({token:token,userId:userId,new_pass:'',confirm_pass:''})
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.massage)
    }
  }

  useEffect(()=>{
    if(!token || !userId){
      navigate('/login')
    }
  },[])

  return (
    <div className="flex items-center justify-center h-screen bg-primary-800">
    <div className="flex md:w-[90%] px-10 sm:px-16 md:px-0 bg-white rounded-xl  m-4">
  <div className="md:w-1/2 pl-10 hidden md:flex items-center justify-center">
    <ChangePassSVG />
  </div>
  <div className="w-full md:w-1/2 flex items-center flex-col justify-evenly">
    <h1 className="text-center text-4xl text-primary-800 font-semibold my-5">Connectify</h1>
    <form className="flex items-center justify-center flex-col md:w-[90%]" onSubmit={submitForm}>
      <div className="w-full">
        <label className="block text-2xl text-primary-800 font-semibold" htmlFor="new_pass">New Password (between 8 to 12 character)</label>
        <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" autoComplete="new-off" type="text" id="new_pass" placeholder="Enter New Password" name="new_pass" value={input.new_pass} onChange={handleInput} />
      </div>
      <div className="w-full">
        <label className="block text-2xl text-primary-800 font-semibold" htmlFor="confirm_pass">Confirm Password</label>
        <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" autoComplete="new-off" type="text" id="confirm_pass" placeholder="Enter Confirm Password" name="confirm_pass" value={input.confirm_pass} onChange={handleInput} />
      </div>
      <div>
        <button className=" bg-primary-800 text-white px-10 py-2 text-2xl border-2 border-primary-800 hover:bg-[#b141fc24] mt-5 hover:text-primary-800 rounded-md transition duration-300 ease-in-out mb-5" type="submit">Submit</button>
      </div>
    </form>
  </div>
</div>
</div>
  )
}

export default ChangePass
