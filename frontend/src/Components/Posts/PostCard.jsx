import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice.js';
import ReactLoading from 'react-loading';
import { GetTime } from './basic.jsx';
import { MessageCircleCode, ThumbsUp,Trash2,Pencil } from 'lucide-react';
import {client} from '../index.js';

const PostCard = ({ post, setRefetch0 ,setRefetch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading] = useState(false);


  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();             // which one img or img1 or video should open big
  const [liked, setLiked] = useState(false)
  const [edit, setEdit] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.username === post.user.username) {
      setEdit(true);
    }
    const isliked = post?.likes.find((ele)=> ele.user_id===user.id)
    if (isliked ) {
      //  console.log(user.id, post.likes);
      setLiked(true);
    }
  }, [ post])
// console.log(post);

async function deletePost() {
  setLoading(true);
    try {
      await client.delete(`/api/posts/deleteTweet/${post.id}`,{
        headers:{
          'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`,
        }
      })
        .then((res) => {
          setRefetch0 && setRefetch0(prev => !prev);
          setRefetch && setRefetch(prev => !prev);
          setLoading(false);
          location.pathname[7]==='v' && navigate(-1);
          
          
        })
    } catch (error) {
      console.log(error);
    }
  }

  async function likePost() {
    try {
      await client.delete(`/api/posts/likeTweet/${post.id}`,{
        headers:{
          'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => {
          setRefetch0 && setRefetch0(prev => !prev);
          setRefetch && setRefetch(prev => !prev);
          
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
    <div className="max-w-xl mx-auto bg-white dark:bg-black bottom-2 border border-gray-600  shadow-md rounded-md overflow-hidden mb-1"
     >
      <hr className='border border-gray-600 ' />
      <div className='flex justify-between'>
        <Link to={`/profile/${post.user.username}`}>
          <div className="flex items-center p-4">
            <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full mr-2" />
            <span className="font-semibold dark:text-white"> @{post.user.username}{ edit && ' (You)'}</span>
          </div>
        </Link>
        {edit &&
          (<div className='flex items-center p-4 space-x-3'>
            <Link to={`/posts/viewPost/${post.id}/editPost`} >
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-green-500  px-2.5 py-1  font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
              >
                <Pencil className="h-5 w-5"/>
              </button></Link>
            <button
              type="submit"
              onClick={deletePost}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-red-500  px-2.5 py-1 font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
            >
              {loading ? (
            <ReactLoading type='spin' color='#153448' height={'20px'} width={'20px'} />
            ):<Trash2 className='h-5 w-5'/>}
            </button>
          </div>
          )}</div>
      <div className="p-4">
        <Link to={`/posts/viewPost/${post.id}`}state={{ id:post.id }}>
          <p className="text-gray-700 dark:text-gray-50 whitespace-pre-line">{post.content}</p>
        </Link>
        {(post?.image || post?.video) && (
          <div className={`relative mt-4 h-72 flex border rounded-md border-gray-600  ${(post?.image && post?.video) ? 'justify-center' : ""}`}>
            {post?.image && (
              <img src={post.image} alt="Post Image" className={`${post.video ? "w-1/2" : "w-full"} h-full object-contain`} onClick={() => toggleModal('image')} />
            )}
            {post?.video && (
              (extension === 'mp4' || extension === 'mkv') ?
                (<video src={post.video} className={`${post.image ? "w-1/2" : "w-full"} h-full object-contain`} onClick={() => toggleModal('video')} controls></video>)
                : (<img src={post.video} alt="Post Image" className="w-1/2 h-full object-contain" onClick={() => toggleModal('image1')} />)
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 text-sm dark:text-white">
          <GetTime timestamp={post.created_At} />
          <div className='flex justify-center space-x-1'>
            <div className='flex justify-center space-x-1'>
              {post._count.reply || 0} &middot; </div>
            <Link to={`/posts/viewPost/${post.id}`}>
              <MessageCircleCode className='h-4 pt-0.5' />
            </Link>

            <div>{post._count.likes || 0} &middot; </div>
            <button type='submit' onClick={() => {
              setLiked(prev => !prev);
              likePost();
            }}>
              {liked ? <ThumbsUp fill='orange' className='h-4' /> : <ThumbsUp className='h-4' />}
            </button>
          </div>
        </div>
      </div>
      {(isOpen && file[0] === 'i') && (
        <div className="fixed lg:top-32 lg:left-20 top-0 left-0 lg:h-2/5 lg:w-2/5 h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={toggleModal}>
          {file === 'image' && (post.image && <img src={post.image} alt="Post Image" />)}
          {file === 'image1' && (post.video && <img src={post.video} alt="Post Image" />)}
          <button className="absolute top-2 right-2 text-red-800 hover:text-gray-300" onClick={toggleModal}>
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
