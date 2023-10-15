import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import SendResetLink from './pages/SendResetLink.jsx'
import ChangePassword from './pages/ChangePass.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import NewChat from './pages/NewChat.jsx'
import NewGroupChat from './pages/NewGroupChat.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setUser } from './Redux/slices/userSlice.js'
import {setSingleChat} from './Redux/slices/chatSlice.js'
import { useSelector } from 'react-redux'

import {context} from './context/context.js'

function App() {
  const dispatch = useDispatch()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const user = useSelector((state)=>(state.user))

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


  return (
   <context.Provider value={{getUser,getSingleChat}}>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/sendresetlink' element={<SendResetLink/>}/>
     <Route path='/changepass' element={<ChangePassword/>}/>
     <Route path='/verifyemail' element={<VerifyEmail/>}/>
     <Route path='/newchat' element={<NewChat/>}/>
     <Route path='/newgroupchat' element={<NewGroupChat/>}/>
    </Routes>
    <ToastContainer position="bottom-right"/>
   </context.Provider>
  )
}

export default App
