import React from "react";
import { motion } from "framer-motion";
import maindoc from "../assets/images/maindoc.jpg";
import doc from "../assets/images/doc1.jpg";
const Hero = ({ title, imageUrl }) => {
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
        ease: ["easeIn", "easeOut"],
        stiffness: 100,
        duration: 0.5, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.section
        className="container mx-auto px-6 mt-8 md:mt-5 py-12 hero-bg rounded-[40px] md:rounded-[80px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            {/* Titre animé */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            
            <motion.p
              className="mt-4 text-gray-600 max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, in adipisci recusandae, eos architecto vel rem magnam accusantium ea aperiam illo commodi quo eaque facere minima! Recusandae molestias iste dolore?
            </motion.p>

            
            <motion.button
              className="mt-8 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition"
              variants={itemVariants}
            >
              Book An Appointment
            </motion.button>
          </div>

          
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-end"
            variants={itemVariants}
          >
            <motion.img
              src={imageUrl}
              alt="main doctor"
              className="rounded-2xl shadow-lg object-fit object-center"
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Hero;