import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const { doctors } = useContext(AppContext);

    const specialities = [
        'All',
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatricians',
        'Neurologist',
        'Gastroenterologist',
    ];

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    const handleFilterClick = (spec) => {
        if (spec === 'All') {
            navigate('/doctors');
        } else {
            navigate(`/doctors/${spec}`);
        }
        setShowFilter(false);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='text-center mb-8 animate-slide-up'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Our Top Doctors</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Explorez notre liste de spécialistes pour trouver le médecin qui répond le mieux à vos besoins de santé.
                </p>
            </div>

            <div className='flex flex-col md:flex-row gap-8'>
                {/* Mobile Filter Button */}
                <div className='md:hidden mb-4'>
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 py-2 px-4 rounded-full border transition-all duration-300 ${showFilter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-700'}`}
                    >
                        <span className='font-semibold'>Filters</span>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${showFilter ? 'transform rotate-180' : ''}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M7 10l5 5 5-5H7z' />
                        </svg>
                    </button>
                </div>

                {/* Filter Panel */}
                <div className={`flex-shrink-0 w-full md:w-64 p-6 rounded-2xl bg-white shadow-lg transition-all duration-500 ${showFilter ? 'block' : 'hidden md:block'}`}>
                    <h3 className='text-lg font-bold text-gray-800 mb-4'>Filter by Specialty</h3>
                    <div className='flex flex-col gap-3 text-sm text-gray-600'>
                        {specialities.map((spec, index) => (
                            <button
                                onClick={() => handleFilterClick(spec)}
                                key={index}
                                className={`text-left w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 ${speciality === spec ? 'bg-blue-100 text-blue-600 font-bold' : ''}`}
                            >
                                {spec}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Doctors Grid */}
                <div className='flex-1 w-full'>
                    {filterDoc.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {filterDoc.map((item) => (
                                <div
                                    onClick={() => navigate(`/appointment/${item._id}`)}
                                    className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl'
                                    key={item._id}
                                >
                                    <div className='relative h-56 w-full bg-[#EAEFFF] flex items-center justify-center overflow-hidden'>
                                        <img className='w-full h-full object-cover transform transition-transform duration-300 hover:scale-110' src={item.image} alt={item.name} />
                                    </div>
                                    <div className='p-6'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <p className='text-xl font-bold text-gray-800'>Dr. {item.name}</p>
                                            <div className={`flex items-center gap-1.5 text-sm font-semibold ${item.available ? 'text-green-600' : 'text-gray-500'}`}>
                                                <div className={`w-2.5 h-2.5 rounded-full ${item.available ? 'bg-green-600' : 'bg-gray-500'}`}></div>
                                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                                            </div>
                                        </div>
                                        <p className='text-base text-blue-600 font-medium'>{item.speciality}</p>
                                        <p className='text-sm text-gray-500 mt-1'>{item.degree} - {item.experience}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-20 bg-white rounded-lg shadow-lg'>
                            <p className='text-xl text-gray-500 font-medium'>No doctors found in this specialty.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;