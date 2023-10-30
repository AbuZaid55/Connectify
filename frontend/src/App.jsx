import {Routes,Route} from 'react-router-dom'
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
import { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setUser } from './Redux/slices/userSlice.js'
import {setSingleChat} from './Redux/slices/chatSlice.js'
import { useSelector } from 'react-redux'
import {context} from './context/context.js'
import io from 'socket.io-client'
import MyProfile from './pages/MyProfile.jsx'

function App() {
  const dispatch = useDispatch()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const user = useSelector((state)=>(state.user))
  const socket=io(BACKEND_URL)

  const getUser = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/user`,{withCredentials:true})
      dispatch(setUser(res.data.user))
      return res.data.user
    } catch (error) {
      dispatch(setUser(''))
      return ''
    }
  }
  const getSingleChat  = async()=>{
    try {
      const res = await axios.post(`${BACKEND_URL}/chat/getsinglechat`,{userId:user._id})
      dispatch(setSingleChat(res.data))
      return res.data
    } catch (error) {
      dispatch(setSingleChat([]))
    }
  }
  
  useEffect(()=>{
    getUser()
  },[])
  useEffect(()=>{
    if(user._id){
      getSingleChat()
    }
  },[user])
  useEffect(() => {
    if(user && user._id){
      socket.emit('setup',user._id)
    }
  },[user])

  return (
   <context.Provider value={{getUser,getSingleChat}}>
     <Routes>
     <Route path='/' element={<Home socket={socket}/>}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/sendresetlink' element={<SendResetLink/>}/>
     <Route path='/changepass' element={<ChangePassword/>}/>
     <Route path='/verifyemail' element={<VerifyEmail/>}/>
     <Route path='/newchat' element={<NewChat/>}/>
     <Route path='/newgroupchat' element={<NewGroupChat/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/myprofile' element={<MyProfile/>}/>
    </Routes>
    <ToastContainer position="bottom-right"/>
   </context.Provider>
  )
}

export default App
