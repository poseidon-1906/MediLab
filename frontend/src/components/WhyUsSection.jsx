import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import reason1 from '../assets/images/reason1.jpg';

const WhyUsSection = () => {
    const navigate = useNavigate();

    const points = [
        {
            number: "01",
            title: "Professionnels expérimentés",
            description: "Notre équipe de soignants dévoués apporte des années d'expérience et d'expertise pour dispenser des soins de qualité.",
        },
        {
            number: "02",
            title: "Technologie de pointe",
            description: "Nous utilisons une technologie médicale de pointe pour fournir des diagnostics précis et des traitements efficaces.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2, ease: 'easeOut' },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <section className="bg-white font-sans">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center px-4 py-16 sm:py-24"
            >
                {/* Text Column */}
                <div className="flex flex-col gap-8">
                    <motion.div variants={itemVariants} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary-brand rounded-full"></span>
                        <p className="font-semibold text-primary-brand">Pourquoi Nous Choisir</p>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                        Pourquoi choisir Medilab pour vos soins de santé ?
                    </motion.h2>

                    <motion.div variants={itemVariants} className="space-y-8 mt-4">
                        {points.map((point, index) => (
                            <div key={index} className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-semibold text-gray-800">{point.number}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{point.title}</h3>
                                    <p className="text-gray-600 mt-2">{point.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button
                            onClick={() => navigate('/contact')}
                            className='bg-primary-brand text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-sm w-fit'
                        >
                            Commencer
                        </button>
                    </motion.div>
                </div>

                {/* Image Column */}
                <motion.div variants={itemVariants} className="relative w-full h-[500px] hidden lg:block">
                    <img 
                        src={reason1} 
                        alt="Doctors collaborating" 
                        className="rounded-lg shadow-xl w-full h-full object-cover"
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="absolute -bottom-8 -left-12 bg-white p-4 rounded-lg shadow-lg border border-gray-100 w-60"
                    >
                        <p className="font-semibold text-gray-800">Docteurs disponibles</p>
                        <p className="text-sm text-gray-600 mb-2">Choisissez votre spécialiste</p>
                        <div className="flex -space-x-2 overflow-hidden">
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={assets.doc1} alt=""/>
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={assets.doc2} alt=""/>
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={assets.doc3} alt=""/>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default WhyUsSection;
