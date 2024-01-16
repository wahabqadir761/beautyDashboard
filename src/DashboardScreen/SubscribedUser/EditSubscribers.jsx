import React, { useEffect, useState } from 'react';
import MainHeader from '../../Components/MainHeader';
import Header from '../../Components/Header';
import { Box, Button } from '@mui/material';
import { Typography } from 'antd';
import BsButton from '../../Components/BsButton';
import { Post, Put } from '../../Config/ApiHandling';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import DeleteButton from '../../Components/DeleteButton';

const EditSubscriber = () => {
    const [model, setModel] = useState({ email: '' });  
    const [putdata, setPutdata] = useState('');
    const navigation = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setModel(location.state || { email: '' }); // Set initial state based on location.state
    }, [location.state]);

    console.log(putdata, 'putdata');

    const token = localStorage.getItem('token');

    const sendData = () => {
        // const formData = new FormData();
        // formData.append('email', putdata || model?.email);

        const body = {
            email: putdata || model?.email,
        };


        const handleError = (error) => {
            console.error('API call failed', error);
            console.log(error);
            toast.error('Failed to update Subscriber');
        };

        if (model?._id) {
            if (!model?.email) {
                toast.error('email is required');
                return;
            }
            console.log('Sending email:', putdata || model?.email);

            Put('updateSubscribedUser', model._id, body, token)
                .then((res) => {
                    console.log('API call successful', res);
                    toast('Subscriber updated successfully');
                    navigation("/dashboard/subscriberList");
                })
                .catch(handleError);
        } else {
            Post('subscribe', body)
                .then((res) => {
                    console.log('API call successful', res);
                    toast.success('Subscriber created successfully');
                    navigation("/dashboard/subscriberList");
                })
                .catch(handleError);
        }
    };

    return (
        <div>
            <MainHeader />
            <Header
                screenTitle={`${model?._id ? 'Edit Subscriber' : 'Create Subscriber'}`}
                buttonList={[
                    {
                        displayField: () => (
                            <DeleteButton click={() => navigation('/dashboard/SubscriberList')} text="Cancel" />
                        ),
                    },
                ]}
            />
            <Box sx={{ width: { md: '98%', sm: '325px', xs: '100%' } }} className=" shadow m-auto mt-2">
                <Box>
                    <ToastContainer />
                    <Box className="row p-3">
                        <div className="col-md-6">
                            <Typography variant="p"> Email : </Typography>
                            <div className="mt-2">
                                <input
                                    className="form-control w-100"
                                    defaultValue={model._id ? model.email : ''}
                                    type="text"
                                    onChange={(e) => setPutdata(e.target.value)}
                                />

                            </div>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'start' }} className=" py-3">
                            <BsButton text={`${model?._id ? 'Edit' : 'Create Subscriber'}`} onClick={sendData} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default EditSubscriber;
