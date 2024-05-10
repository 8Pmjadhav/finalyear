import { useState } from "react";

export function EmailInput({ email, setEmail }) {
    return (
        <>
            <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                </label>
                <div className="mt-2">
                    <input
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    ></input>
                </div>
            </div>
        </>
    )
}

export function UsernameInput({ username, setUsername }) {
    return (
        <>
            <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    User Name{' '}
                </label>
                <div className="mt-2">
                    <input
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
        </>
    )
}

import { ArrowRight } from 'lucide-react';

export function SubmitButton({ text }) {
    return (
        <>
            <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
                {text} <ArrowRight className="ml-2" size={16} />
            </button>
        </>
    )
}

