import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='border-b border-gray-200 py-4'>
            <button
                className='w-full flex justify-between items-center text-left font-semibold text-gray-800'
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span>{isOpen ? '-' : '+'}
</span>
            </button>
            {isOpen && <div className='mt-2 text-gray-600'>{answer}</div>}
        </div>
    );
};

const Faq = () => {
    const faqs = [
        {
            question: 'Comment puis-je prendre un rendez-vous ?',
            answer: 'Vous pouvez prendre un rendez-vous en accédant à la page \'Médecins\', en sélectionnant un médecin, puis en choisissant un créneau horaire disponible sur son profil.',
        },
        {
            question: 'Puis-je annuler mon rendez-vous ?',
            answer: 'Oui, vous pouvez annuler votre rendez-vous depuis la page \'Mes Rendez-vous\'. Veuillez noter que des politiques d\'annulation peuvent s\'appliquer.',
        },
        {
            question: 'Mes informations personnelles sont-elles sécurisées ?',
            answer: 'Nous prenons votre vie privée très au sérieux. Toutes vos données sont cryptées et stockées en toute sécurité. Nous nous engageons à être conformes à la norme HIPAA.',
        },
    ];

    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='text-center mb-8 animate-slide-up'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Questions fréquemment posées</h1>
            </div>
            <div className='max-w-2xl mx-auto'>
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
};

export default Faq;
