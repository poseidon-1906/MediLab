import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Biography from '../components/Biography'
import MessageForm from '../components/MessageForm'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // Time delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
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
      <motion.div variants={itemVariants}><Biography /></motion.div>
      <motion.div variants={itemVariants}><SpecialityMenu /></motion.div>
      <motion.div variants={itemVariants}><TopDoctors /></motion.div>
      <motion.div variants={itemVariants}><Banner /></motion.div>
      <motion.div variants={itemVariants}><MessageForm /></motion.div>
    </motion.div>
  )
}

export default Home