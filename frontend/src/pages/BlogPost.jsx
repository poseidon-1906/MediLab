import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { postId } = useParams();

    // In a real application, you would fetch the blog post data based on the postId
    const post = {
        id: postId,
        title: 'The Importance of Regular Check-ups',
        content: `Regular check-ups are one of the most important things you can do for your health. They can help find potential health issues before they become a problem. When you see your doctor regularly, they can detect and treat health problems early, which can lead to better outcomes. Regular check-ups are one of the most important things you can do for your health. They can help find potential health issues before they become a problem. When you see your doctor regularly, they can detect and treat health problems early, which can lead to better outcomes.\n\nDuring a check-up, your doctor will likely perform a physical exam, ask you about your medical history and lifestyle, and recommend any necessary screenings or tests. This is also a good time to ask your doctor any questions you may have about your health.\n\nDon't wait until you're sick to see a doctor. Schedule a check-up today and take control of your health.`,
        author: 'Dr. John Doe',
        date: 'September 24, 2025',
    };

    return (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            <div className='max-w-2xl mx-auto'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-blue-600 mb-2'>{post.title}</h1>
                <div className='flex justify-between items-center mt-4 text-sm text-gray-500'>
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                </div>
                <div className='mt-8 text-gray-600 leading-relaxed whitespace-pre-line'>
                    {post.content}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
