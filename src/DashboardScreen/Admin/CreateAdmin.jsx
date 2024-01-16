import { Box } from '@mui/material';
import { Typography, message } from 'antd';
import React, { useState } from 'react';
import Header from '../../Components/Header';
import MainHeader from '../../Components/MainHeader';
import BsButton from '../../Components/BsButton';
import { Post } from '../../Config/ApiHandling';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CreateAdmin = () => {
  const [model, setModel] = useState([]);
  const [text, settext] = useState('');
  const [showpassword, setshowpassword] = useState(false);
  const [disable, setdisable] = useState(false);
  let navigate = useNavigate()

    // const checker = (e) => {
    //   settext(e);
    //   setModel({ ...model, isAdmin: e });
    //   // setmyPassord()
    // };
  const handleChangePassword = () => {
    if (showpassword) {
      setshowpassword(false)
    } else {
      setshowpassword(true)
    }
  }

  const countrycode = [
    "+1", // United States
    "+44", // United Kingdom
    "+92", // Pakistan
    "+91", // India
    "+33", // France
    "+49", // Germany
    "+81", // Japan
    "+86", // China
    "+61", // Australia
    "+34", // Spain
    "+39", // Italy
    "+7", // Russia
    "+82", // South Korea
    "+52", // Mexico
    "+55", // Brazil
    "+971", // United Arab Emirates
    "+966", // Saudi Arabia
    "+968", // Oman
    "+20", // Egypt
    "+27", // South Africa
    "+30", // Greece
    "+31", // Netherlands
    "+32", // Belgium
    "+46", // Sweden
    "+47", // Norway
    "+48", // Poland
    "+54", // Argentina
    "+56", // Chile
    "+57", // Colombia
    "+58", // Venezuela
    "+60", // Malaysia
    "+63", // Philippines
    "+64", // New Zealand
    "+65", // Singapore
    "+66", // Thailand
    "+81", // Japan
    "+82", // South Korea
    "+84", // Vietnam
    "+86", // China
    "+90", // Turkey
    "+91", // India
    "+92", // Pakistan
    "+93", // Afghanistan
    "+94", // Sri Lanka
    "+95", // Myanmar
    "+98", // Iran
    "+212", // Morocco
    "+213", // Algeria
    "+216", // Tunisia
    "+218", // Libya
    "+220", // Gambia
    "+221", // Senegal
    "+222", // Mauritania
    "+223", // Mali
    "+224", // Guinea
    "+225", // Ivory Coast
    "+226", // Burkina Faso
    "+227", // Niger
    "+228", // Togo
    "+229", // Benin
    "+230", // Mauritius
    "+231", // Liberia
    "+232", // Sierra Leone
    "+233", // Ghana
    "+234", // Nigeria
    "+235", // Chad
    "+236", // Central African Republic
    "+237", // Cameroon
    "+238", // Cape Verde
    "+239", // Sao Tome and Principe
    "+240", // Equatorial Guinea
    "+241", // Gabon
    "+242", // Republic of the Congo
    "+243", // Democratic Republic of the Congo
    "+244", // Angola
    "+245", // Guinea-Bissau
    "+246", // British Indian Ocean Territory
    "+247", // Ascension Island
    "+248", // Seychelles
    "+249", // Sudan
    "+250", // Rwanda
    "+251", // Ethiopia
    "+252", // Somalia
    "+253", // Djibouti
    "+254", // Kenya
    "+255", // Tanzania
    "+256", // Uganda
    "+257", // Burundi
    "+258", // Mozambique
    "+260", // Zambia
    "+261", // Madagascar
    "+262", // Reunion
    "+263", // Zimbabwe
    "+264", // Namibia
    "+265", // Malawi
    "+266", // Lesotho
    "+267", // Botswana
    "+268", // Eswatini
    "+269", // Comoros
  ];

  const validateForm = () => {
    let isValid = true;

    if (!model.firstname) {
      toast.error('First name is required');
      return;
    }

    if (!model.lastname) {
      toast.error('Last name is required');
      return;
    }

    if (!model.email) {
      toast.error('Email is required');
      return;
    }

    // if (!model.countryphonenumbercode) {
    //   // toast.error('Country code is required');
    //   return;
    // }

    if (!model.phonenumber) {
      toast.error('Phone Number is required');
      return;
    }

    if (!model.password) {
      toast.error('Password is required');
      return;
    }

    if (!model.confirmPassword) {
      toast.error('Confirm password is required');
      return;

    }
    return isValid;
  };

  const senddata = () => {  
    if (validateForm()) {
      setdisable(true);
      console.log(model,"model")
      Post('/admin/registeradmin', model)
        .then((res) => {
          console.log('API response:', res);
          setdisable(false);
          navigate("/dashboard/adminList");
        })
        .catch((error) => {
          console.error('API error:', error);
          setdisable(false);
          if (error && error.response && error.response.data) {
            const { status, data, message } = error.response.data;
            if (status === false && data === null && message) {
              toast.error(`Error: ${message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
              return;
            }
          }
          toast.error('An error occurred');
        });
    }
  };



  return (
    <div>
      <MainHeader />
      <Header screenTitle="Create Admin" />
      <Box sx={{ width: { md: '98%', sm: '325px', xs: '100%' } }} className=' shadow m-auto mt-2'>
        <ToastContainer />
        <Box>
          <Box className='row p-3'>
            <div className="col-md-6">
              <Typography className='' variant='p'> First Name : </Typography>
              <div className='mt-2'>
                <input
                  className="form-control w-100"
                  defaultValue={model.firstname}
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setModel({ ...model, firstname: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <Typography className='' variant='p'> Last Name : </Typography>
              <div className='mt-2'>
                <input
                  className="form-control w-100"
                  defaultValue={model.lastname}
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setModel({ ...model, lastname: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <Typography className='' variant='p'> Email : </Typography>
              <div className='mt-2'>
                <input
                  className="form-control w-100"
                  defaultValue={model.email}
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setModel({ ...model, email: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <Typography className='' variant='p'> Phone Number : </Typography>
              <div className='mt-2'>
                <div className="d-flex">
                  <select
                    className="form-control w-25"
                    defaultValue={model?.countrycode}
                    onChange={(e) => setModel({ ...model, countrycode: e.target.value })}
                  >
                    {countrycode.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <input
                    className="form-control w-75"
                    defaultValue={model.phonenumber}
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setModel({ ...model, phonenumber: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <Typography className='mt-3' variant='p'> Password : </Typography>
              <div className='mt-2 d-flex relative-position'>
                <input
                  className="form-control w-100"
                  defaultValue={model.password || ""}
                  type={showpassword ? "text" : "password"}
                  name="password"
                  id=""
                  onChange={(e) => setModel({ ...model, password: e.target.value })}
                />
                <button className="hide_btn" onClick={handleChangePassword}>
                  {showpassword ? <EyeInvisibleOutlined style={{ color: "#14213d" }} /> : <EyeOutlined style={{ color: "#14213d" }} />}
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <Typography className='mt-3' variant='p'> Confirm Password : </Typography>
              <div className='mt-2 d-flex relative-position'>
                <input
                  className="form-control w-100"
                  defaultValue={model.confirmPassword || ""}
                  type={showpassword ? "text" : "password"}
                  name="password"
                  id=""
                  onChange={(e) => setModel({ ...model, confirmPassword: e.target.value })}
                />
                <button className="hide_btn" onClick={handleChangePassword}>
                  {showpassword ? <EyeInvisibleOutlined style={{ color: "#14213d" }} /> : <EyeOutlined style={{ color: "#14213d" }} />}
                </button>
              </div>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'start' }} className='  py-3'>
              <BsButton isButtonDisabled={disable} text="submit" onClick={senddata} />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateAdmin;

