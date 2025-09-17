import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
    const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
    const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    return (
        <div className='w-full p-4 md:p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>All Appointments</h1>
            </div>

            <div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden'>
                {/* En-têtes de tableau pour grands écrans */}
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-4 px-6 bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-base'>
                    <p>#</p>
                    <p>PATIENT</p>
                    <p>AGE</p>
                    <p>DATE & TIME</p>
                    <p>DOCTOR</p>
                    <p>FEES</p>
                    <p>ACTION</p>
                </div>

                {/* Corps du tableau */}
                <div className='max-h-[80vh] overflow-y-auto'>
                    {appointments.length > 0 ? (
                        appointments.map((item, index) => (
                            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center text-gray-700 py-4 px-6 border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50' key={index}>
                                {/* Vue mobile (première partie) */}
                                <div className='sm:hidden flex flex-col gap-1 mb-2'>
                                    <p className='text-sm font-bold text-gray-800'>Appointment #{index + 1}</p>
                                    <p className='text-xs text-gray-500'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                                </div>
                                
                                {/* Vue bureau/grille */}
                                <p className='hidden sm:block text-base font-medium'>{index + 1}</p>
                                
                                <div className='flex items-center gap-4'>
                                    <img src={item.userData.image} className='w-14 h-14 rounded-full object-cover border-2 border-gray-300' alt="Avatar patient" />
                                    <p className='text-base font-medium text-gray-800'>{item.userData.name}</p>
                                </div>
                                <p className='hidden sm:block text-base'>{calculateAge(item.userData.dob)}</p>
                                <p className='hidden sm:block text-base'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                                <div className='flex items-center gap-4'>
                                    <img src={item.docData.image} className='w-14 h-14 rounded-full object-cover border-2 border-gray-300' alt="Avatar docteur" />
                                    <p className='text-base font-medium text-gray-800'>{item.docData.name}</p>
                                </div>
                                <p className='hidden sm:block text-base font-medium'>{currency}{item.amount}</p>
                                
                                {/* Action / Statut */}
                                <div className='flex justify-end sm:justify-start items-center max-sm:w-full max-sm:mt-2'>
                                    {item.cancelled ? (
                                        <span className='px-4 py-1.5 text-xs font-semibold rounded-full bg-red-100 text-red-600'>Annulé</span>
                                    ) : item.isCompleted ? (
                                        <button onClick={() => navigate(`/add-record`)} className='px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200'>Add Record</button>
                                    ) : (
                                        <button 
                                            onClick={() => cancelAppointment(item._id)} 
                                            className='p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
                                            title="Annuler le rendez-vous"
                                        >
                                            <img className='w-6 h-6' src={assets.cancel_icon} alt="Annuler" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-10 text-gray-500'>
                            <p>Aucun rendez-vous trouvé.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllAppointments;