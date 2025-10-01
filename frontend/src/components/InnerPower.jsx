import React from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUserMd, FaLaptopMedical, FaHandHoldingHeart, FaLeaf, FaMicroscope, FaMapMarkerAlt } from 'react-icons/fa';


const HospitalHighlights = () => {
  const ref = React.useRef(null); // Ajout du ref pour useInView
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Déclenche à 30% de visibilité

  const highlightsData = [
    {
      title: 'Équipe Médicale Experte',
      description: 'Nos professionnels de la santé sont hautement qualifiés et dédiés, offrant des soins basés sur les dernières avancées médicales.',
      icon: FaUserMd, // Composant icône de React Icons
    },
    {
      title: 'Technologies de Pointe',
      description: 'Nous investissons continuellement dans des équipements médicaux de dernière génération pour des diagnostics précis et des traitements efficaces.',
      icon: FaLaptopMedical, // Composant icône de React Icons
    },
    {
      title: 'Approche Centrée Patient',
      description: 'Votre bien-être est notre priorité. Nous vous offrons un accompagnement personnalisé et une écoute attentive à chaque étape de votre parcours de soins.',
      icon: FaHandHoldingHeart, // Composant icône de React Icons
    },
    {
      title: 'Environnement de Guérison',
      description: 'Nos installations sont conçues pour favoriser la convalescence, offrant un cadre serein et confortable propice à la récupération.',
      icon: FaLeaf, // Composant icône de React Icons (peut représenter la nature/bien-être)
    },
    {
      title: 'Recherche & Innovation',
      description: 'Engagés dans la recherche, nous explorons de nouvelles méthodes pour améliorer constamment la qualité de nos traitements et la prise en charge des patients.',
      icon: FaMicroscope, // Composant icône de React Icons
    },
    {
      title: 'Accès Facile & Rapide',
      description: 'Situé au cœur de la ville, notre hôpital est facilement accessible, et nous nous efforçons de réduire les temps d\'attente pour les consultations.',
      icon: FaMapMarkerAlt, // Composant icône de React Icons
    },
  ];

  // Variants Framer Motion pour l'apparition des éléments (inchangés)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref} // Associe le ref à la motion.div pour useInView
      className="py-16 md:py-28 bg-white" // Garde un fond blanc comme Sienna
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Utilisez animate conditionnellement
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-16" // Marge inférieure augmentée pour plus d'espace
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }} // Anime le titre aussi
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir Notre Hôpital ?
          </h2>
          <p className="text-lg md:text-xl text-secondary-text max-w-3xl mx-auto">
            Découvrez les piliers de notre engagement envers votre santé et votre bien-être.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16" // Espacement ajusté, 3 colonnes sur desktop
          variants={containerVariants} // Applique les variants du conteneur ici
        >
          {highlightsData.map((highlight, index) => (
            <motion.div
              key={index}
              className="text-left" // Alignement du texte à gauche pour un look plus moderne
              variants={itemVariants}
            >
              <div className="flex justify-start mb-4"> {/* Aligné à gauche */}
                <div className="w-16 h-16 bg-primary-brand rounded-full flex items-center justify-center shadow-md"> {/* Utilisation de la couleur accent et ombre subtile */}
                  {/* Rendu de l'icône React Icons */}
                  {highlight.icon && <highlight.icon className="w-8 h-8 text-white" />}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">{highlight.title}</h3> {/* Titre de la carte plus grand et gras */}
              <p className="text-gray-700 leading-relaxed">{highlight.description}</p> {/* Description stylisée */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HospitalHighlights;