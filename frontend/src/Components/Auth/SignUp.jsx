import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Loader,SubmitButton} from '../index.js';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/authSlice.js';
import { Link, Navigate } from 'react-router-dom';
import { Success, Danger, UsernameInput, EmailInput, PasswordInput, ConfirmPasswordInput, OTPInput, Icon } from './comps/comps.jsx'

export default function SignUp() {
  const accessToken = useSelector(selectAccessToken);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_con] = useState('');
  const [loading, setLoading] = useState(true);
  const [sloading, setSLoading] = useState(false);     // loading after submit

  const [errors, setErrors] = useState();
  const [userCreated, setUserCreated] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    setLoading(false); // Set loading to false once authentication state is resolved
  }, [accessToken]);

  if (errors || userCreated) {
    setTimeout(() => {
      setErrors(null);
      setUserCreated(false);
      // Clear the error after 3 seconds
    }, 3000);
  }

  async function register(e) {
    e.preventDefault();
    setSLoading(true);
    try {
      await axios.post('/api/user/register', { username, email, password, password_confirmation })
        .then((res) => {
          setOtpSent(true);
          setUserCreated(false);
        });
    } catch (error) {
      console.log(error);
      let error1 = error.response.data.error?.username || error.response.data.error?.email || error.response.data.error?.password || error.response.data?.msg;
      setErrors(error1);
    }
    setSLoading(false);
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setSLoading(true);
    try {
      await axios.post('/api/user/verifyOTP', { email, otp })
        .then((res) => {
          setUserCreated(true);
          setOtpSent(false);
        });
    } catch (error) {
      let error1 = error.response.data?.msg;
      setErrors(error1);
      setOtpSent(false);
    }
    setSLoading(false);
  }

  if (loading) {
    return (
      <Loader />
    ); // Render nothing while loading
  }

  if (accessToken) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className='pt-20'>
      <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14 lg:pb-10 border border-gray-600 relative z-10 lg:w-96 bg-gray-50 dark:bg-black rounded-md">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          {(errors || userCreated) ? (
            errors ? <Danger errors={errors} /> : <Success text={"Account Created successfully , Login Now"}/>
          ) : (
            <div>
              <Icon />
              <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
                {otpSent ? 'Enter OTP' : 'Sign up to create account'}
              </h2>
              <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-200">
                {otpSent ? (
                  'Check your email for the OTP'
                ) : (
                  <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-black dark:text-white transition-all duration-200 hover:underline">
                      Sign In
                    </Link>
                  </>
                )}
              </p>
            </div>
          )}
          <form onSubmit={otpSent ? verifyOtp : register} className="mt-8">
            <div className="space-y-5">
              {otpSent ? (
                <OTPInput otp={otp} setOtp={setOtp} />
              ) : (
                <>
                  <UsernameInput username={username} setUsername={setUsername} />
                  <EmailInput email={email} setEmail={setEmail} />
                  <PasswordInput password={password} setPassword={setPassword} />
                  <ConfirmPasswordInput password_confirmation={password_confirmation} setPassword_con={setPassword_con} />
                </>
              )}
              <div>
                <SubmitButton loading={sloading} tb={otpSent ? 'Verify OTP' : 'Create Account'} ta={otpSent ? 'Verifing.. ' : 'Creating.. '}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
