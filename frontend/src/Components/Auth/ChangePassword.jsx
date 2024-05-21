import React, { useState, useEffect } from 'react';
import {Loader,SubmitButton, client} from '../index.js';

import { Link, Navigate } from 'react-router-dom';
import { Success, Danger,  PasswordInput, ConfirmPasswordInput, } from './comps/comps.jsx'

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_con] = useState('');
  const [sloading, setSLoading] = useState(false);     // loading after submit

  const [errors, setErrors] = useState();
  const [msg, setMsg] = useState(false);
  

  

  if (errors || msg) {
    setTimeout(() => {
      setErrors(null);
      setMsg(false);
      // Clear the error after 3 seconds
    }, 3000);
  }

  async function changePassword(e) {
    e.preventDefault();
    setSLoading(true);
    try {
      await client.put('/api/user/changePassword', { oldPassword, password, password_confirmation },{
        headers:{
          'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => {
          setMsg(true);
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
          {(errors || msg) ? (
            errors ? <Danger errors={errors} /> : <Success text={"Password Changed successfully"}/>
          ) : (
            <div>
              <h3 > Change Password </h3>
            </div>
          )}
          <form onSubmit={changePassword} className="mt-8">
            <div className="space-y-5">
                  <PasswordInput password={oldPassword} setPassword={setOldPassword} isLoginPage={true} currentp={true}/>
                  <PasswordInput password={password} setPassword={setPassword} newp={true} />
                  <ConfirmPasswordInput password_confirmation={password_confirmation} setPassword_con={setPassword_con} />
               
              <div>
                <SubmitButton loading={sloading} tb={'Change Password'} ta= {'Changing.. '}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

