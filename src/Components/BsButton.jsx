import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const BsButton = (props) => {
  let { text, isButtonDisabled, loading, onClick } = props
  return (
    <>
      <Button
        disabled={isButtonDisabled || loading}
        sx={{
          backgroundColor: "#212529",
          width: "100%",
          borderRadius: "10px",
          "&:hover": { backgroundColor: "white", color: "#212529" },
        }}
        variant="contained"
        onClick={onClick}>
        {loading ? CircularProgress : text}
      </Button>
    </>
  )
}

export default BsButton;