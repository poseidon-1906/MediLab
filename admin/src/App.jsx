import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import Consultation from './pages/Doctor/Consultation';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Placeholder from './pages/Admin/Placeholder';
import Lab from './pages/Admin/Lab';

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD] dark:bg-dark'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path='/' element={aToken ? <Navigate to='/admin-dashboard' /> : <Navigate to='/doctor-dashboard' />} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/patients' element={<Placeholder title="Patients" />} />
            <Route path='/lab' element={<Lab />} />
            <Route path='/ward' element={<Placeholder title="Ward" />} />
            <Route path='/treatment' element={<Placeholder title="Treatment" />} />
            <Route path='/pharmacy' element={<Placeholder title="Pharmacy" />} />
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />
            <Route path='/doctor/consultation/:appointmentId' element={<Consultation />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App