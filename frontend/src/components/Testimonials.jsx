import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { assets } from '../assets/assets';

const Testimonials = () => {

    const testimonials = [
        {
            name: "Émilie Dubois",
            avatar: assets.doc1, // Placeholder
            stars: 5,
            text: "Leur service était exceptionnel. Ils se sont assurés que j'étais à l'aise et informée à chaque étape du processus."
        },
        {
            name: "Michel Robert",
            avatar: assets.doc2, // Placeholder
            stars: 5,
            text: "Le soutien que j'ai reçu était excellent. Ils se souciaient vraiment de mes besoins et ont dépassé mes attentes."
        },
        {
            name: "Sophie Martin",
            avatar: assets.doc3, // Placeholder
            stars: 4,
            text: "Je me suis sentie valorisée et prise en charge. Leur équipe a tout mis en œuvre pour fournir un soutien et un service exceptionnels."
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, ease: 'easeOut' },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const StarRating = ({ count }) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'} />
            ))}
        </div>
    );

    return (
        <section className="bg-gray-50 font-sans">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-primary-brand rounded-full"></span>
                        <p className="font-semibold text-primary-brand">Témoignages</p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-3xl mx-auto">
                        Ce que nos clients satisfaits et heureux ont à dire
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-sm flex flex-col h-full"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover"/>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                                    <StarRating count={testimonial.stars} />
                                </div>
                            </div>
                            <p className="text-gray-600 flex-grow">{testimonial.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
