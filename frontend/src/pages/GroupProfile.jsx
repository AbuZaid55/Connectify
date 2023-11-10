import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { context } from '../context/context.js'
import { useSelector } from 'react-redux'
import { BsFillCameraFill } from 'react-icons/bs'
import { MdOutlineEditNote } from 'react-icons/md'
import { IoIosPersonAdd } from 'react-icons/io'
import { IoMdPersonAdd } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { RxExit } from 'react-icons/rx'
import axios from 'axios'
import SearchUser from '../components/SearchUser.jsx'
import {toast} from 'react-toastify'

const GroupProfile = () => {
    const navigate = useNavigate()
    const groupId = useLocation().search.slice(9,)
    const user = useSelector((state) => (state.user))
    const { setLoader } = useContext(context)
    const [group, setGroup] = useState('')
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [admin, setAdmin] = useState([])
    const [groupMember,setGroupMember]=useState([])
    const [addMemeberForm, setAddMemberForm] = useState(false)
    const [addAdminForm, setAdminForm] = useState(false)
    const searchUsers = useSelector((state) => (state.chat)).searchUsers
    const [selectedMem,setSelectedMem]=useState([])
    const [selectedAdmin,setSelectedAdmin]=useState([])
    const [searchInput,setSearchInput]=useState('')

    const getGroupDetails = async () => {
        setAdmin([])
        setGroupMember([])
        try {
            const res = await axios.post(`${BACKEND_URL}/group/getsinglegroup`, { groupId: groupId, userId: user._id })
            setGroup(res.data.data)
            res.data.data.admin.map((object) => {
                setAdmin((pre) => [...pre, object._id])
            })
            res.data.data.joinChat.map((object)=>{
                if(!res.data.data.blockList.includes(object._id)){
                    setGroupMember((pre)=>[...pre,object._id])
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const selectMember=async(e,_id)=>{
        const checked = e.target.checked
        if(checked===true){
            setSelectedMem((pre)=>[...pre,_id])
        }
        if(checked===false){
            const newList = selectedMem.filter((userId)=>userId!==_id)
            setSelectedMem(newList)
        }
    }
    const selectAdmin=async(e,_id)=>{
        const checked = e.target.checked
        if(checked===true){
            setSelectedAdmin((pre)=>[...pre,_id])
        }
        if(checked===false){
            const newList = selectedMem.filter((userId)=>userId!==_id)
            setSelectedAdmin(newList)
        }
    }
    const addUser = async()=>{
       if(selectedMem.length==0){
        toast.error('Please Select User!')
       }else{
        try {
            const res = await axios.post(`${BACKEND_URL}/group/adduser`,{chatId:group._id,users:selectedMem})
            getGroupDetails()
            setSelectedMem([])
            setAddMemberForm(false)
        } catch (error) {
            console.log(error)
        }
       }
    }
    const addAdmin = async()=>{
       if(selectedAdmin.length==0){
        toast.error('Please Select User!')
       }else{
        try {
            const res = await axios.post(`${BACKEND_URL}/group/addadmin`,{chatId:group._id,users:selectedAdmin})
            console.log(res)
            getGroupDetails()
            setSelectedAdmin([])
            setAdminForm(false)
        } catch (error) {
            console.log(error)
        }
       }
    }
    const removeAdmin = async(adminId)=>{
        try {
            const res = await axios.post(`${BACKEND_URL}/group/removeadmin`,{chatId:group._id,myId:user._id,adminId:adminId})
            console.log(res)
            if(res.status===202){
                toast.warning('Please Make Admin to another!')
            }else{
                getGroupDetails()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const removeUser = async(_id)=>{
        try {
            const res = await axios.post(`${BACKEND_URL}/group/removeuser`,{chatId:group._id,userId:_id})
            getGroupDetails()
        } catch (error) {
            console.log(error)
        }
    }
    const deleteChat = async()=>{
        try {
            const res = await axios.post(`${BACKEND_URL}/group/deletegroup`,{chatId:group._id,userId:user._id})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
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
                <img className='absolute h-[40%] shadow-xl rounded-md border-2 border-primary-800' src="../profile.jpg" alt="" />
                <div className='bg-white h-52 w-full'></div>
            </div>
            <div><h1 className='text-center text-4xl font-semibold text-primary-800 -mt-8'>My Group</h1></div>
            <div className=' text-center w-[80%] md:w-[50%] mx-auto mt-4'><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, odio dolores. Earum!</p></div>
            <div className=' flex items-center justify-center'>
                <button className={` ${(admin.includes(user._id)?'':'hidden')} bg-[#e3e3e3] text-4xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><BsFillCameraFill /></button>
                <button className={`${(admin.includes(user._id)?'':'hidden')} bg-[#e3e3e3] text-4xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><MdOutlineEditNote /></button>
                <button onClick={()=>{removeUser(user._id)}} className={` ${(groupMember.includes(user._id) && !admin.includes(user._id)?'':'hidden')} bg-[#e3e3e3] text-3xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><RxExit /></button>
                <button onClick={()=>{deleteChat()}} className={`${(group && group.blockList.includes(user._id)?'':'hidden')} bg-[#e3e3e3] text-3xl px-10 mx-5 py-2 border-2 border-primary-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><RiDeleteBin5Line /></button>
            </div>
            <div className=' bg-[#e3e3e3] mt-8 border-2 border-primary-800'>
                <h1 className='flex items-center justify-between bg-primary-800 text-white px-5 py-2 text-xl'>Group Admin<span className='bg-white text-primary-800 shadow-lg p-2 cursor-pointer rounded' onClick={()=>{setAdminForm(true)}}><IoIosPersonAdd /></span></h1>
                {
                    group && group.admin.map((Admin) => {
                        return <div key={Admin._id} className='flex items-center justify-between' >
                            <div className='flex items-center ml-5 my-2 py-2'>
                                <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' src={(Admin.profile.secure_url) ? Admin.profile.secure_url : '../profile.jpg'} alt="Img" />
                                <div className='ml-3'>
                                    <h1>{(Admin._id === user._id) ? 'You' : Admin.name}</h1>
                                    <p className='h-6 overflow-hidden w-full min-w-[500px]'>{Admin.bio}</p>
                                </div>
                            </div>
                            <button onClick={()=>{removeAdmin(Admin._id)}} className={`${(admin.includes(user._id)?'':'hidden')}  mr-5 my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-[#e3e3e3] transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800`}><RiDeleteBin5Line/></button>
                        </div>
                    })
                }
            </div>
            <div className=' bg-[#e3e3e3] mt-8 border-2 border-primary-800'>
                <h1 className='flex items-center justify-between bg-primary-800 text-white px-5 py-2 text-xl'>Group Members<span className='bg-white text-primary-800 shadow-lg p-2 cursor-pointer rounded' onClick={() => { setAddMemberForm(true) }}><IoMdPersonAdd /></span></h1>
                {
                    group && group.joinChat.map((data) => {
                        return <div key={data._id}>
                            {!admin.includes(data._id) && !group.blockList.includes(data._id) && <div className='flex items-center justify-between'>
                                <div className='flex items-center ml-5 my-2 py-2'>
                                <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                <div className='ml-3'>
                                    <h1>{(data._id === user._id) ? 'You' : data.name}</h1>
                                    <p className='h-6 overflow-hidden w-full min-w-[500px]'>{data.bio}</p>
                                </div>
                            </div>
                            <button onClick={()=>{removeUser(data._id)}} className={` ${(admin.includes(user._id)?'':'hidden')} mr-5 my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-[#e3e3e3] transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800`}><RiDeleteBin5Line/></button>
                                </div>}
                        </div>
                    })
                }
            </div>


            <div className={` ${(addMemeberForm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full items-center justify-center h-full`}>
                <div className='bg-white rounded-lg shadow-lg w-[80%] flex flex-col md:w-[70%] h-[90vh]'>
                    <p className='w-full flex items-center justify-end'><span className=' z-10 bg-primary-800 text-white p-4 rounded-tr-lg rounded-bl-lg cursor-pointer' onClick={() => { setAddMemberForm(false) }}>X</span></p>
                    <h1 className='text-center text-2xl text-primary-800 -mt-10 font-semibold'>Add Memebers</h1>
                    <div className='flex items-center justify-center'><SearchUser /></div>
                    <div className=' overflow-hidden overflow-y-auto flex-grow-[1]'>
                    {
                    searchUsers && searchUsers.map((data) => {
                        return <div key={data._id}>
                            {!groupMember.includes(data._id) && <div className='flex px-2'>
                                <input type="checkbox" id={data._id} checked={selectedMem.includes(data._id)}  onChange={(e)=>{selectMember(e,data._id)}}/>
                                <label htmlFor={data._id} className=' cursor-pointer'>
                                <div className='flex items-center ml-5 my-2 py-2'>
                                <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' onClick={()=>{navigate(`/profile?userId=${data._id}`)}} src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                <div className='ml-3'>
                                    <h1>{data.name}</h1>
                                    <p className='h-6 overflow-hidden w-full min-w-[500px]'>{data.bio}</p>
                                </div>
                            </div>
                                </label>
                                
                                </div>}
                        </div>
                    })
                }
                    </div>
                    <div className='flex items-center justify-between px-5 bg-white'>
                        <p className=' text-primary-800 text-xl'>Selected:- {selectedMem.length}</p>
                        <button onClick={()=>{addUser()}} className=" my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Add</button>
                    </div>
                </div>



            </div>
                <div className={` ${(addAdminForm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full items-center justify-center h-full`}>
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
                                (searchInput==='')? <div className='flex px-2'>
                                <input type="checkbox" id={data._id} checked={selectedAdmin.includes(data._id)} onChange={(e)=>{selectAdmin(e,data._id)}}/>
                                <label htmlFor={data._id} className=' cursor-pointer'>
                                <div className='flex items-center ml-5 my-2 py-2'>
                                <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' onClick={()=>{navigate(`/profile?userId=${data._id}`)}} src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                <div className='ml-3'>
                                    <h1>{data.name}</h1>
                                    <p className='h-6 overflow-hidden w-full min-w-[500px]'>{data.bio}</p>
                                </div>
                            </div>
                                </label>
                                </div>:
                                 (data.name.toLowerCase().includes(searchInput)) && <div className='flex px-2'>
                                    <input type="checkbox" id={data._id} checked={selectedAdmin.includes(data._id)} onChange={(e)=>{selectAdmin(e,data._id)}}/>
                                    <label htmlFor={data._id} className=' cursor-pointer'>
                                    <div className='flex items-center ml-5 my-2 py-2'>
                                    <img className=' cursor-pointer w-16 h-16 border-2 rounded-full border-primary-800' onClick={()=>{navigate(`/profile?userId=${data._id}`)}} src={(data.profile.secure_url) ? data.profile.secure_url : '../profile.jpg'} alt="Img" />
                                    <div className='ml-3'>
                                        <h1>{data.name}</h1>
                                        <p className='h-6 overflow-hidden w-full min-w-[500px]'>{data.bio}</p>
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
                    <div className='flex items-center justify-between px-5 bg-white'>
                        <p className=' text-primary-800 text-xl'>Selected:- {selectedAdmin.length}</p>
                        <button onClick={()=>{addAdmin()}} className=" my-4 bg-primary-800 text-white text-md font-semibold py-2 px-10 rounded hover:bg-hover-200 transition duration-300 ease-in-out border-2 border-primary-800 hover:text-primary-800">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupProfile
