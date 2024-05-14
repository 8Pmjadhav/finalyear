import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { selectAccessToken } from '../../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader.jsx';
import { isAuthenticated } from '../../hooks/user.js';
import { EmailInput, PasswordInput, SubmitButton, Icon, OTPInput } from './comps/comps.jsx'
import { Error500 } from '../ErrorHandling/Error500.jsx';

export default function ForgotPassword() {

    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerify, setOtpVerify] = useState(false);

    useEffect(() => {
        setLoading(false); // Set loading to false once authentication state is resolved
    }, [accessToken]);

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors(null); // Clear the error after 3 seconds
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/forgotPassword/getOTP', { email })
                .then((res) => {
                    console.log(res);
                    setOtpSent(true);
                    console.log(otpSent);

                  });
            
        } catch (error) {
            const error1 = error.response.data.error?.email || error.response.data.error?.password  // validation error
                || error.response.data?.msg;                                          // email and password error message
            setErrors(error1);
        }
    };

    const verifyOtpFP = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/verifyOTPForgotPassword', { email, otp })
                .then((res)=>{
                    setOtpVerify(true);
                    setOtpSent(false);
                })
        } catch (error) {
            let error1 = error.response.data?.msg;
            setErrors(error1);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (accessToken) {
        return <Navigate to={'/'} />;
    }

    return (
        <section className='pt-20'>
            <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14 border-2 border-solid dark:border-white border-black relative z-10 lg:w-96 bg-gray-50 dark:bg-black rounded-md">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    {errors && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {errors}
                        </div>
                    )}
                    {otpSent ? (
                        <>
                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">Enter OTP sent on email</p>
                            <form onSubmit={verifyOtpFP} className="mt-8">
                                <div className="space-y-5">
                                    <OTPInput otp={otp} setOtp={setOtp} />
                                    <div>
                                        <SubmitButton text={'Verify OTP'} />
                                    </div>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">Enter your Registered Email address to get OTP</p>
                            <form onSubmit={sendEmail} className="mt-8">
                                <div className="space-y-5">
                                    <EmailInput email={email} setEmail={setEmail} />
                                    <div>
                                        <SubmitButton text={'Get OTP'} />
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
