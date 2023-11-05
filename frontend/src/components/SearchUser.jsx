import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setSearchUser } from '../Redux/slices/chatSlice.js'

const SearchUser = () => {
    const user = useSelector((state)=>(state.user))
    const dispatch = useDispatch()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const useDebouce = (cb, delay = 1000) => {
        let timeId;
        return (...arg) => {
            clearTimeout(timeId);
            timeId = setTimeout(() => {
                cb(...arg)
            }, delay);
        }
    }
    const fetchUsers = async (search) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/chat/searchusers`, { search: search ,userId:user._id})
            dispatch(setSearchUser(res.data.users))
        } catch (error) {
            dispatch(setSearchUser([]))
        }
    }
    const useDebouceCallback = useDebouce((e) => { fetchUsers(e.target.value) })

    useEffect(()=>{
        if(user && user._id){
            fetchUsers('')
        }
    },[user])
    return (
        <input onChange={(e) => { useDebouceCallback(e) }} className='border-2 border-primary-800 w-full max-w-3xl p-3 text-xl rounded m-5' type="text" placeholder='Search users' />
    )
}

export default SearchUser
