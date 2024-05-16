import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice.js';
import { SubmitButton } from '../Auth/comps/emailInput';
import { GetTime } from './basic.jsx';
import { MessageCircleCode, ThumbsUp } from 'lucide-react';

const PostCard = ({ post,setRefetch0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();             // which one img or img1 or video should open big
  const [liked, setLiked] = useState(false)
  const [edit, setEdit] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.username === post.user.username) {
      setEdit(true);
    }
    if (user.id === post.likes?.user_id) {
      console.log(user.id, post.likes);
      setLiked(true);
    }
  }, [user, post])

  async function deletePost() {
    try {
      await axios.delete(`/api/posts/deleteTweet/${post.id}`)
        .then((res) => {
          // console.log(res);
          setRefetch0(prev => !prev);
          // setNewReply('');
          // setLikes(res.data.postData.likes);
        })
    } catch (error) {
      console.log(error);
    }
  }
  function toggleModal(file) {
    setIsOpen(!isOpen);
    setFile(file);
  };
  const videoPath = post?.video;
  const extension = post?.video && videoPath?.split('.').pop();


  //  console.log(post.replyCount,extension);
  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-stone-900 bottom-2 border-2 border-black dark:border-white shadow-md rounded-md overflow-hidden mb-4">
      <div className='flex justify-between'>
        <Link to={`/profile/${post.user.username}`}>
          <div className="flex items-center p-4">
            <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full mr-2" />
            <span className="font-semibold dark:text-white"> @{post.user.username}</span>
          </div>
        </Link>
        {edit &&
          (<div className='flex items-center p-4 space-x-3'>
            <Link to='/post/:id'>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-green-500  px-2.5 py-1  font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
              >
                Edit
              </button></Link>
              <button
                type="submit"
                onClick={deletePost}
                className="inline-flex w-full items-center justify-center rounded-md bg-red-500  px-2.5 py-1 font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
              >
                Delete
              </button>
          </div>
          )}</div>
      <div className="p-4">
        <Link to={`/posts/viewPost/:${post.id}`} state={{ post }}>
          <p className="text-gray-700 dark:text-gray-50">{post.content}</p>
        </Link>
        {(post?.image || post?.video) && (
          <div className={`relative mt-4 h-60 flex border-2 rounded-md border-black dark:border-white ${(post?.image && post?.video) ? 'justify-center' : ""}`}>
            {post?.image && (
              <img src={post.image} alt="Post Image" className={`${post.video ? "w-1/2" : "w-full"} h-full object-cover`} onClick={() => toggleModal('image')} />
            )}
            {post?.video && (
              (extension === 'mp4' || extension === 'mkv') ?
                (<video src={post.video} className="w-1/2 h-full object-cover" onClick={() => toggleModal('video')} controls></video>)
                : (<img src={post.video} alt="Post Image" className="w-1/2 h-full object-cover" onClick={() => toggleModal('image1')} />)
            )}
          </div>
        )}
        <div className="flex items-center justify-between mt-4 text-sm dark:text-white">
          <GetTime timestamp={post.created_At} />
          <div className='flex justify-center space-x-1'>
            <div className='h-5'>{post.replyCount || 0} &middot; </div>
            <MessageCircleCode className='h-4 pt-0.5' />
            <div>{post.replyCount || 0} &middot; </div>
            <button type='submit' onClick={() => {
              setLiked(prev => !prev);
            }}>
              {liked ? <ThumbsUp fill='orange' className='h-4' /> : <ThumbsUp className='h-4' />}
            </button>
          </div>
        </div>
      </div>
      {(isOpen && file[0] === 'i') && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={toggleModal}>
          {file === 'image' && (post.image && <img src={post.image} alt="Post Image" className="max-w-3/4 max-h-3/4" />)}
          {file === 'image1' && (post.video && <img src={post.video} alt="Post Image" className="max-w-3/4 max-h-3/4" />)}
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={toggleModal}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
