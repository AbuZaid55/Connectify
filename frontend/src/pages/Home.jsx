import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux';
import HomeSVG from "../SVG/HomeSVG.jsx"
import SingleChat from '../components/SingleChat.jsx';
import GroupChat from '../components/GroupChat.jsx';
import SingleMassage from '../components/SingleMassage.jsx';
import GroupMassage from '../components/GroupMassage.jsx'
import { openSingleChat, openGroupChat} from '../Redux/slices/chatSlice.js'


const Home = ({socket,slide,setSlide}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const chat = useSelector((state)=>(state.chat))
  const user = useSelector((state)=>(state.user))
  const [search,setSearch]=useState('')
  const [showMcomponent,setShowMcomponent]=useState(false)

  useEffect(() => {
   if(!user.validated){
    navigate('/login')
   }else{
    dispatch(openSingleChat('')); dispatch(openGroupChat('')); setShowMcomponent(false)
   }
  }, [user])
  return (
    <div className='w-full bg-primary-800 h-[100vh] p-3 md:p-4 flex items-center justify-center'>
      <div className='bg-white w-full h-full rounded-md flex '>

        <section className={`${(showMcomponent)?'hidden':'flex'} w-full md:w-[40%] lg:w-[30%] h-full md:flex flex-col border-r-4 border-primary-800`}>
          <div className='flex items-center justify-between px-3 py-2'>
            <h1 className=" text-3xl text-primary-800 font-semibold">CONNECTIFY</h1>
            <span><img className=' cursor-pointer w-12 h-12 ml-2 mr-2 border-2 border-primary-800 rounded-full' src={(user.profile && user.profile.secure_url)?user.profile.secure_url:'./profile.jpg'} alt="" onClick={()=>{navigate('/myprofile')}} /></span>
          </div>
          <div className='w-full px-2'>
            <input className='border-2 border-primary-800 w-full py-1 text-xl px-2 rounded-md' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search...' type="text" />
          </div>
          <div className=' bg-primary-800 mt-2 border-2 border-white'>
            <div className='flex items-center justify-around text-white text-2xl py-2 '>
              <div className='cursor-pointer' onClick={() => { setSlide(0) }}>Chats</div>
              <div className='cursor-pointer' onClick={() => { setSlide(100) }}>Groups</div>
            </div>
            <div className='w-[50%] relative bg-white h-1' style={{ left: `${slide / 2}%`, transition: '0.5s' }} ></div>
          </div>
          <div className='w-full flex-grow-[1] overflow-hidden'>
            <div className='w-[200%] h-full flex relative' style={{ left: `-${slide}%`, transition: '0.5s' }}>
              <SingleChat search={search.toLowerCase()} setShowMcomponent={setShowMcomponent}/>
              <GroupChat search={search.toLowerCase()} setShowMcomponent={setShowMcomponent}/>
            </div>
          </div>
        </section>
        

        <section className={`${(showMcomponent)?'block':'hidden'} md:block w-full md:w-[60%] lg:w-[70%] bg-[#f5f5f5]`}>
          <div className={`w-full relative bg-white z-30 h-full items-center justify-center ${(chat.openSingleChat==='' && chat.openGroupChat==='')?'flex':'hidden'}`}><HomeSVG/></div>
          <div className={`h-full relative z-30 bg-white  flex-col justify-between ${(chat.openSingleChat!=='' && chat.openGroupChat==='')?'flex':'hidden'}`}><SingleMassage socket={socket} setShowMcomponent={setShowMcomponent}/></div>
          <div className={`h-full relative z-30 bg-white flex-col justify-between ${(chat.openSingleChat==='' && chat.openGroupChat!=='')?'flex':'hidden'}`}><GroupMassage socket={socket} setShowMcomponent={setShowMcomponent}/></div>
        </section>

      </div>
    </div>
  )
}

export default Home
