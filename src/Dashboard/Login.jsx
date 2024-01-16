import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState, } from 'react'
import InputField from '../Components/InputField'
import BsButton from '../Components/BsButton'
// import BsNoti from '../Components/BsNoti'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Post } from '../Config/ApiHandling'
import loginImg1 from '../assets/feature-flower 1.png'
import loginImg2 from '../assets/feature-flower 2.png'
import axios from 'axios'

const Login = () => {
  // const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState([]);
  const navig = useNavigate()


  const loginButton = () => {
    if (!model.email) {
      toast.error('Email Requierd', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    if (!model.password) {
      toast.error('Password Requierd', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    setOpen(true)
    Post("admin/login", model)
      .then((succ) => {
        setOpen(false);
        let token = succ.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("islogin", true);
        if (succ.data.data.user.isAdmin) {
        }
        navig("/dashboard");
      })

      .catch((err) => {
        setOpen(false);
        console.error("Login Error:", err.response); // Log the error response for debugging

        if (err.response && err.response.status === 401 && err.response.data.message === "Password does not match") {
          toast.error("Incorrect email or password. Please try again.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Authentication Failed. Please check your email and password.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });


  }

  return (
    <div className='bgimg-login'>
      <Box sx={{ width: { md: '400px', sm: '350px', xs: '100%', margin: "135px auto", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#CECECE", opacity: "60%" }, height: { md: '450px', sm: '350px', xs: '70%' } }} className='shadow'>
        <Box >
          {/* {open ?  
                <BsNoti  />
              : null} */}
          <ToastContainer />
          <div className="login-head">
            <img src={loginImg1} alt="" />
            <h1 className='text-center fw-bolder py-2'>Login</h1>
            <img src={loginImg2} alt="" />
          </div>
          <Box className='px-3'>

            <Box className=' my-3  '>
              <div className='mx-1'>
                {/* <p className=''>Email Address</p> */}
                <InputField label='Email' className='' onChange={(e) => setModel({ ...model, email: e.target.value })} />
              </div>
            </Box>

            <Box className=' my-3  '>
              <div className='mx-1'>
                {/* <p className=''>Password</p> */}
                <InputField label='Paswword' type="password" className='w-100' onChange={(e) => setModel({ ...model, password: e.target.value })} />
              </div>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }} className='py-3'>
              <BsButton isButtonDisabled={open} text="Login" onClick={loginButton} />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Login