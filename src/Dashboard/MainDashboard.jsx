import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import MainIcon from "../assets/BeautyParlour.png"
import { DashboardOutlined } from '@ant-design/icons';
import { RiAdminLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa6";
import { MdSubscriptions } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AdminList from '../DashboardScreen/Admin/AdminList';
import EditAdmin from '../DashboardScreen/Admin/EditAdmin';
import UserList from '../DashboardScreen/User/UserList';
import PageList from '../DashboardScreen/Pages/PageList';
import CartegoryList from '../DashboardScreen/Category/CategoryList'
import EditCategory from '../DashboardScreen/Category/EditCategory'
import EditPage from '../DashboardScreen/Pages/EditPage';
import PartnerList from '../DashboardScreen/Partner/PartnerList';
import TeamList from '../DashboardScreen/Team/TeamList';
import EditTeam from '../DashboardScreen/Team/EditTeam';
import ContactList from '../DashboardScreen/Contact/ContactList';
import FAQsList from '../DashboardScreen/FAQ/FAQsList';
import EditFAQs from '../DashboardScreen/FAQ/EditFAQs';
import SubMainDashboard from '../DashboardScreen/SubMainDashboard';
import CreateAdmin from '../DashboardScreen/Admin/CreateAdmin';
import TestimonialList from '../DashboardScreen/Testinomials/TestinomialList';
import EditTestinomial from '../DashboardScreen/Testinomials/EditTestinomial';
import SubscriberList from '../DashboardScreen/SubscribedUser/SubscriberList';
import EditSubscribers from '../DashboardScreen/SubscribedUser/EditSubscribers';

const { Sider, Content } = Layout;

const MainDashboard = () => {
    const navig = useNavigate();
    const location = useLocation();

    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    let nav = [

        {
            mainitem: {
                name: "Admin",
                icon: <RiAdminLine />
            },
            item1: {
                name: "Admin List",
                key: "/dashboard/adminList"
            },
            item2: {
                name: "Create Admin",
                key: "/dashboard/createAdmin"
            },
        },
        {
            mainitem: {
                name: "User",
                icon: <FaRegUser />
            },
            item1: {
                name: "User List",
                key: "/dashboard/userList"
            }
        },
        {
            mainitem: {
                name: "Category",
                icon: <TbCategory />
            },
            item1: {
                name: "Category List",
                key: "/dashboard/categoryList"
            }
        },

        {
            mainitem: {
                name: "Page",
                icon: <RiPagesLine />
            },
            item1: {
                name: "Page List",
                key: "/dashboard/pageList"
            }
        },

        {
            mainitem: {
                name: "Partners",
                icon: <FaHandshake />
            },
            item1: {
                name: "Partner List",
                key: "/dashboard/partnerList"
            }
        },
        {
            mainitem: {
                name: "Teams",
                icon: <IoIosPeople />
            },
            item1: {
                name: "Teams List",
                key: "/dashboard/teamList"
            }
        },
        {
            mainitem: {
                name: "Contact",
                icon: <GrContactInfo />
            },
            item1: {
                name: "Contact List",
                key: "/dashboard/contactList"
            }
        },
        {
            mainitem: {
                name: "Faq",
                icon: <FaQuestionCircle />
            },
            item1: {
                name: "Faqs List",
                key: "/dashboard/faqsList"
            }
        },
        {
            mainitem: {
                name: "Testimonials",
                icon: <FaRegNoteSticky />
            },
            item1: {
                name: "Testimonials List",
                key: "/dashboard/testinomialList"
            }
        },
        {
            mainitem: {
                name: "Subscribed Users",
                icon: <MdSubscriptions />
            },
            item1: {
                name: "Subscriber List",
                key: "/dashboard/subscriberList"
            }
        },
    ]


    const navItem = (e) => {
        navig(`${e}`);
    };
  

    return (
        <Layout style={{ minWidth: "207px", minHeight: '100vh', backgroundColor: "#1E5082", fontFamily: "-moz-initial-Niconne" }}>
            <Sider width={250} style={{
                backgroundColor: '#DADADA',
            }} theme="dark">
                <div className="logo" style={{ display: "flex", justifyContent: "center", height: "33%" }}>
                    <img src={MainIcon} alt="" width={100} height={190} />
                </div>
                <Menu
                    style={{ backgroundColor: "#DADADA", color: "#000", fontSize: "20px" }}
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={(keys) => setOpenKeys([keys.pop()])}
                    selectedKeys={selectedKeys}
                >

                    <Menu.Item
                        onClick={() => navItem('')}
                        key="dashboard"
                        className='dashboard'
                        icon={<DashboardOutlined />}
                        selectedKeys={selectedKeys}
                        style={{ backgroundColor: "#DADADA", color: "#000", height: "100%" }}
                    >
                        Dashboard
                    </Menu.Item>
                    {nav.map((item) => (
                        <Menu.SubMenu
                            key={item.mainitem.name}
                            icon={item.mainitem.icon}
                            className='dashboard'
                            title={item.mainitem.name}
                            style={{ backgroundColor: "#DADADA", color: "#000" }}
                        >
                            <Menu.Item
                                onClick={() => navItem(item.item1.key)}
                                key={item.item1.key}
                                icon={item.mainitem.icon}
                                className='dashboard'
                                selectedKeys={selectedKeys}
                            >
                                {item.item1.name}
                            </Menu.Item>
                            {item.item2 && (
                                <Menu.Item
                                    onClick={() => navItem(item.item2.key)}
                                    key={item.item2.key}
                                    icon={item.mainitem.icon}
                                    className='dashboard'
                                    selectedKeys={selectedKeys}
                                >
                                    {item.item2.name}
                                </Menu.Item>
                            )}
                        </Menu.SubMenu>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Routes>
                    <Route path='/' element={<SubMainDashboard />} />

                    <Route path='adminlist' element={<AdminList />} />
                    <Route path='editAdmin' element={<EditAdmin />} />
                    <Route path='createAdmin' element={<CreateAdmin />} />

                    <Route path='userlist' element={<UserList />} />

                    <Route path='pagelist' element={<PageList />} />
                    <Route path='editpage' element={<EditPage />} />

                    <Route path='categorylist' element={<CartegoryList />} />
                    <Route path='editCategory' element={<EditCategory />} />

                    <Route path='partnerList' element={<PartnerList />} />

                    <Route path='teamList' element={<TeamList />} />
                    <Route path='editTeam' element={<EditTeam />} />

                    <Route path='contactList' element={<ContactList />} />

                    <Route path='FaqsList' element={<FAQsList />} />
                    <Route path='EditFaqs' element={<EditFAQs />} />

                    <Route path='TestinomialList' element={<TestimonialList />} />
                    <Route path='EditTestinomial' element={<EditTestinomial />} />

                    <Route path='subscriberList' element={<SubscriberList />} />
                    <Route path='editSubscriber' element={<EditSubscribers />} />
                </Routes>
            </Layout>
        </Layout>
    );
};

export default MainDashboard;