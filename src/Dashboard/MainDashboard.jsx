import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import MainIcon from "../assets/White.png"
import { DashboardOutlined } from '@ant-design/icons';
import { RiAdminLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { RiScissorsFill } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BiMessageAltError } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import AdminList from '../DashboardScreen/Admin/AdminList';
import EditAdmin from '../DashboardScreen/Admin/EditAdmin';
import UserList from '../DashboardScreen/User/UserList';
import PageList from '../DashboardScreen/Pages/PageList';
import EditPage from '../DashboardScreen/Pages/EditPage';
import PartnerList from '../DashboardScreen/Partner/PartnerList'
import ContactList from '../DashboardScreen/Contact/ContactList'
import FAQsList from '../DashboardScreen/FAQ/FAQsList'
import EditFAQs from '../DashboardScreen/FAQ/EditFAQs'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SubMainDashboard from '../DashboardScreen/SubMainDashboard';
import CreateAdmin from '../DashboardScreen/Admin/CreateAdmin';

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
                name: "Page",
                icon: <FaRegUser />
            },
            item1: {
                name: "Page List",
                key: "/dashboard/pageList"
            }
        },
        
        {
            mainitem: {
                name: "Partners",
                icon: <TbCategory />
            },
            item1: {
                name: "Partner List",
                key: "/dashboard/partnerList"
            }
        },
        {
            mainitem: {
                name: "Contact",
                icon: <TfiWrite />
            },
            item1: {
                name: "Contact List",
                key: "/dashboard/contactList"
            }
        },
        {
            mainitem: {
                name: "Faq",
                icon: <BiMessageAltError />
            },
            item1: {
                name: "Faqs List",
                key: "/dashboard/faqsList"
            }
        },
        {
            mainitem: {
                name: "Gernal Settings",
                icon: <LuSettings2 />
            },
            item1: {
                name: "Setting",
                key: "/dashboard/setting"
            }
        }

    ]


    const navItem = (e) => {
        navig(`${e}`);
    };

    //   useEffect(() => {
    //     // Set the selected menu item based on the current route
    //     const currentPath = location.pathname.slice(1);
    //     setSelectedKeys([currentPath]);
    //   }, [location.pathname]);

    return (
        <Layout style={{ minWidth: "207px", minHeight: '100vh', backgroundColor: "#1E5082", fontFamily: "-moz-initial-Niconne" }}>
            <Sider width={250} style={{
                backgroundColor: '#212529',
            }} theme="dark">
                <div className="logo" style={{ display: "flex", justifyContent: "center", height: "33%" }}>
                    <img src={MainIcon} alt="" width={100} height={190} />
                </div>
                <Menu
                    style={{ backgroundColor: "#212529", color: "#fff", fontSize: "20px" }}
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
                        style={{ backgroundColor: "#212529", color: "#fff", height: "100%" }}
                    >
                        Dashboard
                    </Menu.Item>
                    {nav.map((item) => (
                        <Menu.SubMenu
                            key={item.mainitem.name}
                            icon={item.mainitem.icon}
                            className='dashboard'
                            title={item.mainitem.name}
                            style={{ backgroundColor: "#212529", color: "#fff" }}
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

                    <Route path='partnerList' element={<PartnerList />} />

                    <Route path='contactList' element={<ContactList />} />

                    <Route path='FaqsList' element={<FAQsList />} />
                    <Route path='EditFaqs' element={<EditFAQs />} />
                </Routes>
            </Layout>
        </Layout>
    );
};

export default MainDashboard;
