
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
    const { dToken } = useContext(DoctorContext);
    const { aToken } = useContext(AdminContext);

    const baseLinkStyle = 'flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-sm';
    const activeLinkStyle = 'bg-primary text-white font-semibold shadow-lg';
    const inactiveLinkStyle = 'text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-dark';

    const getLinkClass = ({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`;

    const adminLinks = [
        { to: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/staff', icon: assets.people_icon, label: 'Staff' },
        { to: '/patients', icon: assets.patient_icon, label: 'Patient' },
        { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
        { to: '/lab', icon: assets.list_icon, label: 'Lab' },
        { to: '/ward', icon: assets.list_icon, label: 'Ward' },
        { to: '/treatment', icon: assets.list_icon, label: 'Treatment' },
        { to: '/pharmacy', icon: assets.list_icon, label: 'Pharmacy' },
    ];

    const doctorLinks = [
        { to: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
        { to: '/doctor-profile', icon: assets.people_icon, label: 'Profile' },
    ];

    return (
        <div className='min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl p-4 flex flex-col'>
            <div className="flex items-center space-x-2 mb-8 px-2">
                <span className="text-blue-600 font-bold text-2xl">MediLab</span>
                <span className="text-gray-800 dark:text-white text-xl">Hospital</span>
            </div>

            <nav className='flex-grow'>
                {aToken && (
                    <>
                        <h3 className='px-3 text-xs text-gray-400 uppercase font-semibold mb-2'>Main Menu</h3>
                        <ul className='space-y-2'>
                            {adminLinks.map(link => (
                                <li key={link.to}>
                                    <NavLink to={link.to} className={getLinkClass}>
                                        <img className='w-5 h-5' src={link.icon} alt='' />
                                        <span className='hidden md:inline'>{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {dToken && (
                     <>
                        <h3 className='px-3 text-xs text-gray-400 uppercase font-semibold mb-2'>Doctor Menu</h3>
                        <ul className='space-y-2'>
                            {doctorLinks.map(link => (
                                <li key={link.to}>
                                    <NavLink to={link.to} className={getLinkClass}>
                                        <img className='w-5 h-5' src={link.icon} alt='' />
                                        <span className='hidden md:inline'>{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                     </>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
