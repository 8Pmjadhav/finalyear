import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader.jsx';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/authSlice.js';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {  PasswordInput } from './comps/PasswordInput.jsx';
import { Danger,Success } from './comps/Alerts.jsx';


export default function SignUp() {
  const accessToken = useSelector(selectAccessToken);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_con] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const [userCreated,setUserCreated] = useState(false);
  


  useEffect(() => {
    setLoading(false); // Set loading to false once authentication state is resolved
  }, [accessToken]);

  if(errors || userCreated){
    setTimeout(() => {
      setErrors(null);
      setUserCreated(false);
       // Clear the error after 2 seconds
    }, 3000);
  }
  
  async function register(e) {
    e.preventDefault();
    //console.log(username);
    try {
      await axios.post('/api/user/register', { username, email, password,password_confirmation })
        .then((res) => {
          console.log(res);
          setUserCreated(true);
        });
      // Handle success
    } catch (error) {
      console.log(error);
      let error1 = error.response.data.error?.username || error.response.data.error?.email || error.response.data.error?.password;     // validation
      error1 = error1 || error.response.data?.errors;       //  uname, email , already taken
      setErrors(error1);
      // Handle error
    }
  }

  if (loading) {
    return (
      <Loader />
    ); // Render nothing while loading
  }

  if (accessToken) {
    return <Navigate to={'/'} />;
  }
  else {
    return (
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {(errors || userCreated)  ? ( // Conditionally render error alert
              errors ? <Danger errors={errors}/>:(
                <Success />
              )
            ):(

            <div>
            <div className="mb-2 flex justify-center">
              <svg
                width="50"
                height="56"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                  fill="black"
                />
              </svg>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p></div>)}
            <form onSubmit={register} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    User Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="User Name"
                      id="name"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    ></input>
                  </div>
                </div>

                <div> 
                    <PasswordInput password={password} setPassword={setPassword}/>
          

                  <br />
                  <div className="flex items-center justify-between">
                    <label htmlFor="c_password" className="text-base font-medium text-gray-900">
                      {' '}
                      Confirm Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Confirm Password"
                      id="c_password"
                      onChange={(e) => setPassword_con(e.target.value)}
                      value={password_confirmation}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    )
  }
}
