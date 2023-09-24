import React, { useState } from "react"
import ChangePassSVG from "../SVG/ChangePassSVG.jsx"


const ChangePass = () => {
  const [input,setInput]=useState({password:'',confirm_pass:''})
  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    console.log(input)
  }
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
        <input className="text-xl py-2 px-5 mb-5 mt-2 border-2 border-primary-800 rounded-md w-full" autoComplete="new-off" type="text" id="password" placeholder="Enter New Password" name="password" value={input.password} onChange={handleInput} />
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
