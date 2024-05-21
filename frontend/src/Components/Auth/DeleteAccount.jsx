import React, { useState, useEffect } from 'react';
import { Loader, SubmitButton, client } from '../index.js';

import { Link, Navigate } from 'react-router-dom';
import { Success, Danger, PasswordInput, ConfirmPasswordInput, } from './comps/comps.jsx'

export default function DeleteAccount() {

  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_con] = useState('');
  const [sloading, setSLoading] = useState(false);     // loading after submit

  const [errors, setErrors] = useState();
  const [userCreated, setUserCreated] = useState(false);




  if (errors || userCreated) {
    setTimeout(() => {
      setErrors(null);
      setUserCreated(false);
      // Clear the error after 3 seconds
    }, 3000);
  }

  async function deleteAccount(e) {
    e.preventDefault();
    setSLoading(true);
    try {
      await client.put('/api/user/register', { oldPassword, password, password_confirmation }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => {

        });
    } catch (error) {
      //   console.log(error);
      let error1 = error.response.data.error?.username || error.response.data.error?.email || error.response.data.error?.password || error.response.data?.msg;
      setErrors(error1);
    }
    setSLoading(false);
  }






  return (
    <section className='pt-10'>
      <div className=" px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14 lg:pb-10 border border-gray-600  z-10 lg:w-full bg-gray-50 dark:bg-black rounded-md">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
          {(errors || userCreated) ? (
            errors ? <Danger errors={errors} /> : <Success text={"Account Deleted successfully , Login Now"} />
          ) : (
            <div>
              <h3 > Delete Account </h3>
            </div>
          )}
          <form onSubmit={deleteAccount} className="mt-8">
            <div className="space-y-5">
              <PasswordInput password={password} setPassword={setPassword} isLoginPage={true} />
              <div>
                <button
                  disabled={sloading}
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
                >
                  {sloading ? (
                    <div className='flex space-x-2 text-green-400'>'Deleting'
                      <ReactLoading type='spin' color='#153448' height={'20px'} width={'20px'} />
                    </div>) : 'Delete Account'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
