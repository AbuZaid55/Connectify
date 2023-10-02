import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";


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
      <div className='bg-white w-full h-full rounded-md flex'>
        {/* sectioin one  */}


        <div className='w-1/4 h-full border-2 border-white flex flex-col'>

          <div className='flex items-center justify-between px-3 py-2'>
            <h1 className=" text-3xl text-primary-800 font-semibold">Connectify</h1>
            <span><BsPersonCircle className='text-3xl text-primary-800 cursor-pointer hover:text-[#883eba] transition duration-300 ease-in-out' /></span>
          </div>

          <div className='w-full px-2'>
            <input className='border-2 border-primary-800 w-full py-1 text-xl px-2 rounded-md' placeholder='Search' type="text" />
          </div>


          <div className='flex items-center justify-around bg-primary-800 text-white text-2xl py-2 my-2'>
            <div className='cursor-pointer' onClick={() => { setSlide(0) }}>Chats</div>
            <div className='cursor-pointer' onClick={() => { setSlide(100) }}>Groups</div>
          </div>

          <div className='w-full flex-grow-[1] overflow-hidden overflow-y-auto'>
            <div className='w-[205%] flex' style={{left:'-100px'}}>
            <div className=' w-1/2 bg-blue-200'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, consectetur? Voluptas fuga a saepe nesciunt asperiores quam voluptatum velit consectetur quia impedit, distinctio veritatis obcaecati non tempore ducimus minus consequatur optio nobis officia! Harum hic quod deserunt enim reiciendis voluptatibus quia, incidunt similique excepturi commodi, nostrum inventore debitis blanditiis sunt quaerat expedita, cumque at aliquid rerum culpa nulla cum atque unde. Excepturi repellendus modi quasi quod ab harum provident assumenda neque labore tempora? Quidem sapiente est ad a eveniet. Cupiditate iusto cum deserunt saepe cumque laudantium quis ea assumenda! Nam omnis enim, repellat fuga quas sapiente corporis, saepe eaque iusto velit aperiam magnam nulla voluptates nostrum qui quidem mollitia dolores incidunt vel ipsam excepturi doloremque numquam? Ab quae saepe maxime impedit. Modi est necessitatibus asperiores autem recusandae deserunt officia officiis neque aspernatur eos laborum, culpa quisquam odit odio ullam a voluptate exercitationem sunt! Modi nobis autem reiciendis quod in delectus, corrupti praesentium. Reprehenderit earum quasi sequi corrupti nulla asperiores. Commodi veniam consectetur velit adipisci nemo reprehenderit aliquam labore distinctio nisi culpa, a molestiae excepturi? Saepe, alias! Cumque, nihil quod. Doloremque officia vero nisi non ut at voluptas ipsam molestiae quo quasi maxime, quod vitae ad obcaecati dolores id sunt nemo placeat est hic amet recusandae. Quisquam, nihil! Nihil provident laudantium quas nulla totam quis obcaecati quos rem dolorum ea. Rerum libero sunt provident, voluptate quisquam dolor eveniet saepe, quia aliquam minus nostrum suscipit accusamus veritatis non, voluptatum totam? Perferendis corrupti mollitia enim sint consequatur earum vitae voluptate est autem suscipit? Voluptatibus natus consequuntur repellat minima asperiores qui maxime eius voluptate libero quas, illum modi aut quisquam culpa nobis, perferendis blanditiis voluptas! Unde temporibus aliquam ad qui aspernatur commodi molestias dolores, sint illum, ea quia, vero culpa nesciunt consequatur ipsa minima magni vitae. Ipsum quasi facilis exercitationem nemo obcaecati rem et.
            </div>
            <div className='w-1/2 bg-blue-800'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, consectetur? Voluptas fuga a saepe nesciunt asperiores quam voluptatum velit consectetur quia impedit, distinctio veritatis obcaecati non tempore ducimus minus consequatur optio nobis officia! Harum hic quod deserunt enim reiciendis voluptatibus quia, incidunt similique excepturi commodi, nostrum inventore debitis blanditiis sunt quaerat expedita, cumque at aliquid rerum culpa nulla cum atque unde. Excepturi repellendus modi quasi quod ab harum provident assumenda neque labore tempora? Quidem sapiente est ad a eveniet. Cupiditate iusto cum deserunt saepe cumque laudantium quis ea assumenda! Nam omnis enim, repellat fuga quas sapiente corporis, saepe eaque iusto velit aperiam magnam nulla voluptates nostrum qui quidem mollitia dolores incidunt vel ipsam excepturi doloremque numquam? Ab quae saepe maxime impedit. Modi est necessitatibus asperiores autem recusandae deserunt officia officiis neque aspernatur eos laborum, culpa quisquam odit odio ullam a voluptate exercitationem sunt! Modi nobis autem reiciendis quod in delectus, corrupti praesentium. Reprehenderit earum quasi sequi corrupti nulla asperiores. Commodi veniam consectetur velit adipisci nemo reprehenderit aliquam labore distinctio nisi culpa, a molestiae excepturi? Saepe, alias! Cumque, nihil quod. Doloremque officia vero nisi non ut at voluptas ipsam molestiae quo quasi maxime, quod vitae ad obcaecati dolores id sunt nemo placeat est hic amet recusandae. Quisquam, nihil! Nihil provident laudantium quas nulla totam quis obcaecati quos rem dolorum ea. Rerum libero sunt provident, voluptate quisquam dolor eveniet saepe, quia aliquam minus nostrum suscipit accusamus veritatis non, voluptatum totam? Perferendis corrupti mollitia enim sint consequatur earum vitae voluptate est autem suscipit? Voluptatibus natus consequuntur repellat minima asperiores qui maxime eius voluptate libero quas, illum modi aut quisquam culpa nobis, perferendis blanditiis voluptas! Unde temporibus aliquam ad qui aspernatur commodi molestias dolores, sint illum, ea quia, vero culpa nesciunt consequatur ipsa minima magni vitae. Ipsum quasi facilis exercitationem nemo obcaecati rem et.
            </div>
            </div>
          </div>
        </div>




        {/* section two  */}
        <div className='w-3/4 bg-black h-full'>

        </div>



      </div>
    </div>
  )
}

export default Home
