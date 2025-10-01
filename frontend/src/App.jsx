import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Appointment = lazy(() => import('./pages/Appointment'));
const MyAppointments = lazy(() => import('./pages/MyAppointments'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const Verify = lazy(() => import('./pages/Verify'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Faq = lazy(() => import('./pages/Faq'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
import ChatWidget from './components/ChatWidget';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<div className='flex justify-center items-center min-h-[60vh]'>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/services' element={<Services />} />
          <Route path='/services/:serviceName' element={<ServiceDetail />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:postId' element={<BlogPost />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default App;
