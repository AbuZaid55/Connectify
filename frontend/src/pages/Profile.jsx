import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'

const Profile = () => {

    const navigate = useNavigate()
    const userId = useLocation().search.slice(8,)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [user,setUser]=useState({profile:'',name:'',email:'',bio:''})

    const getUser = async()=>{
        try {
            const res = await axios.post(`${BACKEND_URL}/getprofile`,{userId:userId})
            setUser(res.data.user)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(!userId){
            navigate('/')
        }else{
            getUser()
        }
    },[])
    return (
        <div className='h-[70vh] mx-20'>
            <h1 className='text-center text-6xl font-semibold text-primary-800 mt-10'>Profile</h1>
            <div className='flex items-center h-full'>
                <img className='border-4 rounded-full w-96 h-96 border-primary-800' src={`${(user.profile)?user.profile:"../profile.jpg"}`} alt="" />
                <div className='ml-10 text-3xl'>
                    <h1 className='m-4'>Name:- {user.name}</h1>
                    <h1 className='m-4'>Email:- {user.email}</h1>
                    <h1 className='m-4'>Bio:- {user.bio}</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile
