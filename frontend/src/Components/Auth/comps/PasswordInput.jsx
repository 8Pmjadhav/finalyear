import { useState } from "react";
import { Link } from "react-router-dom";


export function PasswordInput({ password, setPassword, isLoginPage }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                </label>
                {isLoginPage && (
                    <Link to="#" title="" className="text-sm font-semibold text-black hover:underline">
                        {' '}
                        Forgot password?{' '}
                    </Link>
                )}
            </div>
            <div className="mt-2 relative">
                <input
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                >

                </input>
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <img
                            className="h-5 w-5 text-black-400 hover:text-gray-500"
                            src="../../../../public/icons/eye-password-hide-svgrepo-com.svg" />
                    ) : (
                        <img
                            className="h-5 w-5 text-black-400 hover:text-gray-500"
                            src="../../../../public/icons/eye-password-show-svgrepo-com.svg" />
                    )}
                </button>
            </div>
        </>
    )
}

export function ConfirmPasswordInput({ password_confirmation, setPassword_con }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <label htmlFor="c_password" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                </label>
            </div>
            <div className="mt-2 relative">
                <input
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    id="c_password"
                    onChange={(e) => setPassword_con(e.target.value)}
                    value={password_confirmation}
                >

                </input>
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <img
                            className="h-5 w-5 text-black-400 hover:text-gray-500"
                            src="../../../../public/icons/eye-password-hide-svgrepo-com.svg" />
                    ) : (
                        <img
                            className="h-5 w-5 text-black-400 hover:text-gray-500"
                            src="../../../../public/icons/eye-password-show-svgrepo-com.svg" />
                    )}
                </button>
            </div>
        </>
    )
}