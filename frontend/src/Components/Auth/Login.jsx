import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { selectAccessToken } from '../../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader.jsx';
import { isAuthenticated } from '../../hooks/user.js';
import {EmailInput,PasswordInput,SubmitButton,Icon} from './comps/comps.jsx'
import { Error500 } from '../ErrorHandling/Error500.jsx';

export default function Login() {  
  
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
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
    try {
      await axios.post('/api/user/login', { email, password })
        .then(async (res) => {
          //console.log(res);
          if (res.request.status === 200) {
            console.log(res);
            await isAuthenticated(dispatch);
            return
          }
        }
        );
      // Handle success
    } catch (error) {
      console.log('err',error);
      const error1 = error.response.data.error?.email || error.response.data.error?.password  // validation error
                        || error.response.data?.msg;                                          // email and password error message
      setErrors(error1);
      // Handle error
    }

  }

  

  if (loading) {
    return (
      <Loader />
    ); // Render nothing while loading
  }

  if(!accessToken) {
    return (
      <section className='pt-20 '  >
        <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14 border-2 border-solid   dark:border-white border-black relative z-10 lg:w-96 bg-gray-50 dark:bg-black rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {errors && ( // Conditionally render error alert
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors}
              </div>
            )}
            <Icon />
            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                title=""
                className="font-semibold text-black dark:text-white transition-all duration-200 hover:underline"
              >
                Create a  account
              </Link>
            </p>
            <form onSubmit={login} className="mt-8">
              <div className="space-y-5">
              <EmailInput email={email} setEmail={setEmail}/>
              <PasswordInput password={password} setPassword={setPassword} isLoginPage={true}/>
                <div>
                  <SubmitButton text={'Get Started'}/>
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    )
  }
  else{
    return <Navigate to={'/'} />;
  }
}
