import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {Success,GoBackButton,SubmitButton} from '../index.js'
 
const CreatePost = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState('');
  const [msg,setMsg] = useState(null);


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
    formData.append('image', image);
    formData.append('video', video);
    formData.append('content', content);

    try {
        const response = await axios.post(`/api/posts/postTweet`, formData, {
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
    
        if (response.status === 200) {
          setMsg(response.data.msg);
          console.log('Post created successfully',response.data);
          setLoading(false);
          navigate(`/posts/viewPost/${response.data.id}`);
          // Optionally, update UI or handle success case
        } else {
          console.error('Failed to create post');
          // Optionally, handle error case
        }
      } catch (error) {
        console.error('Error posting tweet:', error);
        // Optionally, handle error case
      }
    // Send formData to backend API for processing
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 sm:mt-2 p-6 bg-white dark:bg-black rounded-lg shadow-md border border-gray-600">
      {msg && <Success text={msg}/>}
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className=" w-full appearance-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Video/Image
          </label>
          <input
            type="file"
            id="video"
            accept={"video/*" && "image/*"}
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full appearance-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-28 w-full"
            placeholder="Enter your content here..."
          ></textarea>
        </div>
        
        <div className="text-center space-x-4">
          <GoBackButton/>
          <SubmitButton loading={loading} tb={'Create Post'} ta={'Posting ..'}/>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;


