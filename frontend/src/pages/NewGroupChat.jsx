import React, { useEffect,useContext, useState } from 'react'
import SearchUser from '../components/SearchUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {setNewGroup,openGroupChat} from '../Redux/slices/chatSlice.js'
import { context } from '../context/context.js'
import {toast} from 'react-toastify'

const NewGroupChat = ({socket}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setLoader } = useContext(context)
  const searchUsers = useSelector((state) => (state.chat)).searchUsers
  const user = useSelector((state) => (state.user))
  const [selectedUser, setSelectedUser] = useState([])
  const [input, setInput] = useState({ chatName: '', description: '' })
  const [form, setform] = useState(false)
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL 

  const navigateToProfile = (userId) => {
    navigate(`/profile?userId=${userId}`)
  }
  const selectUser = (e, _id) => {
    if (e.target.checked === true) {
      setSelectedUser((pre) => [...pre, _id])
    }
    if (e.target.checked === false) {
      let newList = selectedUser.filter((userId) => userId !== _id)
      setSelectedUser(newList)
    }
  }
  const createGroup = async()=>{
    setLoader(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/group/creategroup`,{chatName:input.chatName,description:input.description,users:selectedUser,admin:user._id})
      dispatch(setNewGroup(res.data.group))
      dispatch(openGroupChat(res.data.group))
      const users = selectedUser.filter((_id)=>_id!=user._id)
      socket.emit('addInGroup',{chat:res.data.group,usersId:users})
      setform(false)
      navigate('/')
    } catch (error) {
      if(error.response && error.response.data){
        toast.error(error.response.data.massage)
      }
    }
    setLoader(false)
  }
  useEffect(() => {
    setSelectedUser([])
    if (user && !user._id) {
      navigate('/login')
    }
    if(user && user._id){
      setSelectedUser([user._id])
    }
  }, [user])
  return (
    <div className='h-[100vh] overflow-hidden flex flex-col items-center '>
      <h1 className='mt-10 text-4xl text-primary-800 font-bold font-serif'>New Group</h1>
      <SearchUser />

      <div className=' w-full max-w-3xl rounded border-2 border-primary-800 shadow-lg max-h-full overflow-hidden overflow-y-auto mx-5'>
        <div className={` ${(searchUsers.length == 0) ? 'flex' : 'hidden'} font-serif font-bold items-center justify-center text-4xl text-primary-800 min-h-[300px]`}>
          <h1>User Not Found</h1>
        </div>
        {
          searchUsers.map((user) => {
            return <div key={user._id} className='flex items-center py-1 sm:px-2'>
              <input className='ml-3' type="checkbox" id={user._id} onChange={(e) => { selectUser(e, user._id) }} />
              <label htmlFor={user._id} className='flex cursor-pointer'>
                <img onClick={() => { navigateToProfile(user._id) }} className=' w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' src={(user.profile.secure_url) ? user.profile.secure_url : './profile.jpg'} alt="" />
                <div>
                  <h1 className='text-base h-6 overflow-hidden'>{user.name}</h1>
                  <p className='w-full text-sm h-5 overflow-hidden'>{user.bio}</p>
                </div>
              </label>
            </div>
          })
        }
      </div>

      <div className=' bg-white flex w-full max-w-3xl items-center justify-between'>
        <h1 className=' text-primary-800 text-xl font-semibold'>Selected user: {selectedUser.length-1}</h1>
        <button className=' bg-primary-800 text-white py-2 px-4 mb-3 rounded-md font-semibold border-2 border-primary-800 hover:bg-[#b141fc24] mt-5 hover:text-primary-800 transition duration-300 ease-in-out' onClick={() => { setform(true) }}>Create Group</button>
      </div>


      <div className={`${(form) ? 'flex' : 'hidden'} fixed top-0 left-0 w-[100%] h-[100vh] bg-[#00000050] overflow-hidden items-center justify-center`}>
        <div className='flex flex-col w-96 shadow-2xl p-4 bg-white'>
          <p className='text-end cursor-pointer' onClick={() => { setform(false) }}>X</p>
          <label className='mt-2 text-xl' htmlFor="name">Enter Chat Name:- </label>
          <input value={input.chatName} onChange={(e) => { setInput({ ...input, chatName: e.target.value }) }} className='border-2 border-primary-800  py-2' type="text" id='name' />
          <label className='mt-4 text-xl' htmlFor="bio">Change your bio:- </label>
          <input value={input.description} onChange={(e) => { setInput({ ...input, description: e.target.value }) }} type="text" className='border-2 border-primary-800 py-2' id='bio' />
          <button onClick={() => { createGroup() }} className=" mt-4 bg-primary-800 text-white text-md font-semibold py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Create</button>
        </div>
      </div>


    </div>
  )
}

export default NewGroupChat
