import React, { useEffect, useState } from 'react'
import MainHeader from '../../Components/MainHeader'
import Header from '../../Components/Header'
import { Box, Button } from '@mui/material'
import { Typography } from 'antd'
import BsButton from '../../Components/BsButton'
import { Put } from '../../Config/ApiHandling'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import DeleteButton from '../../Components/DeleteButton'

const EditAdmin = () => {
  let [model,setModel] = useState([])
  let [putdata,setputdata] = useState([])
  let navigation = useNavigate()
  let location = useLocation()
  useEffect(()=>{
      setModel(location.state)
  },[])

  let sendData = () =>{
    if (!model.firstname) {
      toast.error('Name is required');
      return;
    } 
    
    if (!model.email) {
      toast.error('Email is required');
      return;
    } 
    
    if (!model.phonenumber) {
      toast.error('Password is required');
      return;
      
    }  
    
    const body = {
      firstname: putdata.firstname || model.firstname,
      lastname: putdata.lastname || model.lastname,
      email: putdata.email || model.email,
      phonenumber: putdata.phonenumber || model.phonenumber,
      confirmPassword: putdata.confirmPassword || model.confirmPassword,
      password: putdata.password || model.password,
      
      // Add other fields as needed
    };
  
    Put("/admin/updateadmin", model._id, body)  
      .then((res) => {
        // Handle success if needed
        toast.success('Admin updated successfully');
        navigation("/dashboard/adminList");
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
        toast.error('Failed to update admin');
      });
  };
  


  return(
     <div>
  <MainHeader />
 <Header screenTitle="Edit Admin"  buttonList={[
        {
          displayField: () => (
            // <Button color='error' className='delete_btn' onClick={() => navigation("/dashboard/adminList")} variant='contained'>Cancel</Button>
            <DeleteButton click={() => navigation("/dashboard/adminList")} text="Cancel"/>
          )
        }
      ]}/>
 <Box sx={{ width: { md: '98%', sm: '325px', xs: '100%' } }} className=' shadow m-auto mt-2'>
   <Box >
     <ToastContainer />
     <Box className='row p-3'>

       <div className="col-md-6">
         <Typography  variant='p'> First Name : </Typography>
         <div className='mt-2'>
           <input className="form-control w-100" 
               defaultValue={model.firstname || ""} type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, firstname: e.target.value })} />
         </div>
       </div>
       <div className="col-md-6">
         <Typography  variant='p'> Last Name : </Typography>
         <div className='mt-2'>
           <input className="form-control w-100" 
               defaultValue={model.lastname || ""} type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, lastname: e.target.value })} />
         </div>
       </div> 
       <div className="col-md-6  mt-5">
         <Typography variant='p'> Email : </Typography>
         <div className='mt-2'>
           <input className="form-control w-100" defaultValue={model.email || ""} type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, email: e.target.value })} />
         </div>
       </div>

       <div className="col-md-6">
         <Typography className='mt-5' variant='p'> Phone Number : </Typography>
         <div className='mt-2'>
           <input className="form-control w-100" defaultValue={model.phonenumber || ""}  type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, phonenumber: e.target.value })} />
         </div>
       </div>
       <Box sx={{ display: 'flex', justifyContent: 'start' }} className='  py-3'>
         <BsButton text="submit" onClick={sendData} />
       </Box>
     </Box>
   </Box>
 </Box>
</div>
  )
 
}

export default EditAdmin
