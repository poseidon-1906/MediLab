import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllPatients = () => {
    const { aToken, patients, getAllPatients } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllPatients();
        }
    }, [aToken]);

    return (
        <div className='w-full p-4 md:p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>All Patients</h1>
            </div>

            <div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden'>
                <div className='hidden sm:grid grid-cols-[2fr_1fr_2fr_1fr_2fr] py-4 px-6 bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-base'>
                    <p>NAME</p>
                    <p>BLOOD GROUP</p>
                    <p>EMAIL</p>
                    <p>PHONE</p>
                    <p>ADDRESS</p>
                </div>

                <div className='max-h-[80vh] overflow-y-auto'>
                    {patients.length > 0 ? (
                        patients.map((item, index) => (
                            <div className='grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr_1fr_2fr] items-center text-gray-700 py-4 px-6 border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50' key={index}>
                                <div className='flex items-center gap-4'>
                                    <img src={item.image} className='w-14 h-14 rounded-full object-cover border-2 border-gray-300' alt="Patient Avatar" />
                                    <p className='text-base font-medium text-gray-800'>{item.name}</p>
                                </div>
                                <p className='hidden sm:block text-base'>{item.bloodType}</p>
                                <p className='hidden sm:block text-base'>{item.email}</p>
                                <p className='hidden sm:block text-base'>{item.phone}</p>
                                <p className='hidden sm:block text-base'>{`${item.address?.street}, ${item.address?.city}, ${item.address?.state}, ${item.address?.zipCode}`}</p>
                                
                                <div className='sm:hidden mt-4'>
                                    <p><span className='font-semibold'>Blood Group:</span> {item.bloodType}</p>
                                    <p><span className='font-semibold'>Email:</span> {item.email}</p>
                                    <p><span className='font-semibold'>Phone:</span> {item.phone}</p>
                                    <p><span className='font-semibold'>Address:</span> {`${item.address?.street}, ${item.address?.city}, ${item.address?.state}, ${item.address?.zipCode}`}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-10 text-gray-500'>
                            <p>No patients found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPatients;