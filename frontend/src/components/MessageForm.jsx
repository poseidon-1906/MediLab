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
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <section className="container relative bg-blue-600 rounded-4xl mx-auto px-2 sm:px-6 py-2 mt-2 md:mt-24 text-center">
     <div className="text-center py-6 px-4">
             <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in-down">
               Connect with Our Team
             </h1>
             <p className="text-gray-200 max-w-xl mx-auto animate-fade-in-up">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputates tellus luctus nec ullamcorper mattis,
               viverra leo doha.
             </p>
           </div>
     
           {/* Main Content Section (Contact Form & Details) */}
           <div className="container mx-auto px-2 sm:px-6 py-10 flex flex-col md:flex-row gap-8 md:gap-12">
             {/* Contact Form Section */}
             <div className="md:w-1/2 p-4 md:p-8 bg-black rounded-xl shadow-lg animate-slide-in-left">
               <h2 className="text-2xl font-bold text-white mb-6">Get in Touch with Us</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="flex flex-col sm:flex-row gap-4">
                   <input
                     type="text"
                     name="name"
                     placeholder="Input your name"
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full p-4 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
                   />
                   <input
                     type="email"
                     name="email"
                     placeholder="Input your email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full p-4 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
                   />
                 </div>
                 <input
                   type="text"
                   name="subject"
                   placeholder="Subject"
                   value={formData.subject}
                   onChange={handleChange}
                   className="w-full p-4 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
                 />
                 <textarea
                   name="message"
                   placeholder="Submit your message request"
                   value={formData.message}
                   onChange={handleChange}
                   rows="6"
                   className="w-full p-4 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
                 ></textarea>
                 <button
                   type="submit"
                   className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                 >
                   Send message
                 </button>
               </form>
             </div>
     
             {/* Contact Details Section */}
             <div className="md:w-1/2 p-4 md:p-8 animate-slide-in-right text-white">
               <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaMapMarkerAlt className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Address</strong>
                     <p className="text-sm text-gray-200">Jl. Raya Kuta No. 121</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaPhone className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Mobile</strong>
                     <p className="text-sm text-gray-200">(+62)-822-4545-2882</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaClock className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Availability</strong>
                     <p className="text-sm text-gray-200">Daily 09 - 05 PM</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                     <FaEnvelope className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <strong className="block">Email</strong>
                     <p className="text-sm text-gray-200">admin@support.com</p>
                   </div>
                 </div>
               </div>
               <div className="mt-10">
                 <h3 className="text-lg font-semibold mb-4">Social Media:</h3>
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