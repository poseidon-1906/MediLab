import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaUserShield, FaHeadset, FaLaptopMedical, FaFileMedicalAlt, FaNetworkWired } from 'react-icons/fa';

const FeaturesSection = () => {

    const features = [
        {
            icon: <FaCalendarCheck className="text-primary-brand text-3xl" />,
            title: "Prise de RDV facile",
            description: "Planifiez vos rendez-vous rapidement grâce à notre système de réservation simple et efficace.",
        },
        {
            icon: <FaUserShield className="text-primary-brand text-3xl" />,
            title: "Plans personnalisés",
            description: "Recevez des plans de soins sur mesure conçus pour répondre à vos besoins de santé uniques.",
        },
        {
            icon: <FaHeadset className="text-primary-brand text-3xl" />,
            title: "Consultations 24/7",
            description: "Accédez à des conseils médicaux experts à tout moment grâce à des visites virtuelles sécurisées.",
        },
        {
            icon: <FaLaptopMedical className="text-primary-brand text-3xl" />,
            title: "Technologie médicale",
            description: "Profitez de soins de santé modernes avec des outils innovants et des équipements de pointe.",
        },
        {
            icon: <FaFileMedicalAlt className="text-primary-brand text-3xl" />,
            title: "Dossiers patients",
            description: "Restez organisé avec un accès sécurisé et facile à vos dossiers médicaux en cas de besoin.",
        },
        {
            icon: <FaNetworkWired className="text-primary-brand text-3xl" />,
            title: "Réseau de soins",
            description: "Connectez-vous avec les meilleurs spécialistes pour garantir une couverture santé complète.",
        },
    ];

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
        <section className="bg-white font-sans">
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
                        <p className="font-semibold text-primary-brand">Fonctionnalités</p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Des solutions innovantes pour améliorer le service médical
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="bg-gray-50 p-8 rounded-lg border border-gray-200/80 text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5 shadow-md">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
