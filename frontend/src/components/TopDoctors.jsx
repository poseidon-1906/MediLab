import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 1200, min: 992 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 992, min: 576 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 576, min: 0 },
        items: 1,
    },
};

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className='container mx-auto px-4 py-8 md:py-12 text-center'>
            <div className='mb-8'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Top Doctors to Book</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Explorez notre liste de spécialistes de confiance, prêts à vous aider.
                </p>
            </div>

            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                className='pb-12 px-2'
            >
                {doctors.slice(0, 10).map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0);
                        }}
                        className='flex flex-col items-center text-center p-4 cursor-pointer'
                    >
                        <div className='relative w-full h-auto overflow-hidden rounded-3xl shadow-lg border-4 border-white transition-all duration-300 hover:shadow-2xl'>
                            <img
                                src={item.image}
                                alt={item.name}
                                className='w-full h-full object-cover rounded-3xl'
                            />
                            {/* Availability badge */}
                            <div className={`absolute top-4 left-4 flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold ${item.available ? 'bg-green text-white' : 'bg-gray-500 text-white'}`}>
                                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-white' : 'bg-white'}`}></div>
                                <p>{item.available ? 'Available' : 'Unavailable'}</p>
                            </div>
                        </div>

                        <div className='mt-4 w-full'>
                            <h4 className='font-bold text-lg text-gray-800 mb-1'>Dr. {item.name.toUpperCase()}</h4>
                            <p className='text-blue-600 text-lg font-semibold'>{item.speciality}</p>
                        </div>
                    </motion.div>
                ))}
            </Carousel>
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    navigate('/doctors');
                    window.scrollTo(0, 0);
                }}
                className='mt-8 px-10 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl'
            >
                View all Doctors
            </motion.button>
        </motion.section>
    );
};

export default TopDoctors;