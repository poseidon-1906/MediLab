import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
    desktop: { breakpoint: { max: 1200, min: 992 }, items: 3 },
    tablet: { breakpoint: { max: 992, min: 576 }, items: 2 },
    mobile: { breakpoint: { max: 576, min: 0 }, items: 1 },
};

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className='container mx-auto px-4 py-16 sm:py-24 text-center font-sans'
        >
            <div className='mb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Découvrez nos spécialistes</h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Explorez notre liste de spécialistes de confiance, prêts à vous aider.
                </p>
            </div>

            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                className='pb-12'
                itemClass="px-2 sm:px-4"
            >
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0);
                        }}
                        className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden h-full flex flex-col'
                    >
                        <div className='relative'>
                            <img
                                src={item.image}
                                alt={`Dr. ${item.name}`}
                                className='w-full h-60 object-cover'
                            />
                            <div className={`absolute top-3 right-3 flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold ${item.available ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                <p>{item.available ? 'Disponible' : 'Non dispo.'}</p>
                            </div>
                        </div>

                        <div className='p-5 text-left flex-grow flex flex-col'>
                            <h4 className='font-bold text-lg text-gray-900 mb-1'>Dr. {item.name}</h4>
                            <p className='text-primary-brand text-base font-medium'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    navigate('/doctors');
                    window.scrollTo(0, 0);
                }}
                className='mt-8 bg-primary-brand text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-sm'
            >
                Voir tous les docteurs
            </motion.button>
        </motion.section>
    );
};

export default TopDoctors;