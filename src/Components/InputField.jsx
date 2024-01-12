import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const InputField = (props) => {
  let { onChange, type, label } = props
  const [passwordVisible, setPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <TextField
        sx={{ width: "300px" }}
        id="standard-multiline-flexible"
        type={passwordVisible ? "text" : type}
        onChange={onChange}
        label={label}
        // className="w-100"
        variant="standard"
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {passwordVisible ? <IoMdEye /> : <IoIosEyeOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default InputField