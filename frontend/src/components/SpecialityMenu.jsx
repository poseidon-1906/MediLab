import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const SpecialityMenu = () => {
    // Add descriptive text to each speciality for a richer card content
    const specialitiesWithDesc = specialityData.map(item => {
        switch (item.speciality) {
            case 'General physician':
                return { ...item, description: 'Comprehensive primary care for all ages.' };
            case 'Gynecologist':
                return { ...item, description: 'Specializing in women\'s reproductive health.' };
            case 'Dermatologist':
                return { ...item, description: 'Expertise in skin, hair, and nail conditions.' };
            case 'Pediatricians':
                return { ...item, description: 'Dedicated care for infants, children, and adolescents.' };
            case 'Neurologist':
                return { ...item, description: 'Treating disorders of the nervous system.' };
            case 'Gastroenterologist':
                return { ...item, description: 'Focused on digestive system and its disorders.' };
            default:
                return { ...item, description: 'Specialized medical care.' };
        }
    });

    const getGridClasses = (index) => {
       
        switch (index) {
            case 0: return 'lg:col-span-2 lg:row-span-1 bg-green'; // General physician
            case 1: return 'lg:col-span-2 lg:row-span-1 bg-violet-500'; // Gynecologist
            case 2: return 'lg:col-span-1 lg:row-span-1 bg-blue-500'; // Dermatologist
            case 3: return 'lg:col-span-1 lg:row-span-1 bg-orange'; // Pediatricians
            case 4: return 'lg:col-span-1 lg:row-span-1 bg-yellow'; // Neurologist
            case 5: return 'lg:col-span-1 lg:row-span-1 bg-black-lg'; // Gastroenterologist
            default: return '';
        }
    };

    return (
        <div id='speciality' className='container mx-auto px-4 py-16 text-center'>
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Find by Speciality</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Access specialized care from our top doctors across various fields.
                </p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 p-6 mt-4'
            >
                {specialitiesWithDesc.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`group ${getGridClasses(index)}`}
                    >
                        <Link to={`/doctors/${item.speciality}`} onClick={() => window.scrollTo(0, 0)} 
                              className='block w-full h-full p-6  shadow-lg border border-gray-100 
                                         hover:shadow-xl hover:border-blue-500 transition-all duration-300 ease-in-out'>
                            <div className="flex flex-col items-center text-center">
                                <motion.img 
                                    whileHover={{ scale: 1.1 }}
                                    src={item.image} 
                                    alt={item.speciality} 
                                    className='w-20 h-20 mb-4' 
                                />
                                <h3 className='text-2xl font-bold text-gray-800'>{item.speciality}</h3>
                                <p className='text-white mt-2 text-bold'>{item.description}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default SpecialityMenu;