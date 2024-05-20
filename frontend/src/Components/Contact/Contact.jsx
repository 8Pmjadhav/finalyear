import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { selectAccessToken } from '../../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../hooks/user.js';
import { Error500, Loader, SubmitButton } from '../index.js';

export default function Login() {

  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [sloading, setSLoading] = useState(false);     // loading after submit

  const [errors, setErrors] = useState();

  useEffect(() => {
    setLoading(false); // Set loading to false once authentication state is resolved
  }, [accessToken]);

  if (errors) {
    setTimeout(() => {
      setErrors(null); // Clear the error after 2 seconds
    }, 3000);
  }

  async function login(e) {

    e.preventDefault();
    setSLoading(true);
    try {
      
      // Handle success
    } catch (error) {
      console.log('err', error);
      const error1 =  error.response.data?.msg;                                          // email sending error message
      setErrors(error1);
      // Handle error
    }
    setSLoading(false);
  }



  if (loading) {
    return (
      <Loader />
    ); // Render nothing while loading
  }

  if (accessToken) {
    return (
      <section className='pt-20 '  >
        <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14 border border-gray-600 relative z-10 lg:w-96 bg-gray-50 dark:bg-black rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {errors && ( // Conditionally render error alert
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors}
              </div>
            )}
            <Icon />
            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
              Enter your Message
            </h2>

            <form onSubmit={login} className="mt-8">
              <div className="space-y-5">
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Message
                  </label>
                  <textarea
                    id="content"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-28 w-full"
                    placeholder="Enter your Message here..."
                  ></textarea>
                </div>

                <div>
                  <SubmitButton loading={sloading} tb={'Get Started'} ta={'Signing In.. '} />
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    )
  }
  else {
    return <Navigate to={'/'} />;
  }
}
