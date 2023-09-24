import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import SendResetLink from './pages/SendResetLink.jsx'
import ChangePassword from './pages/ChangePass.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'

function App() {
  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/sendresetlink' element={<SendResetLink/>}/>
     <Route path='/changepass' element={<ChangePassword/>}/>
     <Route path='/verifyemail' element={<VerifyEmail/>}/>
    </Routes>
  )
}

export default App
