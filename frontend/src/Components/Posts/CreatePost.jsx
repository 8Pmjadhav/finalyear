import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../store/authSlice';

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState('');
  const user = useSelector(selectUsername);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    const formData = new FormData();
    formData.append('image', image);
    formData.append('video', video);
    formData.append('content', content);

    try {
        const response = await axios.post(`/api/posts/postTweet`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        if (response.status === 200) {
          console.log('Post created successfully');
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-black rounded-lg shadow-md border-2 border-solid dark:border-white">
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
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Video
          </label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
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
            className="resize-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-24"
            placeholder="Enter your content here..."
          ></textarea>
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;


