import { Box } from '@mui/material'
import { Button, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-bootstrap'
import Header from '../../Components/Header'
import MainHeader from '../../Components/MainHeader'
import Table from '../../Components/Table'
import { Delete, GetName } from '../../Config/ApiHandling'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import AddButton from '../../Components/AddButton'
import EditButton from '../../Components/EditButton'
import DeleteButton from '../../Components/DeleteButton'

const ListAdmin = () => {
  let [open, setopen] = useState(false)
  let [data, setdata] = useState([])
  let navigation = useNavigate()
  const token = localStorage.getItem("token")

  const Getdata = () => {

    GetName(`admin/getuserbytype`, "admin", token).then((res) => {
      setdata(res.data.data)
    }).catch((e) => console.log(e))
  }
  useEffect(() => {
    Getdata()
  }, [])

  let edit = (e) => {
    navigation("/dashboard/EditAdmin", {
      state: e
    }
    )
  }


  let DeleteRow = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      ?.then((result) => {
        if (result.isConfirmed) {
          Delete("/admin/delete", e, token)
            ?.then((res) => {
              let filter = data.filter((x) => x._id !== e._id);
              setdata([...filter]);
              Getdata()
            })
            .catch((e) => {
              toast.error("Failed", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        }
      })
      .catch((e) => {
        toast.error("Failed", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  

  
return (
  <div>
    <MainHeader />
    <Header screenTitle="Admins List" />
    {/* <DButton/> */}
    <Box>
      <Box className="px-5 " >
        <ToastContainer />
      </Box>
      <Box>
        <AddButton path="/dashboard/createAdmin"/>
      </Box>
      {open ?
        <Box sx={{ height: "55%" }} className="d-flex justify-content-center ">
          {/* <img className='w-25' src={Img} alt="Centered Image" /> */}
          <Box>
            <Typography variant='h6' className='text-dark pt-1 fs-4 px-2'>
              Data Not Found...
            </Typography>
            <Typography variant='p' className='text-dark pt-1 fs-6 px-2'>
              You have to Create First
            </Typography >
          </Box>
        </Box>
        :
        <Table data={data} cols={[
          {
            name: "Name",
            key: "firstname"
          },
          {
            name: "Email",
            key: "email"
          },
          {
            name: "Action",
            displayFeild: (e) => (
              <>
                {/* <Button type="primary" onClick={() => edit(e)}>edit</Button> */}
                <EditButton text="Edit" click={() => edit(e)} />
                {/* <Button className='mx-2' type="primary" danger onClick={() => Delete(e)}>Delete</Button> */}
                <DeleteButton text="Delete" click={() => DeleteRow(e._id)} />
              </>
            )
          },

        ]} />
      }
    </Box>
    <Table />
  </div>
)
}

export default ListAdmin
