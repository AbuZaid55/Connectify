import React, { useEffect,useRef,useState } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { LiaLaughSquint } from "react-icons/lia";
import { IoIosSend } from "react-icons/io";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

const SingleMassage = () => {
    const [dropdown,setDropdown]=useState(false)
    const [emoji,setEmoji]=useState(false)
    const [input,setInput]=useState('')
    const dropdownRef = useRef(null)
    const emojiRef=useRef(null)


    const getClick=(e)=>{
        if(!dropdownRef.current.contains(e.target)){
          setDropdown(false)
        }
        if(!emojiRef.current.contains(e.target)){
            setEmoji(false)
        }
    }

    const submitMassage = ()=>{
        setInput('')
    }
    useEffect(()=>{
    document.addEventListener('click',getClick,true)
    return () => removeEventListener('click',getClick)
    })
  return (
    <div className="h-full flex flex-col justify-between">

      <div className="flex items-center py-2 bg-white">
        <img src="./profile.jpg" className=" w-14 h-14 ml-2 mr-2 border-2 border-primary-800 rounded-full" />
        <div>
          <h1 className=" text-base h-6 overflow-hidden">Abu Zaid Shibli</h1>
          <p className="w-full text-sm h-5 overflow-hidden">hi hellow what are your doing lorem300</p>
        </div>
        <div ref={dropdownRef} className="ml-auto  relative mr-3">
          <div className={`text-2xl mb-3 p-2  rounded-full cursor-pointer transition duration-300 ease-in-out ${dropdown ? "bg-primary-800 text-white" : " text-primary-800"}`} onClick={() => {setDropdown(!dropdown)}}><CiMenuKebab /></div>
          <ul className={`absolute top-full mt-3 right-0 bg-white whitespace-nowrap rounded-md z-10 ${dropdown ? "block" : "hidden"}`}>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Contact Info</li>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Close chat</li>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Clear all chat</li>
            <li className="px-4 py-2 text-lg hover:bg-hover-200 cursor-pointer text-gray-600 transition duration-200 ease-in-out">Block</li>
          </ul>
        </div>
      </div>

      <div className=" flex-grow-[1] overflow-hidden overflow-y-auto no-scrollbar p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores veritatis a repellat aspernatur tenetur labore quis quod enim, voluptatum autem ipsum numquam, illum doloremque! Excepturi, tenetur perspiciatis odio asperiores aut nostrum illum iusto beatae similique esse tempore eos ratione earum officiis hic ipsam ea distinctio, eius blanditiis provident porro? Dicta fugit reiciendis facere error, sunt, illo alias eveniet ullam hic minima iste, tenetur dolor perferendis fugiat? Fugit fuga vero at libero ratione porro soluta culpa ab vitae quos? Debitis impedit facilis ipsam omnis eos obcaecati sit magnam porro voluptas aliquam sapiente corrupti, ad laborum fuga libero dolorem beatae ratione, quam ducimus amet minus veniam, soluta nobis. Ipsa fuga dignissimos odio corporis quas laudantium minima, repudiandae praesentium non quam? Dignissimos nesciunt ea ducimus ratione tempore quaerat alias quasi, non odio porro, dolor, minima ut est laborum impedit aliquid ipsa excepturi ex quia? Fugit, eveniet. Et placeat asperiores illo eius. Illum maxime minus corrupti enim architecto vitae! Tempore amet labore iste, repudiandae distinctio dolor consequatur dicta quos exercitationem magnam culpa recusandae quaerat! Dolor magnam aliquid sed sint ad corrupti maiores eum id, dolorem neque adipisci, autem odio natus ut! Rerum mollitia neque dolor corporis debitis, ullam eius similique commodi totam repellendus quos pariatur quam ad facere quo officia ut cupiditate nihil! Ratione velit dignissimos necessitatibus quo doloremque exercitationem. Est earum iure voluptatem veniam qui dolor aspernatur nesciunt necessitatibus sed aperiam laborum nemo assumenda excepturi, sunt impedit quisquam repellendus illo. Delectus, qui! Assumenda maxime velit sapiente. Natus delectus vero repellat earum repudiandae non illum animi amet perferendis consequatur! Officiis dolor quisquam facere alias quo porro illum deserunt, unde labore pariatur nostrum! Expedita veritatis minus maiores vitae atque quod optio similique sint porro provident, sunt enim ex distinctio nostrum modi hic? Esse nostrum quia itaque consequuntur nulla, illo illum veritatis fuga magni magnam, pariatur modi voluptatum corrupti enim eius laudantium obcaecati quisquam molestias accusantium rem dolorem facere. Quasi odio eaque voluptate doloribus, temporibus nisi architecto vel quam rerum ut totam velit, ad praesentium, consequatur labore deserunt repudiandae! Velit natus unde possimus distinctio nam nulla excepturi quaerat odio, quos ea cumque illo quae dolorem odit nesciunt qui maiores totam reprehenderit incidunt, ut eligendi! Autem et laborum quaerat? Facere animi corporis ea dolor quos ipsa asperiores mollitia iure sint maiores illum, voluptatum cupiditate incidunt doloremque porro est et saepe, quidem nisi velit dolorem. Veritati Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nisi quisquam eveniet fugit eius aperiam assumenda quo, hic rem minus, fugiat dolorem. Illo, quibusdam quisquam nulla quia repudiandae maiores a sunt doloremque fuga impedit nesciunt dolorum atque quas animi dicta nisi unde ipsum officia quidem dignissimos. Cupiditate et repellendus harum, excepturi quasi odio. A cum labore, doloremque harum qui voluptate esse velit ad, nihil autem quis aspernatur? Qui voluptatibus nisi alias natus? Nobis est inventore cupiditate quae nam sit ea distinctio cum asperiores ipsum, obcaecati dignissimos qui molestias similique optio ducimus! Sapiente sed tenetur illo quisquam impedit exercitationem aperiam, nostrum nobis provident repudiandae facere accusamus dignissimos explicabo quos iusto minima maxime! Accusamus voluptates maxime animi expedita consequatur dolore quo ipsa alias, illo labore blanditiis tempore asperiores delectus eum qui nobis modi. Autem error ea, vitae recusandae magnam dicta dignissimos incidunt id, fugiat dolor animi at, exercitationem temporibus voluptates possimus magni! Dolor odio id dolorum libero, aspernatur pariatur delectus exercitationem amet enim architecto adipisci ea a quaerat voluptates animi quis ratione accusamus! Hic, quasi ea. Nostrum tempora reprehenderit, accusantium vitae tenetur, impedit atque quis iste, a eius suscipit omnis soluta dicta doloremque consequatur? Quasi ipsum consequatur quos cumque aperiam sapiente similique.
      </div>


      <div className="bg-white flex items-center justify-between p-2 gap-3 relative">
        <LiaLaughSquint className="text-3xl cursor-pointer" onClick={()=>{setEmoji(!emoji)}}/>
        <input className="w-full rounded-md p-2 bg-[#f5f5f5]" type="text" placeholder="Type a massage"  value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        <IoIosSend className="text-3xl cursor-pointer" onClick={()=>{submitMassage()}}/>
        <div ref={emojiRef} className={`absolute bottom-16 left-2 ${(emoji)?'block':'hidden'}`}> <Picker data={data} previewPosition="none" onEmojiSelect={(e)=>{ setInput(input+e.native)}}/></div>
      </div>

    </div>
  )
}

export default SingleMassage
