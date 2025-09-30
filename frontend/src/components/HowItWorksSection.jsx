import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import usage1 from '../assets/images/usage1.jpg';
import usage2 from '../assets/images/usage2.jpg';
import usage from '../assets/images/usage.jpg';
import usage3 from '../assets/images/usage3.jpg';

const HowItWorksSection = () => {

    const steps = [
        {
            number: "01",
            title: "Partagez vos préférences",
            description: "Parlez-nous de vos besoins pour nous aider à créer un plan de soins personnalisé.",
            image: usage, // Placeholder image
        },
        {
            number: "02",
            title: "Solutions sur mesure",
            description: "Nous analysons vos besoins et élaborons des solutions conçues pour vos objectifs.",
            image: usage2, // Placeholder image
        },
        {
            number: "03",
            title: "Atteignez votre vision",
            description: "Profitez de résultats fluides alors que nous donnons vie à votre vision de la santé.",
            image: usage3, // Placeholder image
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
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section className="bg-gray-50 font-sans">
            <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-primary-brand rounded-full"></span>
                        <p className="font-semibold text-primary-brand">Comment ça marche</p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-3xl mx-auto">
                        Un processus étape par étape pour une expérience utilisateur fluide
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm flex flex-col text-left"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-primary-brand rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold">{step.number}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-5 flex-grow">{step.description}</p>
                            <img src={step.image} alt={step.title} className="rounded-md h-48 w-full object-cover" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
