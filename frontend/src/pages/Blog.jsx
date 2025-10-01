import React from 'react';
import { Link } from 'react-router-dom';


const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'L\'importance des contrôles réguliers',
            excerpt: 'Les contrôles réguliers peuvent aider à détecter les problèmes de santé potentiels avant qu\'ils ne deviennent un problème. Découvrez pourquoi ils sont si importants.',
            author: 'Dr Jean Dupont',
            date: '24 septembre 2025',
        },
        {
            id: 2,
            title: '5 conseils pour un cœur en bonne santé',
            excerpt: 'Un cœur en bonne santé est crucial pour la santé globale. Voici 5 conseils pour garder votre cœur en pleine forme.',
            author: 'Dr Jeanne Smith',
            date: '20 septembre 2025',
        },
    ];

    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='text-center mb-8 animate-slide-up'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>Notre Blog</h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Restez à jour avec les dernières nouvelles et conseils sur la santé de nos experts.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {blogPosts.map((post) => (
                    <Link to={`/blog/${post.id}`} key={post.id}>
                        <div className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6'>
                            
                            <h3 className='text-xl font-bold text-gray-800'>{post.title}</h3>
                            <p className='text-gray-600 mt-2'>{post.excerpt}</p>
                            <div className='flex justify-between items-center mt-4 text-sm text-gray-500'>
                                <span>{post.author}</span>
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
