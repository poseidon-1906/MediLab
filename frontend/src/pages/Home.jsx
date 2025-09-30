import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import AboutSection from '../components/AboutSection';
import MessageForm from '../components/MessageForm';
import HomeBlog from '../components/HomeBlog';
import FeaturesSection from '../components/FeaturesSection';
import WhyUsSection from '../components/WhyUsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ReputationSection from '../components/ReputationSection';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adjusted for a smoother feel
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7, ease: 'easeOut'
    },
  },
};

const Home = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}><Header /></motion.div>
      <motion.div variants={itemVariants}><FeaturesSection /></motion.div>
      <motion.div variants={itemVariants}><HowItWorksSection /></motion.div>
      <motion.div variants={itemVariants}><SpecialityMenu /></motion.div>
      <motion.div variants={itemVariants}><AboutSection /></motion.div>
      <motion.div variants={itemVariants}><WhyUsSection /></motion.div>
      <motion.div variants={itemVariants}><TopDoctors /></motion.div>
      <motion.div variants={itemVariants}><ReputationSection /></motion.div>
      <motion.div variants={itemVariants}><Testimonials /></motion.div>
      <motion.div variants={itemVariants}><Banner /></motion.div>
      <motion.div variants={itemVariants}><HomeBlog /></motion.div>
      <motion.div variants={itemVariants}><MessageForm /></motion.div>
    </motion.div>
  )
}

export default Home;