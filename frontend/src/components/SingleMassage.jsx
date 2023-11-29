import React, { useEffect, useRef, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { CiMenuKebab } from "react-icons/ci";
import { LiaLaughSquint } from "react-icons/lia";
import { AiFillDelete } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { HiArrowLeft } from "react-icons/hi";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import axios from 'axios'
import { context } from '../context/context.js'
import { useDispatch, useSelector } from 'react-redux'
import { openSingleChat, openGroupChat, setNotReadMassage_Chat, blockuser, unblockUser, clearAllChats, deleteChat, setMassage, deletemassage } from '../Redux/slices/chatSlice.js'

const SingleMassage = ({ socket, setShowMcomponent }) => {

  const navigate = useNavigate()
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
  const [checkedMassage, setCheckedMassage] = useState([])
  const [select, setSelect] = useState(false)
  const [chatUserId, setChatUserId] = useState('')
  const [timeId, setTimeId] = useState('')
  const { setLoader, typing } = useContext(context)
  const [sendMLoader, setSendMLoader] = useState(false)


  function formateData(date) {
    let result = new Date(date).toLocaleString().split(',')[1].split(' ')
    result[1] = result[1].slice(0, result[1].length - 3)
    result = result.join(' ')
    return result
  }
  function selectMassage(e) {
    const { value, checked } = e.target
    if (checked) {
      setCheckedMassage([...checkedMassage, value])
    } else {
      setCheckedMassage(checkedMassage.filter((val) => val !== value))
    }
  }
  const submitMassage = async () => {
    setSendMLoader(true)
    if (input) {
      try {
        const res = await axios.post(`${BACKEND_URL}/massage/createmassage`, { senderId: user._id, content: input, chatId: chat.openSingleChat._id })
        const newMassage = res.data.newMassage
        const resChat = res.data.chat
        socket.emit('newMassage', { newMassage: newMassage, chat: resChat, user: user })
        dispatch(setMassage({ newMassage: newMassage, chatId: resChat._id }))
        setInput('')
        setEmoji(false)
      } catch (error) {
        console.log(error)
      }
    }
    setSendMLoader(false)
  }
  const block = async () => {
    setLoader(true)
    const selectedChatId = chat.openSingleChat._id
    try {
      await axios.post(`${BACKEND_URL}/chat/blockchat`, { userId: user._id, chatId: selectedChatId })
      dispatch(blockuser({ userId: user._id, chatId: chat.openSingleChat._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  const unblock = async () => {
    setLoader(true)
    const selectedChatId = chat.openSingleChat._id
    try {
      await axios.post(`${BACKEND_URL}/chat/unblockchat`, { userId: user._id, chatId: selectedChatId })
      dispatch(unblockUser({ userId: user._id, chatId: chat.openSingleChat._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
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
    setLoader(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/clearallchats`, { userId: user._id, chatId: chat.openSingleChat._id })
      dispatch(clearAllChats({ chatId: chat.openSingleChat._id, userId: user._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  const deletechat = async () => {
    setLoader(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/deletechat`, { userId: user._id, chatId: chat.openSingleChat._id })
      dispatch(deleteChat({ chatId: chat.openSingleChat._id, userId: user._id }))
      setDropdown(false)
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  const deleteMassage = async () => {
    setLoader(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/massage/deletemassage`, { chatId: chat.openSingleChat._id, massagesId: checkedMassage, userId: user })
      dispatch(deletemassage({ chatId: chat.openSingleChat._id, userId: user._id, massagesId: checkedMassage }))
      setSelect(false)
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  const getClick = (e) => {
    if (dropdownRef.current) {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdown(false)
      }
    }
    if (emojiRef.current) {
      if (!emojiRef.current.contains(e.target)) {
        if (emoji) {
          setEmoji(false)
        }
      }
    }
  }
  const keyDown = (e) => {
    if (e.key === "Enter") {
      submitMassage()
    }
  }
  const navigateToProfile = () => {
    navigate(`/profile?userId=${chatUserId}`)
  }
  const Typing = (e) => {
    setInput(e.target.value)
    if (socket) {
      socket.emit('typing', { chat: chat.openSingleChat, userId: user._id })
      clearTimeout(timeId)
      let timeout = setTimeout(() => {
        socket.emit('stopTyping', { chat: chat.openSingleChat, userId: user._id })
      }, 2000)
      setTimeId(timeout)

    }
  }

  useEffect(() => {
    document.addEventListener('click', getClick, true)
    return () => {
      removeEventListener('click', getClick)
    }
  }, [])
  useEffect(() => {
    setCheckedMassage([])
    setSelect(false)
    if (chat.openSingleChat) {
      setReadMassage()
      setBlockUser(false)
      chat.openSingleChat.blockList.map((userId) => {
        if (userId === user._id) {
          setBlockUser(true)
        }
      })
      chat.openSingleChat.joinChat.map((User) => {
        if (User._id != user._id) {
          setChatUserId(User._id)
        }
      })
    }
  }, [chat.openSingleChat])
  return (
    <>
      <div className="flex items-center py-2 bg-white">
        <span onClick={() => { setShowMcomponent(false) }} className="md:hidden mx-2 text-xl cursor-pointer"><HiArrowLeft /></span>
        <img src={`${(chat.openSingleChat && chat.openSingleChat.profile.secure_url) ? chat.openSingleChat.profile.secure_url : './profile.jpg'}`} className=" w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full" />
        <div>
          <h1 className=" text-base h-6 overflow-hidden">{chat.openSingleChat.chatName}</h1>
          <p className="w-full text-sm h-5 overflow-hidden">{chat.openSingleChat && chat.openSingleChat.joinChat.map((users) => {
            if (users._id !== user._id) {
              return users.bio
            }
          })}</p>
        </div>
        <div ref={dropdownRef} className="ml-auto  relative mr-3">
          <div className={`text-2xl mb-3 p-2  rounded-full cursor-pointer transition duration-300 ease-in-out ${dropdown ? "bg-primary-800 text-white" : " text-primary-800"}`} onClick={() => { setDropdown(!dropdown) }}><CiMenuKebab /></div>
          <ul className={`absolute top-full mt-3 right-0 bg-white shadow-2xl whitespace-nowrap rounded-md z-10 ${dropdown ? "block" : "hidden"}`}>
            <li onClick={() => { navigateToProfile() }} className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer  text-gray-600 transition duration-200 ease-in-out">Contact Info</li>
            <li className="hidden md:block px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out" onClick={() => { dispatch(openSingleChat('')); dispatch(openGroupChat('')) }}>Close chat</li>
            <li onClick={() => { setSelect(!select); setDropdown(false) }} className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Delete Massages</li>
            <li onClick={() => { clearAllChat() }} className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Clear all chats</li>
            <li onClick={() => { deletechat() }} className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Delete Chat</li>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">{(blockUser) ? <span onClick={() => { unblock() }}>Unblock</span> : <span onClick={() => { block() }}>Block</span>}</li>
          </ul>
        </div>
      </div>

      <div className="relative flex-grow-[1] flex flex-col p-2 w-full overflow-y-auto no-scrollbar bg-[#f5f5f5]">

        {
          chat.openSingleChat && chat.openSingleChat.massage.map((massage) => {
            return <div key={massage._id} className={`flex ${(massage.isHidden.includes(user._id)) ? 'hidden' : ''} `}>
              <input className={`${(select) ? '' : 'hidden'}`} type="checkbox" id={massage._id} onChange={(e) => { selectMassage(e) }} value={massage._id} checked={checkedMassage.includes(massage._id)} />
              <label className="w-full flex" htmlFor={(select) ? massage._id : ""}>
                <div className={` max-w-[50%] min-w-[15%] ${(massage.senderId === user._id) ? 'myMassage' : 'otherMassage'} p-3 rounded-lg my-1 mx-2`}>
                  <p className=" break-words" >{massage.content}</p>
                  <p onClick={()=>{navigate(`massageInfo?id=${massage._id}&type=massage`)}} className="cursor-pointer hover:text-[#585858]  text-end">{formateData(massage.createdAt)}</p>
                </div>
              </label>
            </div>
          })
        }
        <div onClick={() => { deleteMassage() }} className={`${(select) ? '' : 'hidden'} fixed bottom-24 right-8 text-3xl text-red-600 bg-white p-1 hover:scale-150 cursor-pointer shadow-lg rounded-full transition duration-300 ease-in-out`}><AiFillDelete /></div>
      </div>

      <div className={`${(blockUser) ? 'hidden' : 'flex'} bg-white items-center justify-between p-2 gap-3 relative`}>
        <div className={`${(typing) ? '' : 'hidden'} absolute -top-8 bg-white p-2 rounded-full rounded-bl-none`}><div className="dots"></div></div>
        <LiaLaughSquint className="text-4xl cursor-pointer text-primary-800" onClick={() => { setEmoji(!emoji) }} />
        <input onKeyDown={keyDown} className="w-full rounded-md p-2 bg-[#f5f5f5] text-xl" type="text" placeholder="Type a massage" value={input} onChange={(e) => { Typing(e) }} />
        <IoIosSend className={`${(sendMLoader) ? 'hidden' : ''} text-4xl cursor-pointer text-primary-800`} onClick={() => { submitMassage() }} />
        <div className={`${(sendMLoader) ? '' : 'hidden'}`}><div className="sendLoader"></div></div>
        <div ref={emojiRef} className={`absolute bottom-16 left-2 ${(emoji) ? 'block' : 'hidden'}`}> <Picker data={data} previewPosition="none" onEmojiSelect={(e) => { setInput(input + e.native) }} /></div>
      </div>

      <div className={`${(blockUser) ? 'flex' : 'hidden'} itemc justify-center m-2`}>
        <button onClick={(() => { unblock() })} className=" bg-primary-800 text-white text-xl font-semibold px-4 py-3 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md">Unblock</button>
      </div>
    </>
  )
}

export default SingleMassage
