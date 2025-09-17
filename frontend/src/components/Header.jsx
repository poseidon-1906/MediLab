import React from 'react'
import { assets } from '../assets/assets'
import AnimatedText from './AnimatedText'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <AnimatedText text="Book Appointment With Trusted Doctors" className='text-3xl md:text-4xl lg:text-5xl !text-left' />
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 1 }} 
                    className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </motion.div>
                <motion.a 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 1.2 }} 
                    href='#speciality' 
                    className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </motion.a>
            </div>

            {/* --------- Header Right --------- */}
            <motion.div 
                initial={{ x: 100, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 1, delay: 0.5 }} 
                className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
            </motion.div>
        </div>
    )
}

export default Header