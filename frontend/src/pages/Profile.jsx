import React, { useEffect, useState ,useContext} from 'react'
import axios from 'axios'
import { useLocation ,useNavigate} from 'react-router-dom'
import { context} from '../context/context.js'
import { useSelector } from 'react-redux'

const Profile = () => {
    
    const navigate = useNavigate()
    const userId = useLocation().search.slice(8,)
    const User = useSelector((state) => (state.user))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [user,setUser]=useState({profile:'',name:'',email:'',bio:''})
    const {setLoader}=useContext(context)


    const getUser = async()=>{
        setLoader(true)
        try {
            const res = await axios.post(`${BACKEND_URL}/getprofile`,{userId:userId})
            setUser(res.data.user)
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    useEffect(()=>{
        if(!User.validated){
            navigate('/login')
        }
        else if(!userId){
            navigate('/')
        }else{
            getUser()
        }
    },[User])
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className='w-[90%] md:w-[50%] shadow-2xl bg-white rounded-lg overflow-hidden border-2 border-primary-800'>
            <div className='flex flex-col items-center justify-center'>
                <div className=' bg-primary-800 h-52 w-full'></div>
                <img className='absolute w-64 h-64 md:h-72 md:w-72  shadow-2xl hover:scale-110 transition ease-in-out duration-300 cursor-pointer rounded-lg border-2 border-primary-800' src={`${(user.profile.secure_url)?user.profile.secure_url:"../profile.jpg"}`} alt="" />
                <div className=' bg-white h-52 w-full'></div>
            </div>
            <h1 className='text-center -mt-4 text-4xl font-semibold text-primary-800'>{user.name}</h1>
            <h1 className='text-center text-md mt-1'>{user.email}</h1>
            <h1 className='text-center mb-10 text-md'>{user.bio}</h1>
            </div>
        </div>
    )
}

export default Profile
