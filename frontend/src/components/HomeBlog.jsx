import React from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/about.jpg';
import health from '../assets/health.webp';
import stress from '../assets/stress.webp';

const HomeBlog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'The Importance of Regular Check-ups',
            excerpt: 'Regular check-ups can help find potential health issues before they become a problem. Learn why they are so important.',
            author: 'Dr. John Doe',
            date: 'September 24, 2025',
            image: blog1,
        },
        {
            id: 2,
            title: '5 Tips for a Healthy Heart',
            excerpt: 'A healthy heart is crucial for overall health. Here are 5 tips to keep your heart in top shape.',
            author: 'Dr. Jane Smith',
            date: 'September 20, 2025',
            image: health,
        },
        {
            id: 3,
            title: 'Managing Stress for a Better Life',
            excerpt: 'Stress can have a major impact on your health. Discover effective strategies for managing stress.',
            author: 'Dr. Emily White',
            date: 'September 15, 2025',
            image: stress,
        },
    ];

    return (
        <div className='container mx-auto px-4 py-8 md:py-12'>
            <div className='text-center mb-8'>
                <h2 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>From Our Blog</h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Stay up-to-date with the latest health news and tips from our experts.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {blogPosts.map((post) => (
                    <div key={post.id} className='bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl'>
                        <img className='w-full h-60 object-cover' src={post.image} alt={post.title} />
                        <div className='p-6'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>{post.title}</h3>
                            <p className='text-gray-600 mb-4'>{post.excerpt}</p>
                            <Link to={`/blog/${post.id}`} className='font-semibold text-blue-600 hover:underline'>
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeBlog;
