import React from "react";
import { motion, useInView } from "framer-motion";
import doc from "../assets/images/doc1.jpg";
import { useNavigate } from 'react-router-dom'; // Importez le hook useNavigate

const Biography = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const navigate = useNavigate(); // Initialisez le hook de navigation

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  
  const handleNavigate = () => {
    navigate('/about');
  };

  return (
    <section ref={ref} className="container lg:border-2 lg:border-blue-100 rounded-4xl mx-auto px-6 py-12 mt-12 md:mt-16">
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="md:w-1/2">
          <motion.img
            src={doc}
            className="w-[700px] rounded-2xl shadow-lg object-cover h-auto"
            variants={textVariants}
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h2
            className="text-blue-600 font-bold mb-2 text-6xl lg:mb-14"
            variants={textVariants}
          >
            Biography
          </motion.h2>
          <motion.h3
            className="text-3xl font-bold mb-4"
            variants={textVariants}
          >
            Who We Are
          </motion.h3>
          <motion.p
            className="text-gray-600"
            variants={textVariants}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, non quis veritatis praesentium officiis voluptate, itaque libero quibusdam culpa deserunt omnis, numquam dignissimos. Perspiciatis numquam, quidem consequuntur recusandae possimus ab.
          </motion.p>
          <motion.button
            className="mt-6 bg-transparent text-blue-600 font-semibold py-2 px-6 rounded-full border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out cursor-pointer"
            variants={textVariants}
            onClick={handleNavigate} 
          >
            Know More
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Biography;