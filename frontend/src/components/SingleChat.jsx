import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSingleChat, openGroupChat } from '../Redux/slices/chatSlice.js'
import { BsFillChatRightTextFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const SingleChat = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const chat = useSelector((state) => (state.chat))
  const user = useSelector((state) => (state.user))

  return (
    <div className=' w-1/2 relative  h-full overflow-hidden overflow-y-scroll no-scrollbar'>

      {
        chat.singleChat.map((chat) => {
          return <div key={chat._id} className={`${(chat.isHidden.includes(user._id)?'hidden':'')} flex items-center py-2 border-b-2 border-primary-800 cursor-pointer hover:bg-hover-200 transition ease-in-out duration-300`} onClick={() => { dispatch(openSingleChat(chat)); dispatch(openGroupChat('')) }}>
            <img src={`${(chat.profile.secure_url)?chat.profile.secure_url:'./profile.jpg'}`} className=' w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' />
            <div >
              <h1 className=' text-base h-6 overflow-hidden'>{chat.chatName}</h1>
              <p className='w-full text-sm h-5 overflow-hidden'>{chat.massage[chat.massage.length-1] && chat.massage[chat.massage.length-1].content}</p>
            </div>
            <div className=' ml-auto w-20 text-center'>
              <span className={` bg-primary-800 ${(chat.notReadMassage)?' inline-block':'hidden'} w-6 h-6 rounded-full text-white`}>{chat.notReadMassage}</span>
            </div>
          </div>
        })
      }


      <div className='absolute bottom-16 right-16'>
        <div className='fixed bg-primary-800 p-3 text-white text-xl rounded z-10 cursor-pointer border-2 border-primary-800 hover:bg-hover-200 hover:text-primary-800 transition duration-300 ease-in-out ' onClick={() => { navigate('/newchat') }}><BsFillChatRightTextFill /></div>
      </div>
    </div>
  )
}

export default SingleChat
