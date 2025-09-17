
import React, { useContext, useState, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; // Assuming you might have a placeholder avatar

const Navbar = () => {
    const { dToken, setDToken } = useContext(DoctorContext);
    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const logout = () => {
        navigate('/');
        if (dToken) {
            setDToken('');
            localStorage.removeItem('dToken');
        }
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
    };

    const role = aToken ? 'Admin' : 'Doctor';

    return (
        <div className='sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm'>
            {/* Left side - Search Bar */}
            <div className="relative flex-1 max-w-xs">
                <input 
                    type="text" 
                    placeholder="Search by ID..." 
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            {/* Right side - Actions */}
            <div className='flex items-center gap-4'>
                {/* Theme Switcher */}
                <button onClick={handleThemeSwitch} className='p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'>
                    {theme === 'light' ? '(M)' : '(S)'} {/* Placeholder for Moon/Sun icon */}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className='p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'>
                        (N) {/* Placeholder for Bell icon */}
                    </button>
                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-custom border dark:border-gray-700">
                            <div className="p-3 font-semibold text-sm border-b dark:border-gray-700">Notifications</div>
                            <div className="p-4 text-center text-xs text-gray-500">No new notifications</div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button onClick={() => setProfileOpen(!profileOpen)} className='flex items-center gap-2'>
                        <div className='w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold'>
                            {role.charAt(0)}
                        </div>
                        <div className='hidden md:flex flex-col items-start'>
                            <span className='font-semibold text-sm text-gray-800 dark:text-white'>User</span>
                            <span className='text-xs text-gray-500 dark:text-gray-400'>{role}</span>
                        </div>
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-custom border dark:border-gray-700 py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                            <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
