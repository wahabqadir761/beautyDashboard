import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Dashboard/Login';
import MainDashboard from '../Dashboard/MainDashboard';
import ProtectedRoute from './ProtectedRoute';
import ProtectedLogin from './ProtectedLogin';


const AppRouter = () => {
  const token = localStorage.getItem("token")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedLogin Component={Login} />} />
          <Route path='dashboard/*' element={<ProtectedRoute Component={MainDashboard} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
