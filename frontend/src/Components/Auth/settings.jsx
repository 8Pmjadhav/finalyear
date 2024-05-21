import { useEffect, useState } from "react"
import { useParams, Link, Outlet, useLocation } from "react-router-dom"


export default function Settings() {
  const location = useLocation();

  useEffect(()=>{},[location.pathname])

  return (
    <div className=" min-h-screen lg:mx-40 dark:text-white ">
      {/* Profile Content */}
      <div className="container mx-auto  ">
        <div className="max-w-lg mx-auto bg-white dark:bg-black border border-gray-600 shadow-md rounded-lg overflow-hidden">
          <header className="shadow sticky top-0 max-w-xl">
            <nav className=" border-gray-600 px-4 lg:px-6 py-2.5">
              <div className="flex  justify-between items-center mx-auto">


                <ul className="flex   font-medium justify-between flex-grow lg:mt-0">
                  <li>
                    <Link
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/settings/changePassword` && 'bg-blue-600'}`} to={`changePassword`}
                    >
                      <span className="mx-2 text-sm font-medium"> (Change Password)</span>
                    </Link>

                  </li>
                  <li>
                  <li>
                    <Link
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/settings/deleteAccount` && 'bg-red-600'}`} to={`deleteAccount`}
                    >
                      <span className="mx-2 text-sm font-medium"> (Delete Account)</span>
                    </Link>

                  </li>

                  </li>
                  
                  

                </ul>
              </div>
            </nav>
          </header>
          <Outlet/>
        </div>
        
      </div>
    </div>
  )
}