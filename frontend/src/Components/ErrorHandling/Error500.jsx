import React from 'react'



const Error500 = () => {
  return (
    <div className="mt-20 flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="max-w-md p-8 bg-white dark:bg-black shadow-lg rounded-lg border border-gray-600">
        <h2 className="text-3xl font-semibold mb-4 dark:text-white">500, Internal Server Error</h2>
        <p className="text-gray-700 dark:text-gray-50 mb-4">Oops! Something went wrong on our server. Please try again later.</p>
        <div className='flex justify-between'>
        <a href='https://www.linkedin.com/in/prathamesh-jadhav-b0398a251/'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          LinkedIn
        </button></a>
        <a href='https://github.com/8Pmjadhav'>
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Github
        </button></a>
        </div>
      </div>
    </div>
  );
};

export  {Error500};

