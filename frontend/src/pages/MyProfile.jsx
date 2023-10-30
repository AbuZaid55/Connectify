import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsFillCameraFill } from 'react-icons/bs'

const MyProfile = () => {

    const navigate = useNavigate()
    const User = useSelector((state) => (state.user))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [form, setform] = useState(false)
    const [user, setUser] = useState({ _id: '', profile: { secure_url: '' }, name: '', email: '', bio: '', blockList: [], loggedIn: [] })
    const [input, setInput] = useState({ name: '', bio: '' })

    const getMyProfile = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/auth/user`, { withCredentials: true })
            setUser(res.data.user)
            setInput({ name: res.data.user.name, bio: res.data.user.bio })
        } catch (error) {
            console.log(error)
        }
    }
    const editProfile = async () => {
        console.log(input)
    }
    const uploadPic = async()=>{

    }
    const unBlock = async()=>{

    }
    const logOut = async()=>{

    }

    useEffect(() => {
        if (!User || !User._id) {
            navigate('/')
        } else {
            getMyProfile()
        }
    }, [])
    return (
        <div className='min-h-[70vh] mx-20 '>
            <h1 className='text-center text-5xl font-semibold text-primary-800 mt-10'>My Profile</h1>
            <div className='flex  h-full mt-10'>
                <div className='relative'>
                    <img className='w-96 h-96 border-4 rounded-full border-primary-800' src={(user.profile.secure_url) ? user.profile.secure_url : '/profile.jpg'} alt="" />
                    <input className='hidden' type="file" id='file' />
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
                                return <div className='flex items-center ml-5 my-2'>
                                    <h1 className='w-full min-w-[500px] text-2xl'>Device Name:- {deviceName}</h1>
                                    <button className=" bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md whitespace-nowrap">Log Out</button>
                                </div>
                            })
                        }
                    </div>
                    <div className={(user.blockList.length == 0) ? 'hidden' : ''}>
                        <h1 className='text-2xl'>BlockList:-</h1>
                        {
                            user.blockList.map(({ chatId, userId }) => {
                                return <div className='flex items-center ml-5 my-2'>
                                    <img onClick={() => { navigate(`/profile?userId=${userId._id}`) }} className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' src={(userId.profile.secure_url) ? userId.profile.secure_url : '/profile.jpg'} alt="" />
                                    <div className='ml-3'>
                                        <h1>{userId.name}</h1>
                                        <p className='h-6 overflow-hidden w-full min-w-[500px]'>{userId.bio}</p>
                                    </div>
                                    <button className=" bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md">Unblock</button>
                                </div>

                            })
                        }
                    </div>

                </div>

            </div>
            <h1 onClick={() => { setform(true) }} className='text-end mt-16'><button className=" bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 rounded-md">Edit Profile</button></h1>

            <div className={`${(form) ? 'flex' : 'hidden'} fixed top-0 left-0 w-[100%] h-[100vh] bg-white overflow-hidden items-center justify-center`}>
                <div className='flex flex-col w-96 shadow-2xl p-4'>
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
