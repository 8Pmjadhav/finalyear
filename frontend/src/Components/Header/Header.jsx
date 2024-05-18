'use client'

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench, Contact, Moon, SunMedium } from 'lucide-react'

import React, { useState,useEffect } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { logout } from '../../hooks/user';


export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const { username, avatar } = user;
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {

    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const dispatch = useDispatch();


  //console.log(accessToken);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className=" w-full bg-cover border-b-2 border-s-slate-500 dark:text-white fixed top-0 left-0 right-0 z-50 "
      style={{
        backgroundColor: '#0C359E'
      }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <img
            className='h-10'
            src='/icons/pj-tweets-high-resolution-logo-transparent.png' />

        </div>

        {user ? (<>

          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer dark:text-white" />
          </div>
          {isMenuOpen && (
            <div className="w-60 absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <Link to={`/profile/${username}`}>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={avatar}
                        alt="Dan_Abromov"
                      />
                      <span className={`${location.pathname === `/profile/${username}` && ' text-blue-600 underline'} font-bold text-lg`}>  @{username}</span>
                    </Link>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 space-y-2">
                  <div className="mt-6 flex flex-1 flex-col justify-between">
                      <nav className="-mx-3 space-y-6 ">
                        <div className="space-y-3 ">
                          <label className="px-3 text-xs font-semibold uppercase text-gray-900 dark:text-gray-200">Posts</label>
                          <Link
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
                  ${location.pathname === '/following_post' && 'bg-blue-600'}`} to="/following_post"
                          >
                            <BarChart className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Following Posts</span>
                          </Link>
                          <Link
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
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
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
                  ${location.pathname === '/posts/createPost' && 'bg-blue-600'}`} to="/posts/createPost"
                          >
                            <Newspaper className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Create Post</span>
                          </Link>
                          <a
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
              ${location.pathname === '/allposts' && 'bg-blue-600'}`} href="#"
                          >
                            <BellRing className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Notifications</span>
                          </a>
                          <a
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
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

                          <button className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"

                            onClick={() => {
                              setIsDarkMode(prev => !prev);
                            }}
                          >{isDarkMode ? <SunMedium className="h-5 w-5" color='white' /> : <Moon className="h-5 w-5" />}
                            <span className="mx-2 text-sm font-medium">Themes</span></button>
                          <a
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
                  ${location.pathname === '/allposts' && 'bg-blue-600'}`} href="#"
                          >
                            <Wrench className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Setting</span>
                          </a>
                          <Link
                            className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700
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

                  </div>

                </div>
              </div>
            </div>
          )}

        </>) : (<></>)}
      </div>

    </div>
  )
}
