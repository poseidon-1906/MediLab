import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBullseye, FaEye } from 'react-icons/fa';
import { assets } from '../assets/assets';

const AboutSection = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, ease: 'easeOut' },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const AboutPoint = ({ icon, title, text }) => (
        <motion.div variants={itemVariants} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1">{text}</p>
            </div>
        </motion.div>
    );

    return (
        <section className="bg-gray-50 font-sans">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 py-16 sm:py-24"
            >
                {/* Image Column */}
                <motion.div variants={imageVariants} className="w-full">
                    <img 
                        src={assets.about_image} 
                        alt="Doctor and patient discussion" 
                        className="rounded-lg shadow-xl w-full h-auto object-cover"
                    />
                </motion.div>

                {/* Text Column */}
                <motion.div variants={itemVariants} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary-brand rounded-full"></span>
                        <p className="font-semibold text-primary-brand">À Propos de Nous</p>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                        Une vision pour un avenir plus sain et plus radieux
                    </h2>

                    <div className="space-y-6">
                        <AboutPoint 
                            icon={<FaBullseye className="text-primary-brand text-2xl" />} 
                            title="Notre Mission"
                            text="Fournir des services de santé compatissants et de haute qualité."
                        />
                        <AboutPoint 
                            icon={<FaEye className="text-primary-brand text-2xl" />} 
                            title="Notre Vision"
                            text="Être le premier fournisseur de soins de santé, reconnu pour nos pratiques innovantes."
                        />
                    </div>

                    <motion.div variants={itemVariants}>
                        <button
                            onClick={() => navigate('/services')}
                            className='bg-primary-brand text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-sm w-fit'
                        >
                            Ce que nous faisons
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AboutSection;
