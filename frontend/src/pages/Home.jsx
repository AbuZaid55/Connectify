import React, { useEffect } from 'react'
import { useNavigate ,Link} from 'react-router-dom'

const Home = (props) => {
  const navigate = useNavigate()
  
  async function getUser(){
    const user =  await props.getUser()
    if(!user){
      navigate('/login')
    }
  }

  useEffect(()=>{
    getUser()
  },[])
  return (
    <div>
     <Link to='/login'>Click</Link>
    </div>
  )
}

export default Home
