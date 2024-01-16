import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginProtected = ({ Component }) => {
    let navigate = useNavigate()
    let [token, settoken] = useState("")

    useEffect(() => {
        let item = localStorage.getItem("token")
        settoken(item)
    }, [])

    if (token) {
        navigate("/dashboard")
        return null
    } else {
        return <Component />
    }
        

}

export default LoginProtected