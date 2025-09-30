import React from 'react';
import { motion } from 'framer-motion';

const HospitalServices = () => {
  const servicesData = [
    {
      title: 'Consultations Générales',
      description: 'Accédez à des médecins généralistes pour des diagnostics, des traitements initiaux et des conseils de santé préventifs. Disponible sur rendez-vous ou sans rendez-vous pour les urgences mineures.',
      image: 'https://framerusercontent.com/images/rx5rJLf14IqbbtKiy7T4Rc.jpg', // Remplacez par une image appropriée
    },
    {
      title: 'Soins d\'Urgence',
      description: 'Notre service d\'urgence est ouvert 24h/24 et 7j/7, équipé pour gérer toutes les situations médicales critiques avec rapidité et expertise.',
      image: 'https://framerusercontent.com/images/qP267wFUx1rxHurQREec.png', // Remplacez par une image appropriée
    },
    {
      title: 'Chirurgie Spécialisée',
      description: 'Nos chirurgiens experts réalisent une large gamme d\'interventions, de la chirurgie mini-invasive aux procédures complexes, avec un suivi post-opératoire complet.',
      image: 'https://framerusercontent.com/images/kYGyXfOgUCuaxZx4.png', // Remplacez par une image appropriée
    },
    {
      title: 'Imagerie Médicale',
      description: 'Services d\'imagerie avancés incluant IRM, scanner, radiographie et échographie pour des diagnostics précis et rapides, essentiels à votre plan de traitement.',
      image: 'https://framerusercontent.com/images/jSDnHBSnIwlPqO9Fv8Hg0.png', // Remplacez par une image appropriée
    },
    {
      title: 'Pédiatrie & Maternité',
      description: 'Des soins spécialisés pour les enfants, de la naissance à l\'adolescence, et un accompagnement complet pour les futures mamans, avant, pendant et après l\'accouchement.',
      image: 'https://framerusercontent.com/images/bFElAcmzzKBFCFT3UsGTNWzU.jpg', // Remplacez par une image appropriée
    },
    {
      title: 'Laboratoire d\'Analyses',
      description: 'Un laboratoire moderne pour toutes vos analyses sanguines, urinaires et autres tests diagnostiques, garantissant des résultats fiables et rapides pour votre médecin.',
      image: 'https://framerusercontent.com/images/zGkqtb4KD1KSFXTHjuFrabLYk.png', // Remplacez par une image appropriée
    },
  ];

  // Variants pour les animations Framer Motion (inspiré de Sienna)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Délai entre l'apparition de chaque enfant
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring", // Animation type "spring" pour un effet doux
        stiffness: 100, // Rigidité de l'animation
        damping: 10, // Amortissement
      },
    },
  };

  return (
    <motion.div
      className="py-16 md:py-24 bg-background-light" // Utilisez votre couleur de fond claire de Tailwind
      initial="hidden"
      whileInView="visible" // Anime l'apparition quand la section entre dans le viewport
      viewport={{ once: true, amount: 0.2 }} // L'animation ne se joue qu'une fois, quand 20% de la section est visible
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"> {/* Conteneur pour limiter la largeur et centrer */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900" // Grande taille, gras, texte foncé
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }} // Animation titre distincte
        >
          Nos Services Médicaux
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-center mb-12 text-secondary-text max-w-3xl mx-auto" // Description plus grande et centrée
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }} // Animation description distincte
        >
          Découvrez l'étendue de nos soins et notre engagement envers votre santé et votre bien-être.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // Grille responsive
          variants={containerVariants} // Applique les variants du conteneur
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer" // Ombre plus prononcée, arrondis plus doux, effet hover
              variants={itemVariants} // Applique les variants pour chaque carte
              whileHover={{ scale: 1.03 }} // Léger agrandissement au survol
              whileTap={{ scale: 0.98 }} // Léger rétrécissement au clic/tap
            >
              <img src={service.image} alt={service.title} className="w-full h-56 object-cover" /> {/* Hauteur ajustée */}
              <div className="p-7"> {/* Padding légèrement augmenté */}
                <h3 className="text-2xl font-semibold mb-3 text-primary-brand">{service.title}</h3> {/* Titre de la carte plus grand et de couleur accent */}
                <p className="text-gray-700 leading-relaxed">{service.description}</p> {/* Texte de description stylisé */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HospitalServices;