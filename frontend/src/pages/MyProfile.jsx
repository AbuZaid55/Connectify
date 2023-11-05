import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCameraFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { unblockUser} from '../Redux/slices/chatSlice.js'
import {context} from '../context/context.js'
import { toast } from 'react-toastify'

const MyProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.user))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [form, setform] = useState(false)
    const [input, setInput] = useState({ name: '', bio: '' })
    const {getUser,setLoader} = useContext(context)
    const [user, setUser] = useState({ _id: '',validated:'', profile: { secure_url: '' }, name: '', email: '', bio: '', blockList: [], loggedIn: [] })

    const getMyProfile = async () => {
        const data = await getUser()
        if(data){
            setUser(data)
            setInput({ name: data.name, bio: data.bio})
        }
    }
    const editProfile = async () => {
        setLoader(true)
       if(input.name && input.bio){
        try {
            const res = await axios.post(`${BACKEND_URL}/editprofile`,{userId:user._id,name:input.name,bio:input.bio})
            getMyProfile()
            setform(false)
            toast.success('Profile update successfully')
        } catch (error) {
            if(error.response.data.massage ){
                toast.error(error.response.data.massage)
            }
            console.log(error)
        }
       }
       setLoader(false)
    }
    const uploadPic = async(e)=>{
        setLoader(true)
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('_id',user._id)
        formdata.append("file",file)
        try {
            const res = await axios.post(`${BACKEND_URL}/uploadpic`,formdata)
            getMyProfile()
            toast.success("Profile uploaded successfully")
        } catch (error) {
            if(error.response.data.massage ){
                toast.error(error.response.data.massage)
            }
            console.log(error)
        }
        setLoader(false)

    }
    const unBlock = async(chatId)=>{
        setLoader(true)
        try {
            await axios.post(`${BACKEND_URL}/chat/unblockchat`, { userId: user._id, chatId: chatId })
            dispatch(unblockUser({ userId: user._id, chatId: chatId }))
            getMyProfile()
          } catch (error) {
            console.log(error)
          }
          setLoader(false)
    }
    const logOut = async(_id)=>{
        setLoader(true)
        if(_id){
            try {
                const res = await axios.post(`${BACKEND_URL}/logout`,{userId:user._id,tokenId:_id},{withCredentials:true})
                getMyProfile()
            } catch (error) {
                console.log(error)
            }
        }
        setLoader(false)
    }

    useEffect(() => {
        getMyProfile()
    }, [])
    useEffect(()=>{
        if (User && !User._id) {
            navigate('/')
        }
    },[User])
    return (
        <div className='min-h-[70vh] mx-20 '>
            <h1 className='text-center text-5xl font-semibold text-primary-800 mt-10'>My Profile</h1>
            <div className='flex  h-full mt-10'>
                <div className='relative'>
                    <img className='w-96 h-96 border-4 rounded-full border-primary-800' src={(user.profile.secure_url) ? user.profile.secure_url : '/profile.jpg'} alt="" />
                    <input onChange={(e)=>{uploadPic(e)}} className='hidden' type="file" id='file' />
                    <label className='absolute top-64 right-1 cursor-pointer bg-white text-xl p-2 rounded-full shadow-lg' htmlFor="file"><BsFillCameraFill/></label>
                </div>
                <div className='ml-10'>
                    <h1 className='text-2xl my-2'>User Id:- {user._id}</h1>
                    <h1 className='text-2xl my-2'>Name:- {user.name}</h1>
                    <h1 className='text-2xl my-2'>Email:- {user.email}</h1>
                    <h1 className='text-2xl my-2'>Bio:- {user.bio}</h1>
                    <div className={(user.loggedIn.length == 0) ? 'hidden' : ''}>
                        <h1 className='text-2xl'>Logged In</h1>
                        {
                            user.loggedIn.map(({ deviceName, _id }) => {
                                return <div key={_id} className='flex items-center ml-5 my-2'>
                                    <h1 className='w-full min-w-[500px] text-2xl'>Device Name:- {(_id==user.myTokenId)?'Your Device':deviceName}</h1>
                                    <button className=" bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md whitespace-nowrap" onClick={()=>{logOut(_id)}}>Log Out</button>
                                </div>
                            })
                        }
                    </div>
                    <div className={(user.blockList.length == 0) ? 'hidden' : ''}>
                        <h1 className='text-2xl'>BlockList:-</h1>
                        {
                            user.blockList.map(({ chatId, userId }) => {
                                return <div key={chatId} className='flex items-center ml-5 my-2'>
                                    <img onClick={() => { navigate(`/profile?userId=${userId._id}`) }} className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' src={(userId.profile.secure_url) ? userId.profile.secure_url : '/profile.jpg'} alt="" />
                                    <div className='ml-3'>
                                        <h1>{userId.name}</h1>
                                        <p className='h-6 overflow-hidden w-full min-w-[500px]'>{userId.bio}</p>
                                    </div>
                                    <button onClick={()=>{unBlock(chatId)}} className=" bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md">Unblock</button>
                                </div>

                            })
                        }
                    </div>

                </div>

            </div>
            <h1 onClick={() => { setform(true) }} className='text-end mt-16'><button className=" bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md">Edit Profile</button></h1>

            <div className={`${(form) ? 'flex' : 'hidden'} fixed top-0 left-0 w-[100%] h-[100vh] bg-[#00000050] overflow-hidden items-center justify-center`}>
                <div className='flex flex-col w-96 shadow-2xl p-4 bg-white'>
                    <p className='text-end cursor-pointer' onClick={() => { setform(false) }}>X</p>
                    <label className='mt-2 text-xl' htmlFor="name">Change your name:- </label>
                    <input value={input.name} onChange={(e) => { setInput({ ...input, name: e.target.value }) }} className='border-2 border-primary-800  py-2' type="text" id='name' />
                    <label className='mt-4 text-xl' htmlFor="bio">Change your bio:- </label>
                    <input value={input.bio} onChange={(e) => { setInput({ ...input, bio: e.target.value }) }} type="text" className='border-2 border-primary-800 py-2' id='bio' />
                    <button onClick={() => { editProfile() }} className=" mt-4 bg-primary-800 text-white text-md font-semibold py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
