import { Skeleton } from 'antd'
import { Box } from '@mui/material'
// import AddButton from '../../Components/AddButton'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import Header from '../../Components/Header'
import MainHeader from '../../Components/MainHeader'
import ViewButton from '../../Components/ViewButton'
import { Delete, Get, GetName } from '../../Config/ApiHandling'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../Components/Pagination'
import DeleteButton from '../../Components/DeleteButton'
import EditButton from '../../Components/EditButton'
import AddButton from '../../Components/AddButton'
import { Button, Modal } from 'react-bootstrap';



const FAQsList = () => {
    let [data, setData] = useState([])
    let [detail, setDetail] = useState([])
    let [flag, setflag] = useState(false)
    let navigation = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [currentpage, setcurrentpage] = useState(1);
    const [postperpge, setpostperpge] = useState(10);
    let navigate = useNavigate()


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (userData) => {
        setUserDetails(userData);
        setShowModal(true);
    };

    const fetchPartnerDetails = (userId, item) => {
        setDetail(data.filter((partner) => partner._id === userId));
        setShowModal(true);
    };


    let cols = [
        {
            name: "Title",
            key: "title"
        },
        {
            name: "Description",
            key: "description"
        },
        {
            name: "Action",
            displayFeild: (item) => (
                <>
                    <div style={{ display: "flex" }}>
                        <EditButton text="Edit" click={() => edit(item)} />
                        <DeleteButton text="Delete" click={() => DeleteFAQs(item._id)} />
                    </div>
                </>
            ),
        },
    ]

    const token = localStorage.getItem("token")
    const GetData = () => {
        Get(`getFaqs`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((e) => console.error("Error fetching FAQs:", e));
    }


    useEffect(() => {
        GetData()
    }, [])



    let edit = (item) => {
        navigation("/dashboard/EditFAQs", {
            state: item
        });
    }


    let DeleteFAQs = (e) => {
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
                    Delete("deleteFaqs", e, token)
                        ?.then((res) => {
                            GetData()
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

    const indexoflastpost = currentpage * postperpge;
    const indexofFirstpost = indexoflastpost - postperpge;
    const currentpost = data.slice(indexofFirstpost, indexoflastpost);
    const paginate = (pageNumber) => setcurrentpage(pageNumber);

    return (
        <>
            <div>
                <MainHeader />
                <Header screenTitle="Faqs List" />
                <ToastContainer />
                <Box>
                    <AddButton path="/dashboard/EditFAQs" />
                </Box>
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {data ? (
                            data.length === 0 ? (
                                flag ? (
                                    <table
                                        className="table table-striped table-bordered text-center"
                                        style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
                                    >

                                        <thead>
                                            <tr>
                                                {cols &&
                                                    cols.map((x, i) => {
                                                        return <th style={{ backgroundColor: "#212529", color: "#fff" }} key={i}>{x.name}</th>;
                                                    })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="6">No Data</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <table
                                        className="table table-striped table-bordered text-center"
                                        style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
                                    >
                                        <tr>
                                            {cols &&
                                                cols.map((x, i) => {
                                                    return <th style={{ backgroundColor: "#212529", color: "#fff" }} key={i}>{x.name}</th>;
                                                })}
                                        </tr>
                                        <tbody>
                                            {cols.map((x, i) => (
                                                <tr key={i}>
                                                    <td key={i} colSpan="6"><Skeleton.Input style={{ width: '90vh' }} active animation="wave" /> </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            ) : (
                                <table
                                    className="table table-striped table-bordered text-center"
                                    style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
                                >
                                    <thead>
                                        <tr>
                                            {cols &&
                                                cols.map((x, i) => {
                                                    return <th className='tablehead' style={{ backgroundColor: "#212529", color: "#fff", fontSize: "20px" }} key={i}>{x.name}</th>;
                                                })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentpost.map((item, key) => (
                                            <tr key={key} className='table_img tablerow'>
                                                {cols.map((x, i) => (<>
                                                    <td style={{ verticalAlign: 'middle' }} key={i}>
                                                        {x.displayFeild ? (
                                                            x.displayFeild(item)
                                                        ) : x.img ? (
                                                            <img
                                                                className='table_img'
                                                                src={`${item[x.img]}`}
                                                                alt="NoImage"
                                                                style={{ width: '60px', height: '55px' }}
                                                            />
                                                        ) : (
                                                            // Check if the key is "amount" or "price" and prepend the dollar sign
                                                            // (x.key === 'amount' || x.key === 'price') ? `$${item[x.key]}` : x.key == "name" ? item.userid?.name : 
                                                            // x.key == "gender" ? item.userid?.gender ?item.userid?.gender === "undefined"?"Not Selected": item.userid?.gender :"Not Selected": x.key == "email" ? item.userid?.email : null

                                                            (x.key === 'amount' || x.key === 'price') ? `$${item[x.key]}` :
                                                                x.key === "title" ? item?.title :
                                                                    x.key === "description" ? item?.description : null
                                                        )}
                                                    </td>
                                                </>))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        ) : null}


                    </div>
                </>
                <Pagination perpge={postperpge} total={data.length} paginate={paginate} />
            </div>
        </>
    )
}

export default FAQsList
