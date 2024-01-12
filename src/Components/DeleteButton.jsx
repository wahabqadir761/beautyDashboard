import { Button } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
const DeleteButton = ({ text, click, classname }) => {
  return (
    <Button startIcon={<DeleteIcon />} style={{ borderRadius: "2px", height: "32px", textTransform: "capitalize" }} className={`${classname ? classname : "mx-2"}`} type="primary" color='error' variant='contained' onClick={click}>{text || "Delete"}</Button>
  )
}

export default DeleteButton
