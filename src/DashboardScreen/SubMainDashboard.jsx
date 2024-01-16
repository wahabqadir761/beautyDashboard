import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {
    BsFillClockFill,
    BsFillSendFill
} from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SlCalender } from 'react-icons/sl';
import MainHeader from '../Components/MainHeader';
// import Header from '../Comp/Header';
// import BsLineChart from '../Comp/BsLinerChart';
// import BsDonut from '../Comp/BsDonut';
// import { GetApi, PostApi } from '../Api/BaseHandle';


function SubMainDashboard() {
    let [datas, setdata] = useState()
    let [users, setusers] = useState()

//     useEffect(() => {
//         GetApi("admin/allCategory")
//             .then((succ) => {
//                 setdata(succ.data.data?.length)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//     GetApi("/user/userProfile/getAll/users").then((res)=>{
//  setusers(res.data.data?.length)
//  console.log(res.data.data)
//     }).catch((e)=>console.log(e))

//     }, [])

    return (
        <div>
            <MainHeader />
            <div style={{ width: "95%",  backgroundColor: "#212529", color: "white" }} className=' m-auto'>
                <Box className="d-flex shadow py-2 px-3 align-items-center  my-3 justify-content-between">
                    <Box className='d-flex '>
                        <h6 className='pt-1 header-title'>
                            Admin
                        </h6>
                    </Box>

                </Box>
            </div>
            {/* <div className="container"> */}
                {/* <Box sx={{ justifyContent: "space-around" }} className="row p-3 d-flex ">
                    <div className='col-md-3  header-each-dash my-2'>
                        <div className='dashboard-icon-header  bg-img-color'>
                            <BsFillClockFill />
                        </div>
                        <div className='dash-header-des'>
                            <div>
                                <h1>{datas??"...."}</h1>
                            </div>
                            <div>
                                <span className="bg-transparent-white  main-das-hd">Catagories</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 header-each-dash my-2'>
                        <div className='dashboard-icon-header bg-img-color1'>
                            <GiHamburgerMenu />
                        </div>
                        <div className='dash-header-des'>
                            <div>
                                <h1>{users?? "...."}</h1>
                            </div>
                            <div>
                                <span className="bg-transparent-white  main-das-hd">Users </span>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 header-each-dash my-2'>
                        <div className='dashboard-icon-header bg-img-color2'>
                            <SlCalender />

                        </div>
                        <div className='dash-header-des'>
                            <div>
                                <h1>0</h1>
                            </div>
                            <div>
                                <span className="bg-transparent-white  main-das-hd">New Task</span>
                            </div>
                        </div>
                    </div>
                </Box > */}
            {/* </div>         */}
        </div>
    )
}

export default SubMainDashboard