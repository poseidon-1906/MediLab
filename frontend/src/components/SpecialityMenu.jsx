import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecialityMenu = () => {

    const specialitiesWithDesc = specialityData.map(item => {
        switch (item.speciality) {
            case 'General physician':
                return { ...item, french_name: 'Médecin généraliste', description: 'Soins primaires complets pour tous les âges.' };
            case 'Gynecologist':
                return { ...item, french_name: 'Gynécologue', description: 'Spécialisé dans la santé reproductive des femmes.' };
            case 'Dermatologist':
                return { ...item, french_name: 'Dermatologue', description: 'Expertise des affections de la peau, des cheveux et des ongles.' };
            case 'Pediatricians':
                return { ...item, french_name: 'Pédiatre', description: 'Soins dédiés aux nourrissons, enfants et adolescents.' };
            case 'Neurologist':
                return { ...item, french_name: 'Neurologue', description: 'Traitement des troubles du système nerveux.' };
            case 'Gastroenterologist':
                return { ...item, french_name: 'Gastro-entérologue', description: 'Centré sur le système digestif et ses troubles.' };
            default:
                return { ...item, french_name: item.speciality, description: 'Soins médicaux spécialisés.' };
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, ease: 'easeOut' },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <section id='speciality' className='bg-gray-50 font-sans'>
            <div className='container mx-auto px-4 py-16 sm:py-24 text-center'>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Consultez par spécialité</h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Accédez à des soins spécialisés parmi un large éventail de domaines médicaux.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12'
                >
                    {specialitiesWithDesc.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <Link to={`/doctors/${item.speciality}`} onClick={() => window.scrollTo(0, 0)} 
                                  className='block w-full h-full p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                                <div className="flex flex-col items-center text-center">
                                    <img 
                                        src={item.image} 
                                        alt={item.french_name} 
                                        className='w-20 h-20 mb-5' 
                                    />
                                    <h3 className='text-xl font-semibold text-gray-900'>{item.french_name}</h3>
                                    <p className='text-gray-600 mt-2'>{item.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialityMenu;