import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaLightbulb, FaHandshake } from 'react-icons/fa';

const ReputationSection = () => {

    const stats = [
        {
            icon: <FaUsers className="text-primary-brand text-3xl" />,
            title: "Reconnu par des milliers",
            description: "Plus de 10 000 patients satisfaits qui ont bénéficié de soins de qualité.",
        },
        {
            icon: <FaAward className="text-primary-brand text-3xl" />,
            title: "Service primé",
            description: "Reconnu pour l'excellence en matière de soins de santé avec de multiples récompenses.",
        },
        {
            icon: <FaLightbulb className="text-primary-brand text-3xl" />,
            title: "Techniques innovantes",
            description: "Pionnier dans les nouvelles solutions et technologies médicales pour de meilleurs résultats.",
        },
        {
            icon: <FaHandshake className="text-primary-brand text-3xl" />,
            title: "Centré sur la communauté",
            description: "Fier de servir notre communauté locale avec un engagement pour le bien-être de tous.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, ease: 'easeOut' },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <section className="bg-white font-sans">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 border border-gray-200/80 rounded-full px-4 py-2 mb-4 shadow-sm">
                        <span className="font-semibold text-gray-700">Depuis 2017</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Une réputation d'excellence
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                        Fournir des soins de santé fiables et de qualité avec une réputation d'excellence depuis 2017.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="bg-gray-50 p-8 rounded-lg text-left flex gap-5 items-start border border-gray-100"
                        >
                            <div className="flex-shrink-0">
                                {stat.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
                                <p className="text-gray-600 text-sm">{stat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ReputationSection;
