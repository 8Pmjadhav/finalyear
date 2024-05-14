

import React from 'react'
import { Link } from 'react-router-dom';


const Error404 = () => {
  return (
    <div className="mt-20 flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="max-w-md p-8 bg-white dark:bg-black shadow-lg rounded-lg dark:border-2 border-white">
        <h2 className="text-3xl font-semibold mb-4 dark:text-white">404, Page Not Found</h2>
        <p className="text-gray-700 dark:text-gray-50 mb-4">Oops! Whatever you looking not found. Please try again later.</p>
        <div className='flex justify-between'>
        <Link to='/allposts'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Go Back
        </button></Link>
        <Link to='/contact'>
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Contact us
        </button></Link>
        </div>
      </div>
    </div>
  );
};

export  {Error404};



