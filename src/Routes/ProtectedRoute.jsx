import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ Component }) => {
    let navigate = useNavigate()
    let [token ,settoken] = useState("") 

    useEffect(() => {
        let item = localStorage.getItem("token")
        settoken(item)
        // localStorage.removeItem("token")
    }, [])
    
    if (!token) {
         navigate("/")
         return null
    } else {
        return <Component/>
    }
   
}

export default ProtectedRoute