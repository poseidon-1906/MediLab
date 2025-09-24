import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='max-w-2xl mx-auto'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Notice of Privacy Practices</h1>
                <p className='text-sm text-gray-500 mb-4'>Effective Date: September 24, 2025</p>
                
                <div className='text-gray-600 leading-relaxed'>
                    <p className='mb-4'>
                        THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
                    </p>
                    
                    <h2 className='text-xl font-bold text-gray-800 mt-6 mb-2'>I. Our Commitment to Your Privacy</h2>
                    <p className='mb-4'>
                        We are dedicated to maintaining the privacy of your protected health information (PHI). PHI is information about you, including demographic information, that may identify you and that relates to your past, present, or future physical or mental health or condition and related health care services.
                    </p>

                    <h2 className='text-xl font-bold text-gray-800 mt-6 mb-2'>II. How We May Use and Disclose Your PHI</h2>
                    <p className='mb-4'>
                        We may use and disclose your PHI for treatment, payment, and health care operations. For example, we may use your PHI to provide you with medical treatment or services. We may also disclose your PHI to another health care provider for treatment purposes.
                    </p>

                    {/* Add more sections as required by HIPAA guidelines */}

                    <h2 className='text-xl font-bold text-gray-800 mt-6 mb-2'>III. Your Rights Regarding Your PHI</h2>
                    <p className='mb-4'>
                        You have certain rights regarding the PHI we maintain about you. These rights include the right to request restrictions on certain uses and disclosures of your PHI, the right to receive confidential communications of your PHI, and the right to inspect and copy your PHI.
                    </p>

                    <h2 className='text-xl font-bold text-gray-800 mt-6 mb-2'>IV. Contact Information</h2>
                    <p>
                        If you have any questions about this Notice of Privacy Practices, please contact our Privacy Officer at [Contact Information].
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
