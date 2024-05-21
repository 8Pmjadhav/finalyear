import React from 'react';

export default function Welcome() {
  return (
    <div className="flex  justify-center lg:h-200px  dark:bg-black dark:text-white">
      <div className="p-8  rounded-lg shadow-md dark:shadow-white border border-gray-600 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to pj Tweets</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          Introducing <span className="font-semibold">pj Tweets</span>, a dynamic social media platform where you can <span className="italic">share like a pro</span>. As part of my B.Tech final year project, this website allows users to post, reply, like, and follow other users, while also viewing posts seamlessly. Built with the robust technologies of Postgres, Prisma, React, JWT, Express, Node, and Tailwind CSS, <span className="font-semibold">pj Tweets</span> ensures a reliable and engaging user experience. Join us and connect with the community today!
        </p>
        <div className='flex space-x-5 justify-center'>
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
}
