import { Button } from 'antd';
import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const AddButton = ({path}) => {
  let navigate = useNavigate()
  return (
    <div className=' container btn_cont' >
        <Button className='px-4 btn_primary ' onClick={()=>navigate(path)}  style={{backgroundColor:"#212529",color:"#fff" ,borderRadius:"4px", height:"35px"}}><IoMdAdd style={{marginBottom:"2px" }}/> Add</Button>      
    </div>
  )
}

export default AddButton
