import React, { useContext } from 'react'
import SearchUser from '../components/SearchUser'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import {openSingleChat} from '../Redux/slices/chatSlice.js'
import {useNavigate} from 'react-router-dom'
import {context} from '../context/context.js'

const NewChat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {getSingleChat} = useContext(context)
  const searchUsers = useSelector((state)=>(state.chat)).searchUsers
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL 
  const user = useSelector((state)=>(state.user))

  const sendMassage = async(_id)=>{
   try {
    const res = await axios.post(`${BACKEND_URL}/chat/createchat`,{myId:user._id,otherUserId:_id,type:"Chat"})
    if(res.status===200 && res.data.massage==='Chat Created'){
      const myChat = await getSingleChat()
      const newChat = myChat.filter((chat)=>{
        if(chat._id===res.data.chatId){
          return chat
        }
      })
      console.log(newChat)
      dispatch(openSingleChat(newChat[0]))
      navigate('/')
    }
   } catch (error) {
    console.log(error)
   }
  }
  const navigateToProfile=(userId)=>{
    navigate(`/profile?userId=${userId}`)
  }
  return (
    <div className='h-[100vh] overflow-hidden flex flex-col items-center '>
      <h1 className='mt-10 text-4xl text-primary-800 font-bold font-serif'>New Chat</h1>
     <SearchUser/>

      <div className=' w-full max-w-3xl rounded border-2 border-primary-800 shadow-lg max-h-full overflow-hidden overflow-y-auto m-5 mt-0'>
        
        <div className={` ${(searchUsers.length==0)?'flex':'hidden'} font-serif font-bold items-center justify-center text-4xl text-primary-800 min-h-[300px]`}>
          <h1>User Not Found</h1>
        </div>
        {
           searchUsers.map((user)=>{
            return <div key={user._id} className='flex items-center justify-between py-1 sm:px-2'>
            <div className='flex items-center justify-center'>
              <img onClick={()=>{navigateToProfile(user._id)}} className=' cursor-pointer w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' src={(user.profile.secure_url)?'':'./profile.jpg'} alt="" />
              <div>
                <h1 className='text-base h-6 overflow-hidden'>{user.name}</h1>
                <p className='w-full text-sm h-5 overflow-hidden'>{user.bio}</p>
              </div>
            </div>
            <button className=' bg-primary-800 text-white p-2 font-semibold border-2 border-primary-800 mr-3 hover:bg-[#b141fc24] hover:text-primary-800 rounded-md transition duration-300 ease-in-out whitespace-nowrap' onClick={()=>{sendMassage(user._id)}}>Send Massage</button>
          </div>
          })
        }

      </div>

    </div>
  )
}

export default NewChat
