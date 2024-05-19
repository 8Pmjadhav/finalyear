import { BarChart, Wallet, Newspaper, BellRing, Paperclip, SunMedium, Moon, Wrench, Contact } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { logout } from '../../hooks/user';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';



export default function Sidebar({ dispatch }) {
  const location = useLocation();
  const { username, avatar } = useSelector(selectUser);
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    if ( isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);


  return (

    <aside className={`flex h-screen w-52 flex-col overflow-y-auto border-r dark:border-r-gray-600  px-5 py-8 hidden sm:hidden md:block fixed top-10`}>
      <Link to={`/profile/${username}`}>
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={avatar}
          alt="Dan_Abromov"
        />
        <span className={`${location.pathname === `/profile/${username}` && ' text-blue-600 underline'} font-bold text-lg`}>  @{username}</span>
      </Link>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900 dark:text-gray-200">Posts</label>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                  ${location.pathname === '/following_post' && 'bg-blue-600'}`}              to="/following_post"
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Following Posts</span>
            </Link>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
              ${location.pathname === '/getposts/0' && 'bg-blue-600'}`}
              to="/getposts/0"
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Get Posts</span>
            </Link>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900 dark:text-gray-200">Posts</label>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                  ${location.pathname === '/posts/createPost' && 'bg-blue-600'}`} to="/posts/createPost"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Create Post</span>
            </Link>
            <a
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
              ${location.pathname === '/allposts' && 'bg-blue-600'}`} href="#"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </a>
            <a
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                  ${location.pathname === '/allposts' && 'bg-blue-600'}`} href="#"
            >
              <Paperclip className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Checklists</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900 dark:text-gray-200">
              Customization
            </label>

            <button className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 "

              onClick={() => {
                setIsDarkMode(prev => !prev);
              }}
            >{isDarkMode ? <SunMedium className="h-5 w-5" color='white' /> : <Moon className="h-5 w-5" />}
              <span className="mx-2 text-sm font-medium">Themes</span></button>
            <a
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                  ${location.pathname === '/allposts' && 'bg-blue-600'}`} href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                  ${location.pathname === '/contact' && 'bg-blue-600'}`} to="/contact"
            >
              <Contact className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Contact</span>
            </Link>
            <button
              type="button"
              onClick={() => logout(dispatch)}
              className="w-3/4 rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Link to='login'>Log Out</Link>
            </button>
          </div>
        </nav>
      </div>
    </aside>


  )
}