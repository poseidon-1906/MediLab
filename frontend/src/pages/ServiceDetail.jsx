import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { serviceName } = useParams();

    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='text-center mb-8 animate-slide-up'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2 capitalize'>{serviceName.replace(/-/g, ' ')}</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Detailed information about our {serviceName.replace(/-/g, ' ')} service will be here.
                </p>
            </div>
        </div>
    );
};

export default ServiceDetail;
