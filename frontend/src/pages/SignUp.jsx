import React, { useState,useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import SignupSVG from "../SVG/SignupSVG.jsx"
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { context} from '../context/context.js'

const SignUp = () => {
  const navigate = useNavigate()
  const user = useSelector((state)=>(state.user))
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [input,setInput]=useState({name:'', email:'',password:'', confirm_pass:''})
  const {setLoader}=useContext(context)

  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    setLoader(true)
    e.preventDefault()
    try {
      const res = await axios.post(`${BACKEND_URL}/signup`,input)
      toast.success(res.data.massage)
      setInput({name:'', email:'',password:'', confirm_pass:''})
      navigate('/verifyemail',{state:{userId:res.data.userId,path:'/login'}})
    } catch (error) {
      toast.error(error.response.data.massage)
    }
    setLoader(false)
  }

  useEffect(() => {
    if(user.validated){
     navigate('/')
    }
   }, [user])

  return (
    <div className="flex items-center justify-center h-screen bg-primary-800">
    <div className="flex md:w-[90%] px-10 sm:px-16 md:px-0 bg-white rounded-xl m-4">
  <div className="md:w-1/2 pl-10 hidden md:flex items-center justify-center">
    <SignupSVG />
  </div>
  <div className="w-full md:w-1/2 flex items-center flex-col justify-evenly">
    <h1 className="text-center text-4xl text-primary-800 font-semibold my-5">Connectify</h1>
    <form className="flex items-center justify-center flex-col md:w-[90%]" onSubmit={submitForm}>
      <div className="w-full">
        <label className="block text-primary-800 font-semibold" htmlFor="name">Name*</label>
        <input className=" py-1 px-5 mb-2 mt-2 border-2 border-primary-800 rounded-md w-full" type="text" id="name" autoComplete="new-off" placeholder="Enter Your Name" name="name" value={input.name} onChange={handleInput} />
      </div>
      <div className="w-full">
        <label className="block text-primary-800 font-semibold" htmlFor="email">Email*</label>
        <input className=" py-1 px-5 mb-2 mt-2 border-2 border-primary-800 rounded-md w-full" type="text" id="email" autoComplete="new-off" placeholder="Enter Your Email" name="email" value={input.email} onChange={handleInput} />
      </div>
      <div className="w-full">
        <label className="block text-primary-800 font-semibold" htmlFor="password">Password (between 8 to 12 character)*</label>
        <input className=" py-1 px-5 mb-2 mt-2 border-2 border-primary-800 rounded-md w-full" type="password" id="password" placeholder="Enter Your Password" name="password" value={input.password} onChange={handleInput} />
      </div>
      <div className="w-full">
        <label className="block text-primary-800 font-semibold" htmlFor="confirm_pass">Confirm Password*</label>
        <input className=" py-1 px-5 mb-2 mt-2 border-2 border-primary-800 rounded-md w-full" type="password" id="confirm_pass" placeholder="Enter Your Confirm Password" name="confirm_pass" value={input.confirm_pass} onChange={handleInput} />
      </div>
      <div>
        <button className=" bg-primary-800 text-white px-10 py-1 border-2 border-primary-800 hover:bg-[#b141fc24] mt-5 hover:text-primary-800 rounded-md transition duration-300 ease-in-out" type="submit">Sign Up</button>
      </div>
    </form>
    <p className="text-center my-5">Have an account? <Link className=" text-primary-800" to={'/login'}>Log In</Link></p>
  </div>
</div>
</div>
  )
}

export default SignUp

