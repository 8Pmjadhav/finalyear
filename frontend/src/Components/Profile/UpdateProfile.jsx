import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../store/authSlice';

const UpdateProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [backCover, setBackCover] = useState(null);
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const user = useSelector(selectUsername);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('backcover', backCover);
    formData.append('description', description);
    formData.append('gender', gender);

    try {
        const response = await axios.put(`/api/profile/updateProfile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        if (response.status === 200) {
          console.log('Image uploaded successfully');
          // Optionally, update UI or handle success case
        } else {
          console.error('Failed to upload image');
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-black rounded-lg shadow-md border-2 border-solid dark:border-white">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Update Profile</h2>
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
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
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
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
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
            className="resize-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-24"
            placeholder="Enter your description here..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;


