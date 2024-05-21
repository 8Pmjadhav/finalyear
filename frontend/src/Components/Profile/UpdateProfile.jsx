import React, { useState } from 'react';
import {Success,GoBackButton,SubmitButton,client} from '../index.js';

import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [backCover, setBackCover] = useState(null);
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [profession,setProfession] = useState('');
  const [msg,setMsg] = useState();

  if(msg){
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  }
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('backcover', backCover);
    formData.append('description', description);
    formData.append('profession',profession)
    formData.append('gender', gender);

    try {
        const response = await client.put(`/api/profile/updateProfile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
    
        if (response.status === 200) {
          const {data} = response;
          // setMsg(data.msg);
          console.log('Profile updated successfully',data.user2);
          setLoading(false);
          navigate(`/profile/${data.user2.username}`)
          // Optionally, update UI or handle success case
        } else {
          console.error('Failed to update profile try again');
          // Optionally, handle error case
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        // Optionally, handle error case
      }
    // Send formData to backend API for processing
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-0 lg:mt-8 p-6 bg-white dark:bg-black rounded-lg shadow-md border border-gray-600">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Update Profile</h2>
      {msg && <Success text={"Profile Updated Successfully"}/>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="appearance-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backCover" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Back Cover
          </label>
          <input
            type="file"
            id="backCover"
            accept="image/*"
            onChange={(e) => setBackCover(e.target.files[0])}
            className="appearance-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-24 w-full"
            placeholder="Enter your description here..."
          ></textarea>
        </div>
        <div className='mb-4'>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Profession
          </label>
          <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent dark:bg-gray-800 px-3 py-2 text-sm dark:text-gray-200 placeholder:text-gray-800 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Profession"
                        id="profession"
                        onChange={(e) => setProfession(e.target.value)}
                        value={profession}
                    ></input>
                </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="appearance-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="text-center space-x-4">
          <GoBackButton/>
          <SubmitButton loading={loading} tb={'Update Profile'} ta={'Updating'} />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;


