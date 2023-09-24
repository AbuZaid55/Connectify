import React, { useState } from "react"
import LoginSVG from "../SVG/SignupSVG.jsx"
import {Link} from 'react-router-dom'

const SignUp = () => {
  const [input,setInput]=useState({name:'', email:'',password:'', confirm_pass:''})
  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    console.log(input)
  }
  return (
    <div className="flex items-center justify-center h-screen bg-primary-800">
    <div className="flex md:w-[90%] px-10 sm:px-16 md:px-0 bg-white rounded-xl h-[80vh] m-4">
  <div className="md:w-1/2 pl-10 hidden md:flex items-center justify-center">
    <LoginSVG />
  </div>
  <div className="w-full md:w-1/2 flex items-center flex-col justify-evenly">
    <h1 className="text-center text-4xl text-primary-800 font-semibold">Connectify</h1>
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
    <p className="text-center">Have an account? <Link className=" text-primary-800" to={'/login'}>Log In</Link></p>
  </div>
</div>
</div>
  )
}

export default SignUp
