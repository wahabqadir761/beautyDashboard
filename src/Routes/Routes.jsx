import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Dashboard/Login';
import MainDashboard from '../Dashboard/MainDashboard';


const AppRouter = () => {
const token=  localStorage.getItem("token")
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={token?<MainDashboard />: <Login />} />
      <Route path='/dashboard/*' element={<MainDashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
