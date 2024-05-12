import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader.jsx';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/authSlice.js';
import { Link } from 'react-router-dom';
import { Success, Danger, UsernameInput, EmailInput, PasswordInput, ConfirmPasswordInput, SubmitButton,Icon } from './comps/comps.jsx'


export default function SignUp() {
  const accessToken = useSelector(selectAccessToken);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_con] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const [userCreated, setUserCreated] = useState(false);



  useEffect(() => {
    setLoading(false); // Set loading to false once authentication state is resolved
  }, [accessToken]);

  if (errors || userCreated) {
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
      await axios.post('/api/user/register', { username, email, password, password_confirmation })
        .then((res) => {
          //console.log(res);
          setUserCreated(true);
        });
      // Handle success
    } catch (error) {
      //console.log(error);
      let error1 = error.response.data.error?.username || error.response.data.error?.email || error.response.data.error?.password    // validation
        || error.response.data?.msg;       //  uname, email , already taken
      setErrors(error1);
      // Handle error
    }
  }

  if (loading) {
    return (
      <Loader />
    ); // Render nothing while loading
  }
  //console.log(errors);
  if (accessToken) {
    return <Navigate to={'/'} />;
  }

  else {
    return (
      <section className='pt-20'>
        <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14 lg:pb-10 border-2 border-solid dark:border-white border-black relative z-10 lg:w-96 bg-gray-50 dark:bg-black rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {(errors || userCreated) ? ( // Conditionally render error alert
              errors ? <Danger errors={errors} /> : (
                <Success />
              )
            ) : (

              <div>
                <Icon />
                <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
                  Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-200">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    title=""
                    className="font-medium text-black dark:text-white transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p></div>)}
            <form onSubmit={register} className="mt-8">
              <div className="space-y-5">
                <UsernameInput username={username} setUsername={setUsername} />
                <EmailInput email={email} setEmail={setEmail} />

                <div>
                  <PasswordInput password={password} setPassword={setPassword} />
                  <br />
                  <ConfirmPasswordInput password_confirmation={password_confirmation} setPassword_con={setPassword_con} />
                </div>
                <div>
                  <SubmitButton text={'Create Account'} />
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    )
  }
}
