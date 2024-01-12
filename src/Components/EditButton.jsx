import { Button } from '@mui/material'
import React from 'react'

const EditButton = ({ text, click, compenet }) => {
    return (
        <Button component={compenet} onClick={click} className='px-4 ' style={{ marginTop: "1px", backgroundColor: "#212529", color: "#fff", borderRadius: "3px", height: "32px", textTransform: 'capitalize' }} type="primary">{text || 'Edit'}</Button>
    )
}

export default EditButton
