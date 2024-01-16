import { Skeleton } from 'antd'
// import AddButton from '../../Components/AddButton'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import Header from '../../Components/Header'
import MainHeader from '../../Components/MainHeader'
import ViewButton from '../../Components/ViewButton'
import { Delete, GetName } from '../../Config/ApiHandling'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../Components/Pagination'
import DeleteButton from '../../Components/DeleteButton'
import EditButton from '../../Components/EditButton'
import { Button, Modal } from 'react-bootstrap';



const UserList = () => {
  let [data, setData] = useState([])
  let [detail, setDetail] = useState([])
  let [flag, setflag] = useState(false)
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

  const fetchUserDetails = (userId) => {
    setDetail(data.filter((item) => item._id === userId))
    setShowModal(true)
  };


  let cols = [
    {
      name: "Name",
      key: "firstname"
    },
    {
      name: "Gender",
      key: "gender"
    },
    {
      name: "Email",
      key: "email"
    },
    {
      name: "Number",
      key: "phonenumber"
    },
    {
      name: "Action",
      displayFeild: (item) => (
        <>
          <EditButton text="User Details" click={() => fetchUserDetails(item._id)} />
          <DeleteButton text="Delete" click={() => DeleteUser(item._id)} />
        </>
      ),
    },
  ]

  const token = localStorage.getItem("token")
  const GetData = () => {

    GetName(`admin/getuserbytype`, "user", token).then((res) => {
      setData(res.data.data)
      console.log(res.data.data)
      let setedData = res?.data?.data?.flatMap((x, i) =>
        x.userid
      )

    }).catch((e) => console.log(e))

  }

  useEffect(() => {
    GetData()
  }, [])


  let DeleteUser = (e) => {
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
          console.log(e)
          Delete("auth/delete", e, token)
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
        <Header screenTitle="User List" />
        <ToastContainer />
        <>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {detail && (
                <>
                  <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <h5>First Name: </h5> <p>{detail[0]?.firstname}</p>
                  </div>
                  <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <h5>Last Name: </h5> <p>{detail[0]?.lastname}</p>
                  </div>
                  <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                  <h5>Email: </h5> <p>{detail[0]?.email}</p>
                  </div>
                  <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <h5>Phone Number: </h5> <p>{detail[0]?.phonenumber}</p>
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleCloseModal}>
                Close
              </Button>
              {/* Add additional buttons or actions if needed */}
            </Modal.Footer>
          </Modal>


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
                                x.key === "name" ? item?.name :
                                  x.key === "gender" ? item?.gender ? item?.gender === "undefined" ? "Not Selected" : item?.gender : "Not Selected" :
                                    x.key === "email" ? item?.email :
                                      x.key === "phonenumber" ? item?.phonenumber :
                                        x.key === "firstname" ? item?.firstname : null
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

export default UserList
