import { Button, Typography } from 'antd'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import MainHeader from '../../Components/MainHeader'
import { Box } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import BsButton from '../../Components/BsButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { Put } from '../../Config/ApiHandling'
import DeleteButton from '../../Components/DeleteButton'

const EditRule = () => {
    const [model, setModel] = useState({ title: '', description: '' });

    let [putdata, setputdata] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    let { state } = location

    
    // console.log(model?.description); 
    // const handleconditionChange = (index, value) => {
    //     const updatedcondition = [...model?.description];
    //     updatedcondition[index] = value;
    //     setModel({ ...model, description: updatedcondition });
    // };
    const handleconditionChange = (value) => {
        // Ensure that value is a string
        const stringValue = typeof value === 'string' ? value : '';
    
        // Check if model.description is an array
        if (Array.isArray(model?.description)) {
            // Join the array elements into a string
            setModel({ ...model, description: model.description.join('') + stringValue });
        } else if (typeof model?.description === 'object') {
            // If it's an object, stringify it and concatenate the new string
            setModel({ ...model, description: JSON.stringify(model.description) + stringValue });
        } else {
            // If it's not an array or an object, set it as a string
            setModel({ ...model, description: stringValue });
        }
    };
    
    
    
    
    
    
    
    useEffect(() => {
        setModel(state || { title: state?.title, description: state?.description });
    }, [state]);

    const handleSubmit = () => {
        // Create the body object based on the model
        const body = {
            title: model?.title,
            description: model?.description,
        };

        // Determine the API endpoint based on the presence of model._id
        const endpoint = model._id ? 'updateprivacypolicy' : 'updateAboutus';

        // Make the PUT request
        Put(endpoint, model._id, body)
            .then((res) => {

                console.log('API call successful', res);

                // Redirect to the pageList after successful API call
                navigate("/dashboard/pageList");
            })
            .catch((e) => console.error('Error in API call', e));
    };

    return (
        <div>
            <MainHeader />
            <Header screenTitle="Edit Page" buttonList={[
                {
                    displayField: () => (
                        <DeleteButton click={() => navigate("/dashboard/pageList")} text="Cancel" />
                    )
                }
            ]} />
            <Box sx={{ width: { md: '98%', sm: '325px', xs: '100%' } }} className="shadow m-auto mt-2">
                <Box>
                    <ToastContainer />
                    <Box className="row p-3">
                        <div className="col-md-6">
                            <Typography className='mx-1' variant="p">
                                Name :
                            </Typography>
                            <div className="mt-2">
                                <input
                                    className="form-control w-100"
                                    value={model?.title}
                                    disabled={true}
                                    type="text"
                                    onChange={(e) => setModel({ ...model, name: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* {model.condition.map((condition, index) => ( */}
                            <div className="col-md-6 my-2">
                                <Typography className='mx-1' variant="p">
                                    Description :
                                </Typography>
                                <div className="mt-2">
                                    <ReactQuill
                                         value={model?.description} // Join the array elements into a string
                                         onChange={(value) => handleconditionChange(value)}
                                    />
                                </div>
                            </div>
                        {/* ))} */}


                        <Box sx={{ display: 'flex', justifyContent: 'start' }} className="py-3">
                            <BsButton text="Submit" onClick={handleSubmit} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default EditRule
