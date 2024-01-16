import { Box, Typography } from '@mui/material'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const MainHeader = (props) => {
  let { } = props
  let navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(localStorage.getItem('islogin'));

  const Handlogout = () => {
    console.log('Before logout: ', isLogin);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, You are logout !"
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the action
        localStorage.removeItem("token")
        localStorage.setItem('islogin', false);
        setIsLogin(false);

        // if(localStorage.removeItem("token"))
        // 
        // window.location.reload();
        

       
        
        Swal.fire({
          title: "Logout!",
          text: "You are logout succefully .",
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked the cancel button
        Swal.fire({
          title: "Cancelled",
          text: "Your action has been cancelled.",
          icon: "error"
        });
      }
    });

  }
  useEffect(() => {
    if (isLogin === false) {
      navigate('/');
    }
  }, [isLogin, navigate]);
  return (
    <div>
      <Box className="w-100 py-2 px-3 align-items-center mb-1 justify-content-between" sx={{backgroundColor: "#DADADA"}}>
        <Typography variant='h6' className='pt-1 fs-4 px-2'  sx={{color:"#212529"}}>
          Admin Dashboard
          {/* <button className='btn_logout' >Logout</button> */}
          <Button className="btn_logout" type="primary" danger onClick={Handlogout}>Logout</Button>
        </Typography>
      </Box>
    </div>
  )
}

export default MainHeader       