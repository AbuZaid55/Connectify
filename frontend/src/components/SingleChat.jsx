import React from 'react'
import { useDispatch } from 'react-redux'
import {setSingleChat,setGroupChat} from '../Redux/slices/chatSlice.js'

const SingleChat = () => {
  const dispatch = useDispatch()
  return (
    <div className=' w-1/2  h-full overflow-hidden overflow-y-scroll no-scrollbar'>

                <div className='flex items-center py-2 border-b-2 border-primary-800 cursor-pointer hover:bg-hover-200 transition ease-in-out duration-300' onClick={()=>{dispatch(setSingleChat({name:'SingleTrue'}));dispatch(setGroupChat(''))}}>
                  <img src="./profile.jpg" className=' w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' />
                  <div >
                    <h1 className=' text-base h-6 overflow-hidden'>Abu Zaid Single Massage</h1>
                    <p className='w-full text-sm h-5 overflow-hidden'>hi hellow what are your doing
                    </p>
                  </div>
                  <div className=' ml-auto w-20 text-center'><span className=' bg-primary-800 inline-block w-6 h-6 rounded-full text-white'>5</span></div>
                </div>
                <div className='flex items-center py-2 border-b-2 border-primary-800 cursor-pointer hover:bg-hover-200 transition ease-in-out duration-300'>
                  <img src="./profile.jpg" className=' w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' />
                  <div >
                    <h1 className=' text-base h-6 overflow-hidden'>Abu Zaid Shibli</h1>
                    <p className='w-full text-sm h-5 overflow-hidden'>hi hellow what are your doing
                    </p>
                  </div>
                  <div className=' ml-auto w-20 text-center'><span className=' bg-primary-800 inline-block w-6 h-6 rounded-full text-white'>5</span></div>
                </div>
                <div className='flex items-center py-2 border-b-2 border-primary-800 cursor-pointer hover:bg-hover-200 transition ease-in-out duration-300'>
                  <img src="./profile.jpg" className=' w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' />
                  <div >
                    <h1 className=' text-base h-6 overflow-hidden'>Abu Zaid Shibli</h1>
                    <p className='w-full text-sm h-5 overflow-hidden'>hi hellow what are your doing
                    </p>
                  </div>
                  <div className=' ml-auto w-20 text-center'><span className=' bg-primary-800 inline-block w-6 h-6 rounded-full text-white'>5</span></div>
                </div>
                <div className='flex items-center py-2 border-b-2 border-primary-800 cursor-pointer hover:bg-hover-200 transition ease-in-out duration-300'>
                  <img src="./profile.jpg" className=' w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full' />
                  <div >
                    <h1 className=' text-base h-6 overflow-hidden'>Abu Zaid Shibli</h1>
                    <p className='w-full text-sm h-5 overflow-hidden'>hi hellow what are your doing
                    </p>
                  </div>
                  <div className=' ml-auto w-20 text-center'><span className=' bg-primary-800 inline-block w-6 h-6 rounded-full text-white'>5</span></div>
                </div>

              </div>
  )
}

export default SingleChat
