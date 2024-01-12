import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = (props) => {
    let {screenTitle , buttonList} = props

    const backbtn = (e) =>{
            window.history.back()
    }
  return (
    <div style={{width:"95%"}} className='mx-3'>
      <Box className="d-flex shadow py-2 px-3 align-items-center  my-3 justify-content-between">
        <Box className='d-flex '>
        <IconButton onClick={backbtn}><ArrowBackIcon style={{color:"#212529"}} /></IconButton>
        <Typography variant='h6' sx={{fontWeight:"700",color:"#212529"}} className='pt-1 '>
            {screenTitle}
        </Typography>
        </Box>
        <Box className="d-flex">
        {buttonList && Array.isArray(buttonList) && buttonList.map((x,i) =>{
            return(
                <div key={i}>
                    {x.displayField ? x.displayField(x) : null }
                </div>
            )
        })}
        </Box>
      </Box>
    </div>
  )
}

export default Header