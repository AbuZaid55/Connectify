import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCameraFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { unblockUser } from '../Redux/slices/chatSlice.js'
import { context } from '../context/context.js'
import { toast } from 'react-toastify'
import { MdCastConnected } from "react-icons/md";
import { MdOutlineEditNote } from 'react-icons/md'


const MyProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.user))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [form, setform] = useState(false)
    const [input, setInput] = useState({ name: '', bio: '' })
    const { getUser, setLoader } = useContext(context)
    const [user, setUser] = useState({ _id: '', validated: '', profile: { secure_url: '' }, name: '', email: '', bio: '', blockList: [], loggedIn: [] })

    const getMyProfile = async () => {
        const data = await getUser()
        if (data) {
            setUser(data)
            setInput({ name: data.name, bio: data.bio })
        }
    }
    const editProfile = async () => {
        setLoader(true)
        if (input.name && input.bio) {
            try {
                const res = await axios.post(`${BACKEND_URL}/editprofile`, { userId: user._id, name: input.name, bio: input.bio })
                getMyProfile()
                setform(false)
                toast.success('Profile update successfully')
            } catch (error) {
                if (error.response.data.massage) {
                    toast.error(error.response.data.massage)
                }
                console.log(error)
            }
        }
        setLoader(false)
    }
    const uploadPic = async (e) => {
        setLoader(true)
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('_id', user._id)
        formdata.append("file", file)
        try {
            const res = await axios.post(`${BACKEND_URL}/uploadpic`, formdata)
            getMyProfile()
            toast.success("Profile uploaded successfully")
        } catch (error) {
            if (error.response.data.massage) {
                toast.error(error.response.data.massage)
            }
            console.log(error)
        }
        setLoader(false)

    }
    const unBlock = async (chatId) => {
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
    const logOut = async (_id) => {
        setLoader(true)
        if (_id) {
            try {
                const res = await axios.post(`${BACKEND_URL}/logout`, { userId: user._id, tokenId: _id }, { withCredentials: true })
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
    useEffect(() => {
        if (User && !User._id) {
            navigate('/')
        }
    }, [User])
    return (
        <div>
            <div className=' relative flex items-center justify-center h-[100vh] w-full border-b-2 border-primary-800'>
                <div className='w-1/2 h-full bg-primary-800 flex items-center justify-center'></div>
                <div className=' absolute'>
                    <img className='border-2 border-primary-800 w-72 h-72 md:w-96 md:h-96 rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] hover:scale-110 transition ease-in-out duration-300 cursor-pointer' src={(user.profile.secure_url) ? user.profile.secure_url : '/profile.jpg'} alt="" />
                    <div className='flex items-center justify-between mt-20'>
                        <input type="file" className='hidden' id='file' onChange={(e) => { uploadPic(e) }} />
                        <label htmlFor='file' className={`bg-[#e3e3e3] text-4xl px-10 py-2 border-2 shadow-lg border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><BsFillCameraFill /></label>
                        <button onClick={() => { setform(true) }} className={`bg-[#e3e3e3] text-4xl px-10 py-2 border-2 shadow-lg border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><MdOutlineEditNote /></button>
                    </div>
                </div>
                <div className='w-1/2 overflow-y-auto h-full'></div>
            </div>
            <div className='flex items-center justify-center flex-col py-10'>
                <h1 className='text-4xl md:text-6xl font-semibold text-primary-800'>{user.name}</h1>
                <h1 className='md:text-xl mt-2'>{user.email}</h1>
                <p className='md:text-xl mt-2 w-[80%] md:w-[50%] text-center'>{user.bio}</p>
            </div>
            <div>
                <h1 className=' bg-primary-800 text-xl text-white px-5 py-2'>Loggend In</h1>
                <div className='flex flex-wrap items-center justify-center'>
                    {
                        user.loggedIn.map(({ deviceName, _id }) => {
                            return <div key={_id} className='bg-white shadow-xl flex items-center justify-center h-52 w-72 flex-col p-2 m-5 rounded-md hover:scale-110 transition duration-300 ease-in-out border-2 border-primary-800'>
                                <span className='text-6xl my-2'><MdCastConnected /></span>
                                <h1 className='text-center text-3xl w-full my-2 whitespace-nowrap overflow-hidden'>{(_id == user.myTokenId) ? 'Your Device' : deviceName}</h1>
                                <button className="w-full mt-3 rounded bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 whitespace-nowrap" onClick={() => { logOut(_id) }}>Log Out</button>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={(user.blockList.length == 0) ? 'hidden' : ''}>
                <h1 className=' bg-primary-800 text-xl text-white px-5 py-2'>Blocklist</h1>
                <div className='flex items-center justify-center flex-wrap'>
                    {
                        user.blockList.map(({ chatId, userId }) => {
                            return <div  key={chatId} className='h-60 w-60 m-5 rounded-md shadow-xl border-2 border-primary-800'>
                                <div className='flex items-center justify-center flex-col'>
                                    <div className='w-full h-20 bg-primary-800'></div>
                                    <img onClick={() => { navigate(`/profile?userId=${userId._id}`) }} className='w-20 h-20 absolute rounded-lg shadow-lg hover:scale-110 cursor-pointer transition duration-300 ease-in-out' src={(userId.profile.secure_url) ? userId.profile.secure_url : '/profile.jpg'} alt="" />
                                    <div className='w-full h-20 bg-white'></div>
                                </div>
                                <div className='flex items-center justify-center flex-col -mt-7 p-2'>
                                    <h1 className='text-2xl'>{userId.name}</h1>
                                    <button  onClick={()=>{unBlock(chatId)}} className="mt-3 w-full rounded bg-primary-800 text-white text-md font-semibold px-4 py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800 whitespace-nowrap">Unblock</button>
                                </div>
                            </div>

                        })
                    }
                </div>
            </div>
            <div className={`${(form) ? 'flex' : 'hidden'} fixed top-0 left-0 w-[100%] h-[100vh] bg-[#00000050] overflow-hidden items-center justify-center`}>
                <div className='flex flex-col w-96 shadow-2xl p-4 bg-white rounded-lg'>
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
