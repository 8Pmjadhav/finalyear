import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";


export function PasswordInput({ password, setPassword, isLoginPage,newp,currentp }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-gray-200">
                    {' '}
                    {(newp && 'New ') || (currentp && 'Current ')}Password{' '}
                </label>
                {isLoginPage && (
                    <Link to="/forgotPassword" title="" className="text-sm font-semibold text-blue-900 dark:text-blue-500 hover:underline">
                        {' '}
                        Forgot password?{' '}
                    </Link>
                )}
            </div>
            <div className="mt-2 relative">
                <input
                    required
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <EyeOff className="h-5 w-5" color='gray'/>
                    ) : (
                        <Eye className="h-5 w-5" color='gray'/> 
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
                <label htmlFor="c_password" className="text-base font-medium text-gray-900 dark:text-gray-200">
                    {' '}
                    Confirm Password{' '}
                </label>
            </div>
            <div className="mt-2 relative">
                <input
                    required
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm dark:text-gray-200 placeholder:text-gray-800 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <EyeOff className="h-5 w-5" color='gray'/>
                    ) : (
                        <Eye className="h-5 w-5" color='gray'/> 
                    )}
                </button>
            </div>
        </>
    )
}