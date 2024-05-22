import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { selectAccessToken } from '../../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../hooks/user.js';
import {EmailInput,PasswordInput,Icon, Danger} from './comps/comps.jsx'
import {Loader,SubmitButton, client} from '../index.js';

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
      await client.post('/api/user/login', { email, password })
        .then(async (res) => {
          //console.log(res);   
          localStorage.setItem('accessToken',res.data.accessToken);
          await isAuthenticated(dispatch);
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
    setSLoading(false);
  }

  

  if (loading) {
    return (
      <Loader />
    ); // Render nothing while loading
  }

  if(!accessToken) {
    return (
      <section className='pt-20 '  >
        <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-14 border border-gray-600 relative z-10 lg:w-96 bg-gray-50 dark:bg-black rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {errors && ( // Conditionally render error alert
              <Danger errors={errors}/>
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
                  <SubmitButton loading={sloading} tb={'Get Started'} ta={'Signing In.. '}/>
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
