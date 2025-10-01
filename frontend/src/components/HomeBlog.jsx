import React from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/about.jpg';
import health from '../assets/health.webp';
import stress from '../assets/stress.webp';

const HomeBlog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'L\'importance des contrôles réguliers',
            excerpt: 'Les contrôles réguliers peuvent aider à détecter les problèmes de santé potentiels avant qu\'ils ne deviennent un problème. Découvrez pourquoi ils sont si importants.',
            author: 'Dr Jean Dupont',
            date: '24 septembre 2025',
            image: blog1,
        },
        {
            id: 2,
            title: '5 conseils pour un cœur en bonne santé',
            excerpt: 'Un cœur en bonne santé est crucial pour la santé globale. Voici 5 conseils pour garder votre cœur en pleine forme.',
            author: 'Dr Jeanne Smith',
            date: '20 septembre 2025',
            image: health,
        },
        {
            id: 3,
            title: 'Gérer le stress pour une vie meilleure',
            excerpt: 'Le stress peut avoir un impact majeur sur votre santé. Découvrez des stratégies efficaces pour gérer le stress.',
            author: 'Dr Émilie Blanc',
            date: '15 septembre 2025',
            image: stress,
        },
    ];

    return (
        <div className='container mx-auto px-4 py-8 md:py-12'>
            <div className='text-center mb-8'>
                <h2 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>De Notre Blog</h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Restez à jour avec les dernières nouvelles et conseils sur la santé de nos experts.
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
                                Lire la suite
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeBlog;
