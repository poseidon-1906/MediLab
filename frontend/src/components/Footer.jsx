import React from 'react';
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from 'framer-motion';

const Footer = () => {

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gray-900 text-gray-300 font-sans"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* About Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-primary-brand font-bold text-2xl">MediLab</span>
              <span className="text-white text-xl font-light">Hospital</span>
            </div>
            <p className="text-gray-400">
              Fournir des soins de santé de la plus haute qualité avec compassion et expertise.
            </p>
          </div>
         
          {/* Quick Links Section */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-brand transition-colors">Accueil</Link></li>
              <li><Link to="/doctors" className="hover:text-primary-brand transition-colors">Docteurs</Link></li>
              <li><Link to="/services" className="hover:text-primary-brand transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-primary-brand transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="hover:text-primary-brand transition-colors">Contact</Link></li>
            </ul>
          </div>
        
          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Contactez-nous</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-brand mt-1 flex-shrink-0" />
                <span>123 Rue de la Santé, 75000 Paris, France</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-primary-brand" />
                <a href="tel:+33123456789" className="hover:text-primary-brand transition-colors">+33 1 23 45 67 89</a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-brand" />
                <a href="mailto:info@medilab.fr" className="hover:text-primary-brand transition-colors">info@medilab.fr</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-gray-700 my-8"/>

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Medilab Hospital. Tous droits réservés.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-primary-brand transition-colors"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-primary-brand transition-colors"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-primary-brand transition-colors"><FaLinkedin size={20} /></a>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;