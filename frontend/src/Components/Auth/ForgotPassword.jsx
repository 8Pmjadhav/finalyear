import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { selectAccessToken } from '../../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader.jsx';
import { isAuthenticated } from '../../hooks/user.js';
import { EmailInput, PasswordInput, SubmitButton, ConfirmPasswordInput, Icon, OTPInput, Success, Danger } from './comps/comps.jsx'
import { Error500 } from '../ErrorHandling/Error500.jsx';

export default function ForgotPassword() {

    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_con] = useState('');

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [msg, setMsg] = useState('');

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerify, setOtpVerify] = useState(false);

    useEffect(() => {
        setLoading(false); // Set loading to false once authentication state is resolved
    }, [accessToken]);

    useEffect(() => {
        if (errors || msg) {
            const timer = setTimeout(() => {
                setErrors(null); // Clear the error after 3 seconds
                setMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors, msg]);

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/forgotPassword/getOTP', { email })
                .then((res) => {
                    console.log(res);
                    setOtpSent(true);
                    setMsg(res.data.msg);
                    console.log(otpSent);

                });

        } catch (error) {
            setErrors(error.response.data?.msg);
        }
    };

    const verifyOtpFP = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/forgotPassword/verifyOtp', { email, otp })
                .then((res) => {
                    setOtpVerify(true);
                    setOtpSent(false);
                    setMsg(res.data.msg);
                })
        } catch (error) {
            setErrors(error.response.data?.msg);

        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/forgotPassword/resetPassword', { email, password, password_confirmation, otp })
                .then((res) => {
                    setOtpVerify(false);
                    setOtpSent(false);
                    setMsg(res.data.msg);
                    // return <Navigate to={'/login'} />;
                })
        } catch (error) {
            setErrors(error.response.data.error?.password || error.response.data?.msg);
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
                    {(errors || msg) && (
                        errors ? <Danger errors={errors} /> : <Success text={msg} />
                    )}<>
                        {otpVerify ? (<>
                            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">RESET Password</h2>
                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">for email {email}</p>
                            <form onSubmit={resetPassword} className="mt-8">
                                <div className="space-y-5">
                                    <PasswordInput password={password} setPassword={setPassword} />
                                    <ConfirmPasswordInput password_confirmation={password_confirmation} setPassword_con={setPassword_con} />
                                    <div>
                                        <SubmitButton text={'Reset Password'} />
                                    </div>
                                </div>
                            </form>

                        </>) : (
                            <>

                                {otpSent ? (
                                    <>
                                        <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">ENTER OTP</h2>
                                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">You have only 2 minutes</p>
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
                                        <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">ENTER  Email</h2>
                                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">Enter your Registered Email address to get OTP <Link to="/login" className="font-medium text-black dark:text-white transition-all duration-200 hover:underline">
                                            Sign In
                                        </Link></p>
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
                            </>)}</>
                </div>
            </div>
        </section >
    );
}
