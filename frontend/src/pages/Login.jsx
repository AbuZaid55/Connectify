import React, { useState } from "react"
import LoginSVG from "../SVG/LoginSVG.jsx"
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {
  
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL  
  const navigate = useNavigate()
  const [input,setInput]=useState({email:'',password:''})

  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${BACKEND_URL}/login`,input,{withCredentials:true})
      setInput({email:'',password:''})
      if(res.status===200){
        navigate('/')
      }
      if(res.status===202){
        toast.success(res.data.massage)
        navigate('/verifyemail',{state:{userId:res.data.userId,path:'/'}})
      }
    } catch (error) {
      toast.error(error.response.data.massage)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-primary-800">
        <div className="flex md:w-[90%] px-10 sm:px-16 md:px-0 bg-white rounded-xl m-4">
      <div className="md:w-1/2 pl-10 hidden md:flex items-center justify-center">
        <LoginSVG />
      </div>
      <div className="w-full md:w-1/2 flex items-center flex-col justify-evenly">
        <h1 className="text-center text-4xl text-primary-800 font-semibold my-5">Connectify</h1>
        <form className="flex items-center justify-center flex-col md:w-[90%]" onSubmit={submitForm}>
          <div className="w-full">
            <label className="block text-2xl text-primary-800 font-semibold" htmlFor="email">Email*</label>
            <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" type="text" id="email" autoComplete="new-off" placeholder="Enter Your Email" name="email" value={input.email} onChange={handleInput} />
          </div>
          <div className="w-full">
            <label className="block text-2xl text-primary-800 font-semibold" htmlFor="password">Password*</label>
            <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" type="password" id="password" placeholder="Enter Your Password" name="password" value={input.password} onChange={handleInput} />
          </div>
          <div>
            <button className=" bg-primary-800 text-white px-10 py-2 text-2xl border-2 border-primary-800 hover:bg-[#b141fc24] mt-5 hover:text-primary-800 rounded-md transition duration-300 ease-in-out" type="submit">Log In</button>
          </div>
        </form>
       <div className="flex items-center justify-between flex-col md:flex-row w-full px-2 my-5">
        <p className="text-md mx-2">Forgot Password? <Link className=" text-primary-800" to={'/sendresetlink'}>Click!</Link></p>
        <p className="text-md mx-2">New user? <Link className=" text-primary-800" to={'/signup'}>Sign Up</Link></p>
       </div>
      </div>
    </div>
    </div>
  )
}

export default Login
