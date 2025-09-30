import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import YogaClasses from '../components/HospitalServices';
import InnerPower from '../components/InnerPower';

const Services = () => {
    const { doctors } = useContext(AppContext);
    const specialities = [...new Set(doctors.map(doc => doc.speciality))];

    return (
        <div className='animate-fade-in'>
            <div className='container mx-auto px-4 py-8 md:py-12'>
                <div className='text-center mb-8 animate-slide-up'>
                    <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Our Services</h1>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        We offer a wide range of medical services to meet your needs.
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {specialities.map((speciality, index) => (
                        <Link to={`/services/${speciality.toLowerCase().replace(/ /g, '-')}`} key={index}>
                            <div className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6'>
                                <h3 className='text-xl font-bold text-gray-800'>{speciality}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <YogaClasses />
            <InnerPower />
        </div>
    );
};

export default Services;
