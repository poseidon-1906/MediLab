import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaHandshake, FaStethoscope, FaFlask } from 'react-icons/fa'; 
// Exemple d'autres icônes pour d'autres avantages
// import { IoShieldCheckmark, IoMedical } from 'react-icons/io5'; 


import image2 from '../assets/images/about1.jpg'; // Remplacez par votre chemin réel si téléchargé
import image1 from '../assets/images/about2.jpg'; // Remplacez par votre chemin réel si téléchargé


const OurMission = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 }); // Déclenche à 40% de visibilité
  const navigate = useNavigate();

  const missionHighlights = [
    {
      title: 'Soins compatissants',
      description: 'Notre mission est de fournir des soins de santé personnalisés et empathiques pour chaque individu.',
      icon: FaHeartbeat, // Utilisez le composant icône de React Icons
    },
    {
      title: 'Excellence du service',
      description: 'Nous nous efforçons de fournir des solutions médicales de haute qualité, fiables et innovantes.',
      icon: FaHandshake, // Utilisez le composant icône de React Icons
    },
    {
      title: 'Diagnostic précis',
      description: 'Des technologies avancées et des experts dédiés pour des diagnostics fiables et rapides.',
      icon: FaStethoscope, // Nouvelle icône pour un nouvel avantage
    },
    {
      title: 'Innovation constante',
      description: 'Nous restons à la pointe de la recherche médicale pour offrir les traitements les plus modernes.',
      icon: FaFlask, // Nouvelle icône pour un nouvel avantage
    },
  ];

  // Variants pour les animations d'apparition (inchangés)
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
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageWrapperVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }, 
  };

  return (
    <section ref={ref} className="py-16 md:py-28 bg-white overflow-hidden">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 md:gap-16">
          {/* Section Gauche: Images en Grille */}
          <motion.div
            className="grid grid-cols-2 gap-4 md:gap-6 lg:w-1/2"
            variants={imageWrapperVariants}
          >
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <img
                src={image1} // Utilise l'image importée
                alt="Équipe médicale en action"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg mt-8 md:mt-12">
              <img
                src={image2} // Utilise l'image importée
                alt="Vue de l'hôpital ou équipement"
                className="w-full h-full object-cover object-center "
              />
            </div>
          </motion.div>

          {/* Section Droite: Texte et Avantages */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Tag "Our Mission" */}
            <motion.div
              className="flex items-center gap-2 mb-4"
              variants={itemVariants}
            >
              <div className="w-2.5 h-2.5 bg-primary-brand rounded-full"></div>
              <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Notre Mission
              </p>
            </motion.div>

            {/* Titre principal */}
            <motion.h3
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Transformer des vies avec des solutions médicales innovantes
            </motion.h3>

            {/* Liste des points "About" */}
            <div className="space-y-8 mt-6 w-full max-w-md lg:max-w-none">
              {missionHighlights.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    {/* Rend l'icône React Icons ici */}
                    {point.icon && <point.icon className="w-6 h-6 text-primary-brand" />}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 text-gray-900">{point.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bouton "Book a call" */}
            <motion.button
              className="mt-12 bg-primary-brand text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
              variants={buttonVariants}
              onClick={() => navigate('/contact')}
            >
              Prendre Rendez-vous
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurMission;