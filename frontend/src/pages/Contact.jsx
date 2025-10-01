import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";
import contact from "../assets/images/contact.avif";
import Faqs from "../components/Faqs"; // Assurez-vous que ce composant est bien Faqs

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    toast.success("Message envoyé avec succès !");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-2 animate-fade-in-down">
          Connectez-vous avec notre équipe
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto animate-fade-in-up">
          Contactez-nous pour toute question ou préoccupation. Notre équipe est prête à vous aider avec des réponses rapides et des solutions efficaces.
        </p>
      </div>

      {/* Main Content Section (Contact Form & Details) */}
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-12">
        {/* Contact Form Section */}
        <div className="md:w-1/2 p-8 bg-gray-50 rounded-xl shadow-lg animate-slide-in-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <input
                type="text"
                name="name"
                placeholder="Entrez votre nom"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <textarea
              name="message"
              placeholder="Soumettez votre message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div className="md:w-1/2 p-8 bg-gray-50 rounded-xl shadow-lg animate-slide-in-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Détails du contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 text-gray-700">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <strong className="block">Adresse</strong>
                <p className="text-sm">Douala Yaounde Cameroun</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <strong className="block">Téléphone</strong>
                <p className="text-sm">+237 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div>
                <strong className="block">Disponibilité</strong>
                <p className="text-sm">Tous les jours de 9h à 17h</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <strong className="block">Email</strong>
                <p className="text-sm">contact@medilab.fr</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Réseaux sociaux :</h3>
            <div className="flex gap-4 text-gray-700">
              <a href="#" aria-label="Facebook" className="p-3 border rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" aria-label="Twitter" className="p-3 border rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-3 border rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="#" aria-label="Instagram" className="p-3 border rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Our Locations Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Nos emplacements</h2>
        </div>
        <div className="rounded-xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937592!2d2.292292615674238!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1622548923892!5m2!1sen!2sfr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;