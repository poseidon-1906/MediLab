import React from 'react';
import { motion } from 'framer-motion';

const HospitalHighlights = () => {
  const highlightsData = [
    {
      title: 'Équipe Médicale Experte',
      description: 'Nos professionnels de la santé sont hautement qualifiés et dédiés, offrant des soins basés sur les dernières avancées médicales.',
      // Remplacez par une icône SVG pertinente de votre dossier public/assets/icons ou une icône d'une librairie
      icon: '/assets/icons/expert-team.svg', 
      // Exemple pour Heroicons, si vous les avez téléchargés:
      // icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>'
    },
    {
      title: 'Technologies de Pointe',
      description: 'Nous investissons continuellement dans des équipements médicaux de dernière génération pour des diagnostics précis et des traitements efficaces.',
      // icon: 'https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg',
      icon: '/assets/icons/tech.svg',
    },
    {
      title: 'Approche Centrée Patient',
      description: 'Votre bien-être est notre priorité. Nous vous offrons un accompagnement personnalisé et une écoute attentive à chaque étape de votre parcours de soins.',
      // icon: 'https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg',
      icon: '/assets/icons/patient-care.svg',
    },
    {
      title: 'Environnement de Guérison',
      description: 'Nos installations sont conçues pour favoriser la convalescence, offrant un cadre serein et confortable propice à la récupération.',
      icon: '/assets/icons/healing-env.svg',
    },
    {
      title: 'Recherche & Innovation',
      description: 'Engagés dans la recherche, nous explorons de nouvelles méthodes pour améliorer constamment la qualité de nos traitements et la prise en charge des patients.',
      icon: '/assets/icons/innovation.svg',
    },
    {
      title: 'Accès Facile & Rapide',
      description: 'Situé au cœur de la ville, notre hôpital est facilement accessible, et nous nous efforçons de réduire les temps d\'attente pour les consultations.',
      icon: '/assets/icons/access.svg',
    },
  ];

  // Variants Framer Motion pour l'apparition des éléments
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Délai entre l'apparition de chaque point fort
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

  // Icônes temporaires (à remplacer par de vrais SVGs ou une librairie)
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L17.25 15l.394 1.183a2.25 2.25 0 001.423 1.423L20.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );

  return (
    <motion.div
      className="py-16 md:py-28 bg-white" // Garde un fond blanc comme Sienna
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Anime quand 30% de la section est visible
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-16" // Marge inférieure augmentée pour plus d'espace
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
          variants={containerVariants}
        >
          {highlightsData.map((highlight, index) => (
            <motion.div
              key={index}
              className="text-left" // Alignement du texte à gauche pour un look plus moderne
              variants={itemVariants}
            >
              <div className="flex justify-start mb-4"> {/* Aligné à gauche */}
                <div className="w-16 h-16 bg-primary-brand rounded-full flex items-center justify-center shadow-md"> {/* Utilisation de la couleur accent et ombre subtile */}
                  {/* Option 1: Icône SVG en tant que fichier (préférable) */}
                  {highlight.icon.startsWith('/') ? (
                    <img src={highlight.icon} alt={highlight.title} className="w-8 h-8 text-white" />
                  ) : (
                    // Option 2: Icône SVG intégrée directement dans le JSON si complexe
                    <div dangerouslySetInnerHTML={{ __html: highlight.icon }} />
                  )}
                  {/* Option 3: Icône par défaut si icon n'est pas trouvé (pour les exemples) */}
                  {!highlight.icon && defaultIcon}
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