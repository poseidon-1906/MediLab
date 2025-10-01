import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import YogaClasses from '../components/HospitalServices';
import InnerPower from '../components/InnerPower';

const specialityTranslations = {
    'General physician': 'Médecin généraliste',
    'Gynecologist': 'Gynécologue',
    'Dermatologist': 'Dermatologue',
    'Pediatricians': 'Pédiatre',
    'Neurologist': 'Neurologue',
    'Gastroenterologist': 'Gastro-entérologue',
};

const Services = () => {
    const { doctors } = useContext(AppContext);
    const specialities = [...new Set(doctors.map(doc => doc.speciality))];

    return (
        <div className='animate-fade-in'>
            <div className='container mx-auto px-4 py-2 md:py-12'>
              
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {specialities.map((speciality, index) => (
                        <Link to={`/doctors/${speciality}`} key={index}>
                            <div className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6'>
                                <h3 className='text-xl font-bold text-gray-800'>{specialityTranslations[speciality] || speciality}</h3>
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
