import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import reason from '../assets/images/reason.jpg';

const Header = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    },
  };

  return (
    <section className="w-full font-sans">
      <motion.div
        className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-4 py-16 sm:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text Content */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Prenez RDV avec des médecins de confiance
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-xl"
            variants={itemVariants}
          >
            Parcourez notre liste de spécialistes, trouvez celui qui vous convient et planifiez votre rendez-vous en quelques clics.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <button
              className="bg-primary-brand text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-sm flex items-center gap-2"
              onClick={() => navigate('/doctors')}
            >
              Prendre un RDV <img className='w-3' src={assets.arrow_icon} alt="" />
            </button>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <img
            src={reason}
            alt="Médecin en consultation"
            className="w-full max-w-md lg:max-w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Header;