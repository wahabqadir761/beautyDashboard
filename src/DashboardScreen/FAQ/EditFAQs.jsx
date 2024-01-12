import React, { useEffect, useState } from 'react'
import MainHeader from '../../Components/MainHeader'
import Header from '../../Components/Header'
import { Box, Button } from '@mui/material'
import { Typography } from 'antd'
import BsButton from '../../Components/BsButton'
import { Post, Put } from '../../Config/ApiHandling'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import DeleteButton from '../../Components/DeleteButton'

const EditFAQs = () => {
  let [model,setModel] = useState([])
  let [putdata,setputdata] = useState([])
  let navigation = useNavigate()
  let location = useLocation()
  useEffect(()=>{
      setModel(location.state)
  },[])
  const token = localStorage.getItem("token")

  let sendData = () =>{
    if(model?._id){
      if (!model.title) {
        //   toast.error('Title is required');
          return;
        }     
        if (!model.description) {
        //   toast.error('Description is required');
          return;
        } 
        
        const body = {
            title: putdata.title || model.title,
            description: putdata.description || model.description,
          
          // Add other fields as needed
        };
        console.log("Before API call");
        
        Put("updateFaqs",model._id,putdata, token )  
          .then((res) => {
            console.log("API call successful", res);
            toast.success('FAQs updated successfully');
            navigation("/dashboard/FAQsList");
          })
          .catch((error) => {
            console.error("API call failed", error);
            toast.error('Failed to update FAQs');
          });

    }else{
      Post("createFaq",putdata,token).then((res)=>{
        alert("haoagyagyagy")
      }).catch((e)=>{
        console.log(e)
      })
    }
   
  };
  
console.log(model,"modle")

  return(
     <div>
  <MainHeader />
 <Header screenTitle="Edit FAQs"  buttonList={[
        {
          displayField: () => (
            // <Button color='error' className='delete_btn' onClick={() => navigation("/dashboard/adminList")} variant='contained'>Cancel</Button>
            <DeleteButton click={() => navigation("/dashboard/faqsList")} text="Cancel"/>
          )
        }
      ]}/>
 <Box sx={{ width: { md: '98%', sm: '325px', xs: '100%' } }} className=' shadow m-auto mt-2'>
   <Box >
     <ToastContainer />
     <Box className='row p-3'>

       <div className="col-md-6">
         <Typography  variant='p'> Title : </Typography>
         <div className='mt-2'>
           <input className="form-control w-100" 
               defaultValue={model?.title} type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, title: e.target.value })} />
         </div>
       </div>
       <div className="col-md-6">
         <Typography  variant='p'> Description : </Typography>
         <div className='mt-2'>
           <input className="form-control w-100" 
               defaultValue={model?.description || ""} type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, description: e.target.value })} />
         </div>
       </div> 
       <Box sx={{ display: 'flex', justifyContent: 'start' }} className='  py-3'>
         <BsButton text={`${model?._id ? "Edit":"Save Faq"}`} onClick={sendData} />
       </Box>
     </Box>
   </Box>
 </Box>
</div>
  )
 
}

export default EditFAQs
