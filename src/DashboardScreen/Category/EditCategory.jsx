import React, { useEffect, useState } from 'react'
import MainHeader from '../../Components/MainHeader'
import Header from '../../Components/Header'
import { Box, Button } from '@mui/material'
import { Typography } from 'antd'
import BsButton from '../../Components/BsButton'
import { Post, Put } from '../../Config/ApiHandling'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import DeleteButton from '../../Components/DeleteButton'

const EditCategory = () => {
    let [model, setModel] = useState([])
    let [putdata, setputdata] = useState([])
    let navigation = useNavigate()
    let location = useLocation()
    useEffect(() => {
        setModel(location.state)
    }, [])
    const token = localStorage.getItem("token")

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setputdata({ ...putdata, images: selectedImage });
        console.log(selectedImage, "selectedImage")
    };


    let sendData = () => {

        const formData = new FormData();
        formData.append('title', putdata?.title || model?.title);
        formData.append('images', putdata?.images || model?.images);

        if (model?._id) {
            if (!model.title) {
                toast.error('title is required');
                return;
            }
            if (!model.images) {
                toast.error('image is required');
                return;
            }

            Put("updatecategory", model._id, formData, token)
                .then((res) => {
                    console.log("API call successful", res);
                    toast.success('Testinomial updated successfully');
                    navigation("/dashboard/CategoryList");
                })
                .catch((error) => {
                    console.error("API call failed", error);
                    toast.error('Failed to update Testinomial');
                });

        } else {
            Post("createCategory", formData, token).then((res) => {
                navigation("/dashboard/CategoryList");
            }).catch((e) => {
                console.log(e)
            })
        }

    };
    
    return (
        <div>
            <MainHeader />
            <Header screenTitle={`${model?._id ? "Edit Category" : "Create Category"}`} buttonList={[
                {
                    displayField: () => (
                        // <Button color='error' className='delete_btn' onClick={() => navigation("/dashboard/adminList")} variant='contained'>Cancel</Button>
                        <DeleteButton click={() => navigation("/dashboard/CategoryList")} text="Cancel" />
                    )
                }
            ]} />
            <Box sx={{ width: { md: '98%', sm: '325px', xs: '100%' } }} className=' shadow m-auto mt-2'>
                <Box >
                    <ToastContainer />
                    <Box className='row p-3'>

                        <div className="col-md-6">
                            <Typography variant='p'> Title : </Typography>
                            <div className='mt-2'>
                                <input className="form-control w-100"
                                    defaultValue={model?.title} type="text" name="" id="" onChange={(e) => setputdata({ ...putdata, title: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Typography variant='p'> Images : </Typography>
                            <div className='mt-2'>
                                <input className="form-control w-100"
                                    defaultValue={model?.images || ""} type="file" name="" id="" onChange={handleImageChange} />
                            </div>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'start' }} className='  py-3'>
                            <BsButton text={`${model?._id ? "Edit" : "Create Category"}`} onClick={sendData} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )

}

export default EditCategory