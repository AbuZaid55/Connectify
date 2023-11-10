import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { context } from '../context/context.js'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCameraFill } from 'react-icons/bs'
import { MdOutlineEditNote } from 'react-icons/md'
import { IoIosPersonAdd } from 'react-icons/io'
import { IoMdPersonAdd } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { RxExit } from 'react-icons/rx'
import axios from 'axios'
import SearchUser from '../components/SearchUser.jsx'
import { toast } from 'react-toastify'
import { deleteGroup, leftUser,editgroup, uploadPic } from '../Redux/slices/chatSlice.js'

const GroupProfile = ({ socket }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const groupId = useLocation().search.slice(9,)
    const user = useSelector((state) => (state.user))
    const { setLoader } = useContext(context)
    const [group, setGroup] = useState('')
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [admin, setAdmin] = useState([])
    const [groupMember, setGroupMember] = useState([])
    const [addMemeberForm, setAddMemberForm] = useState(false)
    const [addAdminForm, setAdminForm] = useState(false)
    const searchUsers = useSelector((state) => (state.chat)).searchUsers
    const [selectedMem, setSelectedMem] = useState([])
    const [selectedAdmin, setSelectedAdmin] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [input,setInput]=useState({chatName:'',desc:''})

    const getGroupDetails = async () => {
        setLoader(true)
        setAdmin([])
        setGroupMember([])
        try {
            const res = await axios.post(`${BACKEND_URL}/group/getsinglegroup`, { groupId: groupId, userId: user._id })
            setGroup(res.data.data)
            res.data.data.admin.map((object) => {
                setAdmin((pre) => [...pre, object._id])
            })
            res.data.data.joinChat.map((object) => {
                if (!res.data.data.blockList.includes(object._id)) {
                    setGroupMember((pre) => [...pre, object._id])
                }
            })
            setInput({chatName:res.data.data.chatName,desc:res.data.data.description})
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    const selectMember =  (e, _id) => {
        const checked = e.target.checked
        if (checked === true) {
            setSelectedMem((pre) => [...pre, _id])
        }
        if (checked === false) {
            const newList = selectedMem.filter((userId) => userId !== _id)
            setSelectedMem(newList)
        }
    }
    const selectAdmin = (e, _id) => {
        const checked = e.target.checked
        if (checked === true) {
            setSelectedAdmin((pre) => [...pre, _id])
        }
        if (checked === false) {
            const newList = selectedMem.filter((userId) => userId !== _id)
            setSelectedAdmin(newList)
        }
    }
    const addUser = async () => {
        setLoader(true)
        if (selectedMem.length == 0) {
            toast.error('Please Select User!')
        } else {
            try {
                const res = await axios.post(`${BACKEND_URL}/group/adduser`, { chatId: group._id, users: selectedMem })
                getGroupDetails()
                setSelectedMem([])
                setAddMemberForm(false)
                socket.emit('addInGroup', { chat: group, usersId: selectedMem })
            } catch (error) {
                console.log(error)
            }
        }
        setLoader(false)
    }
    const addAdmin = async () => {
        setLoader(true)
        if (selectedAdmin.length == 0) {
            toast.error('Please Select User!')
        } else {
            try {
                const res = await axios.post(`${BACKEND_URL}/group/addadmin`, { chatId: group._id, users: selectedAdmin })
                getGroupDetails()
                setSelectedAdmin([])
                setAdminForm(false)
            } catch (error) {
                console.log(error)
            }
        }
        setLoader(false)
    }
    const removeAdmin = async (adminId) => {
        setLoader(true)
        try {
            const res = await axios.post(`${BACKEND_URL}/group/removeadmin`, { chatId: group._id, myId: user._id, adminId: adminId })
            if (res.status === 202) {
                toast.warning('Please Make Admin to another!')
            } else {
                getGroupDetails()
            }
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    const removeUser = async (_id) => {
        setLoader(true)
        try {
            const res = await axios.post(`${BACKEND_URL}/group/removeuser`, { chatId: group._id, userId: _id })
            getGroupDetails()
            dispatch(leftUser({ chatId: group._id, userId: _id }))
            if (user._id !== _id) {
                socket.emit('removeGroupUser', { chatId: group._id, userId: _id })
            }
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    const deleteChat = async () => {
        setLoader(true)
        try {
            const res = await axios.post(`${BACKEND_URL}/group/deletegroup`, { chatId: group._id, userId: user._id })
            dispatch(deleteGroup({ chatId: group._id }))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }
    const editGroup = async()=>{
        setLoader(true)
        if(!input.chatName){
            toast.error("Enter Group Name")
        }
        try {
            const res = await axios.post(`${BACKEND_URL}/group/editgroup`,{chatId:group._id,chatName:input.chatName,description:input.desc})
            getGroupDetails()
            dispatch(editgroup({chatId:group._id,chatName:input.chatName,description:input.desc}))
            setShowEditForm(false)
        } catch (error) {
           console.log(error) 
        }
        setLoader(false)
    }
    const uploadProfile = async(e)=>{
        setLoader(true)
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('chatId',group._id)
        formdata.append("file",file)
        try {
            const res = await axios.post(`${BACKEND_URL}/group/uploadprofile`,formdata)
            getGroupDetails()
            dispatch(uploadPic({chatId:res.data.chatId,secure_url:res.data.secure_url}))
            toast.success("Profile uploaded successfully")
        } catch (error) {
            if(error.response.data.massage ){
                toast.error(error.response.data.massage)
            }
        }
        setLoader(false)
    }
    
    useEffect(() => {
        if (!groupId) {
            navigate('/')
        }
        if (user && !user._id) {
            navigate('/login')
        }
        if (user && user._id) {
            getGroupDetails()
        }
    }, [user])
    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className=' bg-primary-800 h-52 w-full'></div>
                <img className='absolute h-[40%] shadow-xl rounded-md border-2 border-primary-800' src={(group && group.profile.secure_url)?group.profile.secure_url:'../profile.jpg'} alt="" />
                <div className='bg-white h-52 w-full'></div>
            </div>
            <div><h1 className='text-center text-4xl font-semibold text-primary-800 -mt-8'>{group.chatName}</h1></div>
            <div className=' text-center w-[80%] md:w-[50%] mx-auto mt-4'><p>{group.description}</p></div>
            <div className=' flex items-center justify-center'>
                <input type="file" className='hidden' id='file' onChange={(e)=>{uploadProfile(e)}}/>
                <label htmlFor='file' className={` ${(admin.includes(user._id) ? '' : 'hidden')} bg-[#e3e3e3] text-4xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><BsFillCameraFill /></label>
                <button onClick={()=>{setShowEditForm(true)}} className={`${(admin.includes(user._id) ? '' : 'hidden')} bg-[#e3e3e3] text-4xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><MdOutlineEditNote /></button>
                <button onClick={() => { removeUser(user._id) }} className={` ${(groupMember.includes(user._id) && !admin.includes(user._id) ? '' : 'hidden')} bg-[#e3e3e3] text-3xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><RxExit /></button>
                <button onClick={() => { deleteChat() }} className={`${(group && group.blockList.includes(user._id) ? '' : 'hidden')} bg-[#e3e3e3] text-3xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><RiDeleteBin5Line /></button>
            </div>
            <div className=' bg-[#e3e3e3] mt-8 border-2 border-primary-800'>
                <h1 className='flex items-center justify-between bg-primary-800 text-white px-5 py-2 text-xl'>Group Admin<span className={`${(admin.includes(user._id) ? '' : 'hidden')}  bg-white text-primary-800 shadow-lg p-2 cursor-pointer rounded`} onClick={() => { setAdminForm(true) }}><IoIosPersonAdd /></span></h1>
                {
                    group && group.admin.map((Admin) => {
                        return <div key={Admin._id} className='flex items-center justify-between' >
                            <div className='flex items-center ml-5 my-2 py-2'>
                                <img onClick={() => { navigate(`/profile?userId=${Admin._id}`) }} className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' src={(Admin.profile.secure_url) ? Admin.profile.secure_url : '../profile.jpg'} alt="Img" />
                                <div className='ml-3'>
                                    <h1>{(Admin._id === user._id) ? 'You' : Admin.name}</h1>
                                    <p className='h-6 overflow-hidden w-full'>{Admin.bio}</p>
                                </div>
                            </div>
                            <button onClick={() => { removeAdmin(Admin._id) }} className={`${(admin.includes(user._id) ? '' : 'hidden')}  mr-5 my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-[#e3e3e3] transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800`}><RiDeleteBin5Line /></button>
                        </div>
                    })
                }
            </div>
            <div className=' bg-[#e3e3e3] mt-8 border-2 border-primary-800'>
                <h1 className='flex items-center justify-between bg-primary-800 text-white px-5 py-2 text-xl'>Group Members<span className={`${(admin.includes(user._id) ? '' : 'hidden')}  bg-white text-primary-800 shadow-lg p-2 cursor-pointer rounded`} onClick={() => { setAddMemberForm(true) }}><IoMdPersonAdd /></span></h1>
                {
                    group && group.joinChat.map((data) => {
                        return <div key={data._id}>
                            {!admin.includes(data._id) && !group.blockList.includes(data._id) && <div className='flex items-center justify-between'>
                                <div className='flex items-center ml-5 my-2 py-2'>
                                    <img onClick={() => { navigate(`/profile?userId=${data._id}`) }} className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                    <div className='ml-3'>
                                        <h1>{(data._id === user._id) ? 'You' : data.name}</h1>
                                        <p className='h-6 overflow-hidden w-full'>{data.bio}</p>
                                    </div>
                                </div>
                                <button onClick={() => { removeUser(data._id) }} className={` ${(admin.includes(user._id) ? '' : 'hidden')} mr-5 my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-[#e3e3e3] transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800`}><RiDeleteBin5Line /></button>
                            </div>}
                        </div>
                    })
                }
            </div>


            <div className={` ${(addMemeberForm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full items-center justify-center h-full bg-[#00000050]`}>
                <div className='bg-white rounded-lg shadow-lg w-[80%] flex flex-col md:w-[70%] h-[90vh]'>
                    <p className='w-full flex items-center justify-end'><span className=' z-10 bg-primary-800 text-white p-4 rounded-tr-lg rounded-bl-lg cursor-pointer' onClick={() => { setAddMemberForm(false) }}>X</span></p>
                    <h1 className='text-center text-2xl text-primary-800 -mt-10 font-semibold'>Add Memebers</h1>
                    <div className='flex items-center justify-center'><SearchUser /></div>
                    <div className=' overflow-hidden overflow-y-auto flex-grow-[1]'>
                        {
                            searchUsers && searchUsers.map((data) => {
                                return <div key={data._id}>
                                    {!groupMember.includes(data._id) && <div className='flex px-2'>
                                        <input type="checkbox" id={data._id} checked={selectedMem.includes(data._id)} onChange={(e) => { selectMember(e, data._id) }} />
                                        <label htmlFor={data._id} className=' cursor-pointer'>
                                            <div className='flex items-center ml-5 my-2 py-2'>
                                                <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' onClick={() => { navigate(`/profile?userId=${data._id}`) }} src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                                <div className='ml-3'>
                                                    <h1>{data.name}</h1>
                                                    <p className='h-6 overflow-hidden w-full'>{data.bio}</p>
                                                </div>
                                            </div>
                                        </label>

                                    </div>}
                                </div>
                            })
                        }
                    </div>
                    <div className='flex items-center justify-between px-5 bg-white rounded-b-lg'>
                        <p className=' text-primary-800 text-xl'>Selected:- {selectedMem.length}</p>
                        <button onClick={() => { addUser() }} className=" my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Add</button>
                    </div>
                </div>



            </div>
            <div className={` ${(addAdminForm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full items-center justify-center h-full bg-[#00000050]`}>
                <div className='bg-white rounded-lg shadow-lg w-[80%] flex flex-col md:w-[70%] h-[90vh]'>
                    <p className='w-full flex items-center justify-end'><span className=' z-10 bg-primary-800 text-white p-4 rounded-tr-lg rounded-bl-lg cursor-pointer' onClick={() => { setAdminForm(false) }}>X</span></p>
                    <h1 className='text-center text-2xl text-primary-800 -mt-10 font-semibold'>Add Admin</h1>
                    <div className='flex items-center justify-center'><input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} className='border-2 border-primary-800 w-full max-w-3xl p-3 text-xl rounded m-5' type="text" placeholder='Search users' /></div>
                    <div className=' overflow-hidden overflow-y-auto flex-grow-[1]'>
                        {
                            group && group.joinChat.map((data) => {
                                return <div key={data._id}>
                                    {!admin.includes(data._id) && <div >
                                        {
                                            (searchInput === '') ? <div className='flex px-2'>
                                                <input type="checkbox" id={data._id} checked={selectedAdmin.includes(data._id)} onChange={(e) => { selectAdmin(e, data._id) }} />
                                                <label htmlFor={data._id} className=' cursor-pointer'>
                                                    <div className='flex items-center ml-5 my-2 py-2'>
                                                        <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' onClick={() => { navigate(`/profile?userId=${data._id}`) }} src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                                        <div className='ml-3'>
                                                            <h1>{data.name}</h1>
                                                            <p className='h-6 overflow-hidden w-full'>{data.bio}</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div> :
                                                (data.name.toLowerCase().includes(searchInput)) && <div className='flex px-2'>
                                                    <input type="checkbox" id={data._id} checked={selectedAdmin.includes(data._id)} onChange={(e) => { selectAdmin(e, data._id) }} />
                                                    <label htmlFor={data._id} className=' cursor-pointer'>
                                                        <div className='flex items-center ml-5 my-2 py-2'>
                                                            <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' onClick={() => { navigate(`/profile?userId=${data._id}`) }} src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                                            <div className='ml-3'>
                                                                <h1>{data.name}</h1>
                                                                <p className='h-6 overflow-hidden w-full'>{data.bio}</p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                        }


                                    </div>}
                                </div>
                            })
                        }
                    </div>
                    <div className='flex items-center justify-between px-5 bg-white rounded-b-lg'>
                        <p className=' text-primary-800 text-xl'>Selected:- {selectedAdmin.length}</p>
                        <button onClick={() => { addAdmin() }} className=" my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Add</button>
                    </div>
                </div>
            </div>
            <div className={`${(showEditForm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-[100%] h-[100vh] bg-[#00000050] overflow-hidden items-center justify-center`}>
                <div className='flex flex-col w-96 shadow-2xl p-4 bg-white rounded-md'>
                    <p className='text-end cursor-pointer' onClick={() => { setShowEditForm(false) }}>X</p>
                    <label className='mt-2 text-xl' htmlFor="name">Enter Group Name:- </label>
                    <input value={input.chatName} onChange={(e) => { setInput({ ...input, chatName: e.target.value }) }} className='border-2 border-primary-800  py-2' type="text" id='name' />
                    <label className='mt-4 text-xl' htmlFor="bio">Change description:- </label>
                    <input value={input.desc} onChange={(e) => { setInput({ ...input, desc: e.target.value }) }} type="text" className='border-2 border-primary-800 py-2' id='bio' />
                    <button onClick={() => { editGroup() }} className=" mt-4 bg-primary-800 text-white text-md font-semibold py-2 hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default GroupProfile
