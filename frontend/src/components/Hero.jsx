import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = ({ title, imageUrl }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slower stagger for a more elegant effect
      },
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
            {title}
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-xl"
            variants={itemVariants}
          >
            Nous nous engageons à fournir des soins de santé exceptionnels et personnalisés. Notre équipe de professionnels dévoués est là pour vous accompagner à chaque étape.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <button
              className="bg-primary-brand text-white font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
              onClick={() => navigate('/doctors')}
            >
              Prendre un RDV
            </button>
            <button
              className="bg-transparent text-gray-700 font-medium py-3 px-8 rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors"
              onClick={() => navigate('/services')}
            >
              Nos Services
            </button>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <img
            src={imageUrl}
            alt="Doctor providing consultation"
            className="rounded-lg shadow-xl object-cover h-full max-h-[500px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
