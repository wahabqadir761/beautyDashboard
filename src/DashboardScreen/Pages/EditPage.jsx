import { Button, Typography } from 'antd'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
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
    const [model, setModel] = useState({ title: '', description: '', policy: '' });

    let [putdata, setputdata] = useState([])
    let [policy, setPolicy] = useState([])
    let [description, setDescription] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    let { state } = location


    const handleQuillChange = (value) => {
        setPolicy(value)
        setDescription(value)
    };

    const handleTitleChange = (e) => {
        setModel((prevModel) => ({
            ...prevModel,
            title: e.target.value,
        }));
    };


    useEffect(() => {
        setPolicy(state?.description || state?.policy || '');
        setModel(state || { title: state?.title, description: state?.description });
    }, [state]);


    const handleSubmit = () => {    
        const endpoint = model?.title === "Privacy Policy" ? 'updateprivacypolicy' : "updateAboutus";
        let token = localStorage.getItem("token");
    
        Put(endpoint, model._id, {
            policy:policy,
            description:description,
            title: model?.title,
        }, token)
        .then((res) => {
            console.log('API call successful', res);
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
                            <label className="mx-1" htmlFor="titleInput">
                                Name:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="titleInput"
                                    className="form-control w-100"
                                    defaultValue={model?.title}
                                    type="text"
                                    disabled={true}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 my-2">
                            <Typography className='mx-1' variant="p">
                                Description :
                            </Typography>
                            <div className="mt-2">
                                <ReactQuill
                                    value={policy || description}
                                    onChange={handleQuillChange}
                                />
                            </div>
                        </div>
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