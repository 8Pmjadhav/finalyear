// src/comps/comps.jsx

import React from 'react';

export function OTPInput({ otp, setOtp }) {
  return (
    <div>
      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        OTP
      </label>
      <input
        type="text"
        name="otp"
        id="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
        required
      />
    </div>
  );
}


