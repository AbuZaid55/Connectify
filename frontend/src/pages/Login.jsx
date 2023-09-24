import React, { useState } from "react"
import LoginSVG from "../SVG/LoginSVG.jsx"
import {Link} from 'react-router-dom'

const Login = () => {
  const [input,setInput]=useState({email:'',password:''})
  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    console.log(input)
  }
  return (
    <div className="flex items-center justify-center h-screen bg-primary-800">
        <div className="flex md:w-[90%] px-10 sm:px-16 md:px-0 bg-white rounded-xl h-[70vh] m-4">
      <div className="md:w-1/2 pl-10 hidden md:flex items-center justify-center">
        <LoginSVG />
      </div>
      <div className="w-full md:w-1/2 flex items-center flex-col justify-evenly">
        <h1 className="text-center text-4xl text-primary-800 font-semibold">Connectify</h1>
        <form className="flex items-center justify-center flex-col" onSubmit={submitForm}>
          <div>
            <label className="block text-2xl text-primary-800 font-semibold" htmlFor="email">Email</label>
            <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" type="text" id="email" autoComplete="new-off" placeholder="Enter Your Email" name="email" value={input.email} onChange={handleInput} />
          </div>
          <div>
            <label className="block text-2xl text-primary-800 font-semibold" htmlFor="password">Password</label>
            <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" type="password" id="password" placeholder="Enter Your Password" name="password" value={input.password} onChange={handleInput} />
          </div>
          <div>
            <button className=" bg-primary-800 text-white px-10 py-2 text-2xl border-2 border-primary-800 hover:bg-[#b141fc24] mt-5 hover:text-primary-800 rounded-md transition duration-300 ease-in-out" type="submit">Login</button>
          </div>
        </form>
        <p className="text-center text-xl">New user? <Link className=" text-primary-800" to={'/signup'}>Sign Up</Link></p>
      </div>
    </div>
    </div>
  )
}

export default Login
