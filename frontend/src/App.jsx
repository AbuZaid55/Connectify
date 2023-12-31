import React from 'react'
import {Routes,Route,useNavigate} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import SendResetLink from './pages/SendResetLink.jsx'
import ChangePassword from './pages/ChangePass.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import NewChat from './pages/NewChat.jsx'
import NewGroupChat from './pages/NewGroupChat.jsx'
import Profile from './pages/Profile.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setUser } from './Redux/slices/userSlice.js'
import {setSingleChat,setGroupChat, leftUser,addInGroup} from './Redux/slices/chatSlice.js'
import { useSelector } from 'react-redux'
import {context} from './context/context.js'
import io from 'socket.io-client'
import MyProfile from './pages/MyProfile.jsx'
import GroupProfile from './pages/GroupProfile.jsx'
import {setChatNMassageIO,setgroupChatNMassageIO} from './Redux/slices/chatSlice.js'
import Page404 from './pages/Page404.jsx'
import MassageInfo from './pages/MassageInfo.jsx'

function App() {

  const [socket,setSocket]=useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recivAudioRef = React.createRef();
  const sendAudioRef = React.createRef();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const user = useSelector((state)=>(state.user))
  const chat = useSelector((state) => (state.chat))
  const [loader,setLoader]=useState(false)
  const [typing,setTyping]=useState(false)
  const [currentTyping,setCurrentTyping]=useState('')
  const [slide, setSlide] = useState(0)
  const [audio,setAudio]=useState(false)

  const getUser = async()=>{
    setLoader(true)
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/user`,{withCredentials:true})
      dispatch(setUser(res.data.user))
      setLoader(false)
      return res.data.user
    } catch (error) {
      dispatch(setUser('Unauthorized'))
      setLoader(false)
      return ''
    }
  }
  const getSingleChat  = async()=>{
    setLoader(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/getsinglechat`,{userId:user._id})
      dispatch(setSingleChat(res.data))
      setLoader(false)
      return res.data
    } catch (error) {
      dispatch(setSingleChat([]))
    }
    setLoader(false)
  }
  const getGroupChat = async()=>{
    setLoader(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/group/getgroupchat`,{userId:user._id})
      dispatch(setGroupChat(res.data))
      setLoader(false)
      return res.data
    } catch (error) {
      dispatch(setGroupChat([]))
    }
    setLoader(false)
  }
  
  useEffect(()=>{
    getUser()
  },[])
  useEffect(() => {
    if(user && user._id){
      getSingleChat()
      getGroupChat()
      let socket=io(BACKEND_URL)
      socket.emit('setup',user._id)
      setSocket(socket)

      const listener = (chat) => {
        setAudio(true)
        dispatch(setChatNMassageIO(chat))
      }
      const listener2 = ({chatId,newMassage}) => {
        setAudio(true)
        dispatch(setgroupChatNMassageIO({chatId,newMassage}))
      }
      const isTyping = (chatId)=>{
        setCurrentTyping(chatId)
      }
      const stopTyping = (chatId)=>{
        setCurrentTyping('')
      }
      const removeFromGroup=(chatId)=>{
        dispatch(leftUser({chatId:chatId,userId:user._id}))
      }
      const addinGroup = (chat)=>{
        dispatch(addInGroup({chat:chat,userId:user._id}))
      }
      socket.on('massageRecieved', listener)
      socket.on('groupMassageRecieved', listener2)
      socket.on('typing',isTyping)
      socket.on('stopTyping', stopTyping)
      socket.on('removeMeGroup',removeFromGroup)
      socket.on('addinGroup',addinGroup)
      return () => {
        socket.off("massageRecieved", listener)
        socket.off('typing',isTyping)
        socket.off('stopTyping',stopTyping)
        socket.off('removeMeGroup',removeFromGroup)
        socket.off('addinGroup',addinGroup)
      };
    }
  },[user])
  useEffect(()=>{
    if(currentTyping===chat.openSingleChat._id || currentTyping===chat.openGroupChat._id){
      setTyping(true)
    }else{
      setTyping(false)
    }
  },[currentTyping])
  useEffect(()=>{
    if(audio===true){
      recivAudioRef.current.play()
      setAudio(false)
    }
  },[audio])
  return (
   <context.Provider value={{getUser,getSingleChat,getGroupChat,setLoader,typing,sendAudioRef}}>
    <div className={`${(loader)?'flex':'hidden'} w-full h-[100vh] fixed top-0 left-0 items-center justify-center z-50 bg-[#00000050]`}><div className='spinner'></div></div>
    <audio className='hidden' ref={recivAudioRef} src="massReciv.mp3" />
    <audio className='hidden' ref={sendAudioRef} src="massSent.mp3" />
     <Routes>
     <Route path='/' element={<Home socket={socket} slide={slide} setSlide={setSlide}/>}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/sendresetlink' element={<SendResetLink/>}/>
     <Route path='/changepass' element={<ChangePassword/>}/>
     <Route path='/verifyemail' element={<VerifyEmail/>}/>
     <Route path='/newchat' element={<NewChat/>}/>
     <Route path='/newgroupchat' element={<NewGroupChat socket={socket}/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/myprofile' element={<MyProfile/>}/>
     <Route path='/groupInfo' element={<GroupProfile socket={socket}/>}/>
     <Route path='/massageInfo' element={<MassageInfo/>}/>
     <Route path="*" element={<Page404/>}/>
    </Routes>
    <ToastContainer position="bottom-right"/>
   </context.Provider>
  )
}

export default App
