'use client'

import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/authSlice';
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench } from 'lucide-react'

import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { logout } from '../../hooks/user';
import Sidebar from '../Home/Sidebar';

const menuItems = [
  {
    name: 'Home',
    href: '',
  }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  if (accessToken) {
    if (menuItems.length == 1) {
      menuItems.push({
        name: 'Contact',
        href: 'contact',
      });
    }
  }

  //console.log(accessToken);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </span>
          <span className="font-bold">PMJ</span>
        </div>
        <div className="hidden space-x-2 lg:block">
          {!accessToken ? (<><button
            type="button"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Link to="login">Login</Link>
          </button>
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Link to='signup'>Sign Up</Link>
            </button></>) :
            (<button
              type="button"
              onClick={() => logout(dispatch)}
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Link to='login'>Logout</Link>
            </button>)}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="w-60 absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link to="/profile">
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://res.cloudinary.com/dooomcx1j/image/upload/v1714796653/avatar/ui9tdfqg7s4lbaotgfu1.jpg"
                        alt="Dan_Abromov"
                      />
                      <span className="font-bold">  DevUI</span>
                    </Link>

                  </div>
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
                  {!accessToken ?
                    (<>
                    <Link to= '/' >Home</Link>
                    <button
                      type="button"
                      className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <Link to='login'>Login</Link>
                    </button>
                      <button
                        type="button"
                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <Link to='signup'>Sign Up</Link>
                      </button></>) : (
                      <div>
                        <div className="mt-6 flex flex-1 flex-col justify-between">
                          <nav className="-mx-3 space-y-6 ">
                            <div className="space-y-3 ">
                              <label className="px-3 text-xs font-semibold uppercase text-gray-900">Posts</label>
                              <Link
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                to="/following_post"
                              >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Following Posts</span>
                              </Link>
                              <Link
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                to="/allposts"
                              >
                                <Wallet className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">All Posts</span>
                              </Link>
                            </div>
                            <div className="space-y-3 ">
                              <label className="px-3 text-xs font-semibold uppercase text-gray-900">content</label>
                              <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                              >
                                <Newspaper className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Blogs</span>
                              </a>
                              <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                              >
                                <BellRing className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Notifications</span>
                              </a>
                              <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                              >
                                <Paperclip className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Checklists</span>
                              </a>
                            </div>

                            <div className="space-y-3 ">
                              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                                Customization
                              </label>
                              <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                              >
                                <Brush className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Themes</span>
                              </a>
                              <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                              >
                                <Wrench className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Setting</span>
                              </a>
                              <Link
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                to="/contact"
                              >
                                <Wrench className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Contact</span>
                              </Link>
                            </div>
                          </nav>
                        </div>
                        <button
                          type="button"
                          onClick={() => logout(dispatch)}
                          className="w-3/4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <Link to='login'>Log Out</Link>
                        </button>
                      </div>
                    )}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
