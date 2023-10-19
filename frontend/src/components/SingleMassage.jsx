import React, { useEffect, useRef, useState } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { LiaLaughSquint } from "react-icons/lia";
import { IoIosSend } from "react-icons/io";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { openSingleChat, openGroupChat, setNotReadMassage_Chat, blockuser, unblockUser, clearAllChats, deleteChat, setMassage } from '../Redux/slices/chatSlice.js'

const SingleMassage = ({ socket }) => {

  const [dropdown, setDropdown] = useState(false)
  const [emoji, setEmoji] = useState(false)
  const [input, setInput] = useState('')
  const dropdownRef = useRef(null)
  const emojiRef = useRef(null)
  const dispatch = useDispatch()
  const chat = useSelector((state) => (state.chat))
  const user = useSelector((state) => (state.user))
  const [blockUser, setBlockUser] = useState(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


  function formateData(date) {
    let result = new Date(date).toLocaleString().split(',')[1].split(' ')
    result[1] = result[1].slice(0, result[1].length - 3)
    result = result.join(' ')
    return result
  }
  const submitMassage = async () => {
    if (input) {
      try {
        const res = await axios.post(`${BACKEND_URL}/massage/createmassage`, { senderId: user._id, content: input, chatId: chat.openSingleChat._id })
        const newMassage = res.data.newMassage
        newMassage.userId = chat.openSingleChat.joinChat[0]._id
        newMassage.chatId = chat.openSingleChat._id
        socket.emit('newMassage', newMassage)
        dispatch(setMassage(newMassage))
        setInput('')
      } catch (error) {
        console.log(error)
      }
    }
  }
  const block = async () => {
    const selectedChatId = chat.openSingleChat._id
    try {
      await axios.post(`${BACKEND_URL}/chat/blockchat`, { userId: user._id, chatId: selectedChatId })
      dispatch(blockuser({ userId: user._id, chatId: chat.openSingleChat._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
  }
  const unblock = async () => {
    const selectedChatId = chat.openSingleChat._id
    try {
      await axios.post(`${BACKEND_URL}/chat/unblockchat`, { userId: user._id, chatId: selectedChatId })
      dispatch(unblockUser({ userId: user._id, chatId: chat.openSingleChat._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
  }
  const setReadMassage = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/updatereadmassage`, { userId: user._id, chatId: chat.openSingleChat._id })
      dispatch(setNotReadMassage_Chat({ chatId: chat.openSingleChat._id, type: 'zero' }))
    } catch (error) {
      console.log(error)
    }
  }
  const clearAllChat = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/clearallchats`, { userId: user._id, chatId: chat.openSingleChat._id })
      dispatch(clearAllChats({ chatId: chat.openSingleChat._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
  }
  const deletechat = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/deletechat`, { userId: user._id, chatId: chat.openSingleChat._id })
      dispatch(deleteChat({ chatId: chat.openSingleChat._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getClick = (e) => {
    if (dropdownRef.current) {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdown(false)
      }
    }
    if (emojiRef.current) {
      if (!emojiRef.current.contains(e.target)) {
        setEmoji(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', getClick, true)
    return () => {
      removeEventListener('click', getClick)
    }
  }, [])
  useEffect(() => {
    if (chat.openSingleChat) {
      setReadMassage()
      setBlockUser(false)
      chat.openSingleChat.blockList.map((object) => {
        if (object.userId === user._id) {
          setBlockUser(true)
        }
      })
    }
  }, [chat.openSingleChat])
  useEffect(() => {
    const listener = (newMassage) => {
      dispatch(setMassage(newMassage))
    }
    socket.on('massageRecieved', listener)
    return () => socket.off("massageRecieved", listener);
  }, [socket])

  return (
    <>
      <div className="flex items-center py-2 bg-white">
        <img src={`${(chat.profile) ? '' : './profile.png'}`} className=" w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full" />
        <div>
          <h1 className=" text-base h-6 overflow-hidden">{chat.openSingleChat.chatName}</h1>
          <p className="w-full text-sm h-5 overflow-hidden">{chat.openSingleChat && chat.openSingleChat.joinChat[0].bio}</p>
        </div>
        <div ref={dropdownRef} className="ml-auto  relative mr-3">
          <div className={`text-2xl mb-3 p-2  rounded-full cursor-pointer transition duration-300 ease-in-out ${dropdown ? "bg-primary-800 text-white" : " text-primary-800"}`} onClick={() => { setDropdown(!dropdown) }}><CiMenuKebab /></div>
          <ul className={`absolute top-full mt-3 right-0 bg-white shadow-2xl whitespace-nowrap rounded-md z-10 ${dropdown ? "block" : "hidden"}`}>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer  text-gray-600 transition duration-200 ease-in-out">Contact Info</li>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out" onClick={() => { dispatch(openSingleChat('')); dispatch(openGroupChat('')) }}>Close chat</li>
            <li onClick={() => { clearAllChat() }} className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Clear all chats</li>
            <li onClick={() => { deletechat() }} className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Delete Chat</li>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">{(blockUser) ? <span onClick={() => { unblock() }}>Unblock</span> : <span onClick={() => { block() }}>Block</span>}</li>
          </ul>
        </div>
      </div>

      <div className=" flex-grow-[1]  p-2 w-full flex flex-col overflow-y-auto no-scrollbar bg-[#f5f5f5]">

        {
          chat.openSingleChat && chat.openSingleChat.massage.map((massage) => {
            return <div key={massage._id} className={` max-w-[50%] min-w-[15%] ${(massage.senderId === user._id) ? 'myMassage' : 'otherMassage'} p-3 rounded-lg my-1 mx-2`}>
              <p>{massage.content}</p>
              <p className="text-end">{formateData(massage.createdAt)}</p>
            </div>
          })
        }

      </div>


      <div className={`${(blockUser) ? 'hidden' : 'flex'} bg-white items-center justify-between p-2 gap-3 relative`}>
        <LiaLaughSquint className="text-4xl cursor-pointer text-primary-800" onClick={() => { setEmoji(!emoji) }} />
        <input className="w-full rounded-md p-2 bg-[#f5f5f5] text-xl" type="text" placeholder="Type a massage" value={input} onChange={(e) => { setInput(e.target.value) }} />
        <IoIosSend className="text-4xl cursor-pointer text-primary-800" onClick={() => { submitMassage() }} />
        <div ref={emojiRef} className={`absolute bottom-16 left-2 ${(emoji) ? 'block' : 'hidden'}`}> <Picker data={data} previewPosition="none" onEmojiSelect={(e) => { setInput(input + e.native) }} /></div>
      </div>

      <div className={`${(blockUser) ? 'flex' : 'hidden'} itemc justify-center m-2`}>
        <button onClick={(() => { unblock() })} className=" bg-primary-800 text-white text-xl font-semibold px-4 py-3 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md">Unblock</button>
      </div>
    </>
  )
}

export default SingleMassage
