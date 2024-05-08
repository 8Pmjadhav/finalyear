import { useState } from "react";

export function PasswordInput({ password, setPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    console.log(password);
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
            </div>
            <div className="mt-2">
                <input
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                ></input>
            </div>
        </>
    )
}