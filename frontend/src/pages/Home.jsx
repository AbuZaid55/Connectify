import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import HomeSVG from "../SVG/HomeSVG.jsx"


const Home = (props) => {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)

  async function getUser() {
    const user = await props.getUser()
    if (!user) {
      navigate('/login')
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className='w-full bg-primary-800 h-[100vh] p-4 flex items-center justify-center'>
      <div className='bg-white w-full h-full rounded-md flex '>
        {/* sectioin one  */}


        <section className='w-[30%] h-full flex flex-col border-r-4 border-primary-800'>

          <div className='flex items-center justify-between px-3 py-2'>
            <h1 className=" text-3xl text-primary-800 font-semibold">Connectify</h1>
            <span><BsPersonCircle className='text-3xl text-primary-800 cursor-pointer hover:text-[#883eba] transition duration-300 ease-in-out' /></span>
          </div>

          <div className='w-full px-2'>
            <input className='border-2 border-primary-800 w-full py-1 text-xl px-2 rounded-md' placeholder='Search' type="text" />
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
              <div className=' w-1/2  h-full overflow-hidden overflow-y-scroll no-scrollbar'>

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
              <div className='w-1/2 h-full overflow-hidden overflow-y-scroll no-scrollbar'>

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
            </div>
          </div>
        </section>




        {/* section two  */}
        <section className='w-[70%] bg-[#f5f5f5]'>
            {/* <div className='w-full h-full flex items-center justify-center'><HomeSVG/></div> */}

            <div>
              
            </div>
        </section>



      </div>
    </div>
  )
}

export default Home
