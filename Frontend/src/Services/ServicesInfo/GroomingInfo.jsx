import React from 'react'
import Navbar from "../../Components/Navbar"
import Footer from "../../Components/foot"
import { Navigate, useNavigate } from 'react-router-dom'

const GroomingInfo = () => {
    const navigate = useNavigate()
    const backBtn = ()=>{
        navigate("/services/grooming")
      }
  return (
    <div>
      groominginfo
    </div>
  )
}

export default GroomingInfo
