import React, { useState }  from "react";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";
import tools from '../assets/tools.png';



const MessageForm = () => {


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
    <section className="container relative bg-primary-brand rounded-4xl mx-auto px-2 sm:px-6 py-2 mt-2 md:mt-24 text-center">
     <div className="text-center py-6 px-4">
             <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in-down">
               Connectez-vous avec notre équipe
             </h1>
             <p className="text-gray-200 max-w-xl mx-auto animate-fade-in-up">
                Contactez-nous pour toute question ou préoccupation. Notre équipe est prête à vous aider avec des réponses rapides et des solutions efficaces.
             </p>
           </div>
     
           {/* Main Content Section (Contact Form & Details) */}
           <div className="container mx-auto px-2 sm:px-6 py-10 flex flex-col md:flex-row gap-8 md:gap-12">
             {/* Contact Form Section */}
             <div className="md:w-1/2 p-4 md:p-8 bg-gray-200 rounded-xl shadow-lg animate-slide-in-left">
               <h2 className="text-2xl font-bold text-black mb-6">Contactez-nous</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="flex flex-col sm:flex-row gap-4">
                   <input
                     type="text"
                     name="name"
                     placeholder="Entrez votre nom"
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full p-4 border border-gray-700 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-black"
                   />
                   <input
                     type="email"
                     name="email"
                     placeholder="Entrez votre email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full p-4 border border-gray-700 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-black"
                   />
                 </div>
                 <input
                   type="text"
                   name="subject"
                   placeholder="Sujet"
                   value={formData.subject}
                   onChange={handleChange}
                   className="w-full p-4 border border-gray-700 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-black"
                 />
                 <textarea
                   name="message"
                   placeholder="Soumettez votre message"
                   value={formData.message}
                   onChange={handleChange}
                   rows="6"
                   className="w-full p-4 border border-gray-700 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-black"
                 ></textarea>
                 <button
                   type="submit"
                   className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-brand transition-all duration-300 transform hover:scale-105 shadow-lg"
                 >
                   Envoyer le message
                 </button>
               </form>
             </div>
     
             {/* Contact Details Section */}
             <div className="md:w-1/2 p-4 md:p-8 animate-slide-in-right text-white">
               <h2 className="text-2xl font-bold mb-6">Détails du contact</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaMapMarkerAlt className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Adresse</strong>
                     <p className="text-sm text-gray-200">Douala Yaounde Cameroun</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaPhone className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Téléphone</strong>
                     <p className="text-sm text-gray-200">+237 123 456 789</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaClock className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Disponibilité</strong>
                     <p className="text-sm text-gray-200">Tous les jours de 9h à 17h</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaEnvelope className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Email</strong>
                     <p className="text-sm text-gray-200">contact@medilab.fr</p>
                   </div>
                 </div>
               </div>
               <div className="mt-10">
                 <h3 className="text-lg font-semibold mb-4">Réseaux sociaux :</h3>
                 <div className="flex gap-4">
                   <a href="#" aria-label="Facebook" className="p-3 border border-gray-400 text-gray-300 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                     <FaFacebook className="text-lg" />
                   </a>
                   <a href="#" aria-label="Twitter" className="p-3 border border-gray-400 text-gray-300 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                     <FaTwitter className="text-lg" />
                   </a>
                   <a href="#" aria-label="LinkedIn" className="p-3 border border-gray-400 text-gray-300 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                     <FaLinkedin className="text-lg" />
                   </a>
                   <a href="#" aria-label="Instagram" className="p-3 border border-gray-400 text-gray-300 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                     <FaInstagram className="text-lg" />
                   </a>
                 </div>
               </div>
             </div>
           </div>
      <div className="absolute bottom-0 right-0 z-0 hidden md:block">
        <img src={tools} alt="" className="w-[23vw] h-[auto]" />
      </div>
    </section>
  );
};

export default MessageForm;