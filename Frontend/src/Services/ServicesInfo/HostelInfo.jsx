import React from 'react'
import Navbar from "../../Components/Navbar"
import Footer from "../../Components/foot"
import { Navigate, useNavigate } from 'react-router-dom'

const HostelInfo = () => {
    const navigate = useNavigate()
    const backBtn = ()=>{
        navigate("/services/hostel")
      }
    
  return (
    <div>
      hostel info
    </div>
  )
}

export default HostelInfo
