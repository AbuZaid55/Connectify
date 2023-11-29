import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'

const MassageInfo = () => {
    const navigate = useNavigate()
    const location = useLocation().search.slice(4,)
  return (
    <div>
      sadf
    </div>
  )
}

export default MassageInfo
