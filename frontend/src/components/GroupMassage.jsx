import React, { useEffect, useRef, useState } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { LiaLaughSquint } from "react-icons/lia";
import { IoIosSend } from "react-icons/io";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import {useDispatch} from 'react-redux'
import {openSingleChat,openGroupChat} from '../Redux/slices/chatSlice.js'

const GroupMassage = () => {
    const [dropdown, setDropdown] = useState(false)
  const [emoji, setEmoji] = useState(false)
  const [input, setInput] = useState('')
  const dropdownRef = useRef(null)
  const emojiRef = useRef(null)
  const dispatch = useDispatch()


  const getClick = (e) => {
    if (!dropdownRef.current.contains(e.target)) {
      setDropdown(false)
    }
    if (!emojiRef.current.contains(e.target)) {
      setEmoji(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', getClick, true)
    return () => removeEventListener('click', getClick)
  })
  return (
    <>

    <div className="flex items-center py-2 bg-white">
      <img src="./profile.jpg" className=" w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full" />
      <div>
        <h1 className=" text-base h-6 overflow-hidden">Abu Zaid Group Massage</h1>
        <p className="w-full text-sm h-5 overflow-hidden">hi hellow what are your doing lorem300</p>
      </div>
      <div ref={dropdownRef} className="ml-auto  relative mr-3">
        <div className={`text-2xl mb-3 p-2  rounded-full cursor-pointer transition duration-300 ease-in-out ${dropdown ? "bg-primary-800 text-white" : " text-primary-800"}`} onClick={() => { setDropdown(!dropdown) }}><CiMenuKebab /></div>
        <ul className={`absolute top-full mt-3 right-0 bg-white whitespace-nowrap rounded-md z-10 ${dropdown ? "block" : "hidden"}`}>
          <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Contact Info</li>
          <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out" onClick={()=>{dispatch(openSingleChat(''));dispatch(openGroupChat(''))}}>Close chat</li>
          <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Clear all chat</li>
          <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Block</li>
        </ul>
      </div>
    </div>

    <div className=" flex-grow-[1]  p-2 w-full flex flex-col overflow-y-auto no-scrollbar bg-[#f5f5f5]">

      <div className="w-[50%] myMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] otherMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] myMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] otherMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] myMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] myMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] otherMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] otherMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>
      <div className="w-[50%] otherMassage p-3 rounded-lg my-1 mx-2">
        <p>hi hellow Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sunt quos delectus harum veniam modi natus voluptatem sapiente odit labore lore asdf asdf sdf sdf sdf sdaf sadf sdf dsf df!</p>
        <p className="text-end">2:11 pm</p>
      </div>

    </div>


    <div className="bg-white flex items-center justify-between p-2 gap-3 relative">
      <LiaLaughSquint className="text-4xl cursor-pointer text-primary-800" onClick={() => { setEmoji(!emoji) }} />
      <input className="w-full rounded-md p-2 bg-[#f5f5f5] text-xl" type="text" placeholder="Type a massage" value={input} onChange={(e) => { setInput(e.target.value) }} />
      <IoIosSend className="text-4xl cursor-pointer text-primary-800" onClick={() => { submitMassage() }} />
      <div ref={emojiRef} className={`absolute bottom-16 left-2 ${(emoji) ? 'block' : 'hidden'}`}> <Picker data={data} previewPosition="none" onEmojiSelect={(e) => { setInput(input + e.native) }} /></div>
    </div>

  </>
  )
}

export default GroupMassage
