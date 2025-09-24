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
            question: 'How do I book an appointment?',
            answer: 'You can book an appointment by navigating to the \'All Doctors\' page, selecting a doctor, and then choosing an available time slot on their profile.',
        },
        {
            question: 'Can I cancel my appointment?',
            answer: 'Yes, you can cancel your appointment from the \'My Appointments\' page. Please note any cancellation policies that may apply.',
        },
        {
            question: 'Is my personal information secure?',
            answer: 'We take your privacy very seriously. All your data is encrypted and stored securely. We are committed to being HIPAA compliant.',
        },
    ];

    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='text-center mb-8 animate-slide-up'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Frequently Asked Questions</h1>
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
