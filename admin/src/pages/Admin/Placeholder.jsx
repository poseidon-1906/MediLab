import React from 'react';

const Placeholder = ({ title }) => {
  return (
    <div className='p-8 w-full flex flex-col items-center justify-center text-center'>
      <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>{title} Management</h1>
      <p className='text-gray-500 dark:text-gray-400 mt-4 max-w-md'>
        This module is currently a placeholder. The necessary backend APIs and database models for managing {title.toLowerCase()} are not yet implemented.
      </p>
      <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200">
        <p className="font-bold">Backend Requirement:</p>
        <p>To make this page functional, CRUD (Create, Read, Update, Delete) APIs for '{title}' are needed.</p>
      </div>
    </div>
  );
};

export default Placeholder;
