import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';

import { Success,Error404,GoBackButton,SubmitButton, client } from '../index.js'
import { Trash2 } from 'lucide-react';

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams()
  const pid = params.id ;
  const [loading,setLoading] = useState(false);

  const [post, setPost] = useState(pid);

  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [content, setContent] = useState('');
  // console.log(image,video,content);
  const [msg, setMsg] = useState(null);
  const [deleteiv,setDeleteiv] = useState({
    image:false,
    video:false
  })

  useEffect(() => {
    (async () => {
        try {
            await client.get(`/api/posts/viewTweet/${pid}`,{
              headers:{
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
              }
            })
                .then((res) => {
                    const post = res.data.postData;
                    setPost(post);
                    setContent(post.content);
                    setImage(post.image);
                    setVideo(post.video);
                    
                })
        } catch (error) {
            setPost(null);
            navigate(location.pathname, { replace: true, state: null });
            console.log(error);
        }
    })();
}, [ navigate, location.pathname])

if (!post) return <Error404 />


  if (msg) {
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  }

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    const formData = new FormData();
    // console.log(image,video,content);
    formData.append('image', image);
    formData.append('video', video);
    formData.append('content', content);
    formData.append('deleteiv',JSON.stringify(deleteiv)); 

    try {
      const response = await client.put(`/api/posts/editTweet/${post.id}`, formData, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setMsg(response.data.msg);
        console.log('Post created successfully');
        setLoading(false);
        navigate(`/posts/viewPost/${post.id}`)
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
  const videoPath = post?.video;
  const extension = post?.video && videoPath?.split('.').pop();

  return (
    <div className=" max-w-md mx-auto mt-0 p-6 dark:text-white bg-white dark:bg-black rounded-lg shadow-md border border-gray-600">
        {msg && <Success text={msg} />}
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Image     
          </label>
          <div className='flex space-x-3'>
          
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          />
          {post.image && (<div className='flex space-x-1'>
            <img src={post.image} className='h-10 w-10 sm-4 ' alt='no file'/>
            <button
            type='button'
            onClick={()=>{
              setDeleteiv(prev => ({...prev,image:!prev.image}))
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            {deleteiv.image ? <Trash2 fill='red' className='h-8 items-center '/>:<Trash2 className='h-8 items-center '/>}</button>
          </div>
          ) }
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Video
          </label>
          <div className='flex space-x-3'>
          
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="appearance-none border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
          />
          {post.video && (<div className='flex space-x-1'>
              {(extension === 'mp4' || extension === 'mkv') ? <a href={post.video} className='text-blue-500 underline'>video</a> :<img src={post.video} className='h-10 w-10 sm-4 dark:text-white' alt='no file'/>}
            <button
            type='button'
            onClick={()=>{
              setDeleteiv(prev => ({...prev,video:!prev.video}))
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            {deleteiv.video ? <Trash2 fill='red' className='h-8 items-center '/>:<Trash2 className='h-8 items-center dark:text-white'/>}</button>
          </div>
          )  }
        </div></div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize border rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-28 w-full"
            placeholder="Enter your content here..."
          ></textarea>
        </div>

        <div className="text-center space-x-5">
        <GoBackButton/>
        <SubmitButton loading={loading} tb={'Edit Post'} ta={'Editing'} />
        </div>
      </form>
    </div>
  );
};

export default EditPost;


