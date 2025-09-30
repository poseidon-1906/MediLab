import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `py-1 transition-colors duration-300 ${isActive ? 'text-primary-brand' : 'text-gray-700 hover:text-primary-brand'}`;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='flex items-center justify-between font-sans bg-gray-50/80 backdrop-blur-sm sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 mb-5 border-b border-gray-200'
    >
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <span className="text-primary-brand font-bold text-2xl">MediLab</span>
        <span className="text-gray-800 text-xl font-light">Hospital</span>
      </div>

      <ul className='md:flex items-center gap-6 font-medium hidden'>
        <NavLink to='/' className={navLinkClasses}>HOME</NavLink>
        <NavLink to='/doctors' className={navLinkClasses}>ALL DOCTORS</NavLink>
        <NavLink to='/services' className={navLinkClasses}>SERVICES</NavLink>
        <NavLink to='/about' className={navLinkClasses}>ABOUT</NavLink>
        <NavLink to='/contact' className={navLinkClasses}>CONTACT</NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='group relative'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-10 h-10 rounded-full object-cover' src={userData.image} alt="User" />
              <img className='w-2.5 transition-transform duration-300 group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
            </div>
            <div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 hidden group-hover:block ring-1 ring-black ring-opacity-5'>
              <div className='py-1'>
                <p onClick={() => navigate('/my-profile')} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary-brand text-white px-5 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors hidden sm:block'>
            Prendre RDV
          </button>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />
      </div>

      {/* ---- Mobile Menu ---- */}
      <div className={`fixed inset-0 z-50 md:hidden ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-400`}>
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-200'>
          
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt="Close" />
        </div>
        <ul className='flex flex-col items-center gap-4 mt-8 text-lg font-medium bg-white py-10'>
          <NavLink onClick={() => setShowMenu(false)} to='/' className={navLinkClasses}>HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={navLinkClasses}>ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/services' className={navLinkClasses}>SERVICES</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about' className={navLinkClasses}>ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' className={navLinkClasses}>CONTACT</NavLink>
        </ul>
        <div className="absolute bottom-8 left-0 right-0 px-5">
          {!token && (
            <button onClick={() => { navigate('/login'); setShowMenu(false); }} className='w-full bg-primary-brand text-white px-5 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors'>
              Prendre RDV
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
