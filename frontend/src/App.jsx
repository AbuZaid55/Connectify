import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import SendResetLink from './pages/SendResetLink.jsx'
import ChangePassword from './pages/ChangePass.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const authentication = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/user`,{withCredentials:true})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    authentication()
  },[])

  return (
   <>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/sendresetlink' element={<SendResetLink/>}/>
     <Route path='/changepass' element={<ChangePassword/>}/>
     <Route path='/verifyemail' element={<VerifyEmail/>}/>
    </Routes>
    <ToastContainer position="bottom-right"/>
   </>
  )
}

export default App
