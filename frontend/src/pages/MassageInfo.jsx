import axios from 'axios'
import React,{useEffect, useState,useContext} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { context } from '../context/context.js'

const MassageInfo = () => {
    const navigate = useNavigate()
    const { setLoader } = useContext(context)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const type = queryParams.get("type");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const user = useSelector((state) => (state.user))
    const [data,setData]=useState('')

    function formateData(date) {
        let result = new Date(date).toLocaleString().split(',')[1].split(' ')
        result[1] = result[1].slice(0, result[1].length - 3)
        result = result.join(' ')
        return result
    }
    const massageInfo = async()=>{
        setLoader(true)
        try {
            const res = await axios.post(`${BACKEND_URL}/${type}/massageinfo`,{_id:id})
            setData(res.data.data)
        } catch (error) {
            console.log(error.response.data.massage)
        }
        setLoader(false)
    }
    const navigateToProfile = (userId) => {
        navigate(`/profile?userId=${userId}`)
      }
    useEffect(()=>{
      if(!user.validated){
        navigate('/login')
      }
      else if(!id || !type){
          navigate('/')
      }else{
          massageInfo()
      }
    },[id,user])
  return (
    <div className='w-full'>
        <h1 className=' text-center mt-10 text-4xl text-primary-800 font-bold font-serif'>Massage Info</h1>
        <div className=' mx-10 mt-6 flex items-center justify-center'>
            <div className={` shadow-lg max-w-[25%] min-w-[10%] ${(data && data.senderId._id === user._id) ? 'myMassage' : 'otherMassage'} p-3 rounded-lg my-1 mx-2`}>
                <p className=" break-words" >{data && data.content}</p>
                <p className=" cursor-pointer hover:text-[#585858] text-end">{data && formateData(data.createdAt)}</p>
            </div>
        </div>
        <div>
            <h1 className='mt-10 text-2xl bg-primary-800 text-white font-semibold px-2 py-1'>Sent By:-</h1>
            <div className='flex items-center justify-between py-1 sm:px-2'>
              <div className='flex items-center justify-center'>
                <img onClick={() => {data && navigateToProfile(data.senderId._id) }} className=' cursor-pointer w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' src={(data && data.senderId.profile.secure_url) ? data.senderId.profile.secure_url : './profile.jpg'} alt="" />
                <div>
                  <h1 className='text-base h-6 overflow-hidden'>{data && data.senderId.name}</h1>
                  <p className='w-full text-sm h-5 overflow-hidden'>{data && data.senderId.bio}</p>
                </div>
              </div>    
            </div>
        </div>
        <div>
            <h1 className='text-2xl bg-primary-800 text-white font-semibold px-2 py-1'>Read By:-</h1>
            {
                data && data.readBy.map((user)=>{
                    return <div key={user._id} className={`${(user._id!==data.senderId._id)?'flex':'hidden'} items-center justify-between py-1 sm:px-2`}>
                    <div className='flex items-center justify-center'>
                      <img onClick={() => {navigateToProfile(user._id) }} className=' cursor-pointer w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' src={(user.profile.secure_url) ? user.profile.secure_url : './profile.jpg'} alt="" />
                      <div>
                        <h1 className='text-base h-6 overflow-hidden'>{user.name}</h1>
                        <p className='w-full text-sm h-5 overflow-hidden'>{user.bio}</p>
                      </div>
                    </div>    
                  </div>
                })
            }
        </div>
    </div>
  )
}

export default MassageInfo
