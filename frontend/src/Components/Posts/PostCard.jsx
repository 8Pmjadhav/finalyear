import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();

  function toggleModal(file) {
    setIsOpen(!isOpen);
    setFile(file);
  };
  const videoPath = post.video;
  const extension = post.video && videoPath.split('.').pop();
  //  console.log(post.replyCount,extension);
  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-stone-900 bottom-2 border-2 border-black dark:border-white shadow-md rounded-md overflow-hidden mb-4">
      <Link to={`/profile/${post.user.username}`}>
        <div className="flex items-center p-4">
          <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full mr-2" />
          <span className="font-semibold dark:text-white"> @{post.user.username}</span>
        </div>
      </Link>
      <div className="p-4">
        <Link to= {`/posts/viewPost/:${post.id}`} state={{post}}><p className="text-gray-700 dark:text-gray-50">{post.content}</p></Link>
        {(post.image || post.video) && (
          <div className={`relative mt-4 h-60 flex border-2 rounded-md border-black dark:border-white ${(post.image && post.video) ? 'justify-center':""}`}>
            {post.image && (
              <img src={post.image} alt="Post Image" className={`${post.video ? "w-1/2" : "w-full"} h-full object-cover`} onClick={() => toggleModal('image')} />
            )}
            {post.video && (
              (extension === 'mp4' || extension === 'mkv') ?
                (<video src={post.video} className="w-1/2 h-full object-cover" onClick={() => toggleModal('video')} controls></video>)
                : (<img src={post.video} alt="Post Image" className="w-1/2 h-full object-cover" onClick={() => toggleModal('image1')} />)
            )}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <button className="flex items-center text-gray-600 hover:text-gray-800 mr-2" onClick={() => console.log('Liked')}>
              <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18l-1.45-1.316C3.002 12.26 1 9.498 1 6.667 1 4.031 3.178 2 5.667 2c1.614 0 3.07.93 4.333 2.333C10.93 2.93 12.385 2 14 2 16.519 2 19 4.431 19 6.667c0 2.831-2.002 5.593-8.55 10.017L10 18z"
                  clipRule="evenodd"
                />
              </svg>
              {post.likeCount}
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => console.log('Replied')}>
              <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2.542 13.148a9.002 9.002 0 0 1 13.31-9.647 9.002 9.002 0 0 1-13.31 9.647zm1.058.058a7 7 0 1 0 10.414-7.588 7 7 0 0 0-10.414 7.588z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M8.128 11.948c0-.778.39-1.334.904-1.76l.045-.04a4.8 4.8 0 0 1 7.13-4.4 1 1 0 0 1 .017 1.408l-.013.015-.038.04c-.452.46-1.034.765-1.65.902l-.093.017c-.75 0-1.42-.29-1.927-.79l-.054-.052c-.506-.5-.793-1.192-.793-1.916A3.802 3.802 0 0 1 15.2 4.6a4.8 4.8 0 0 1 4.7 3.775c.041.248.064.514.07.796a5.8 5.8 0 0 1-5.915 5.888l-.123-.001c-1.16.03-2.138-.64-2.607-1.488l-.017-.029a4 4 0 1 0-7.562.012l-.01.023C2.723 11.322 2 12.15 2 13.216c0 .363.082.706.23 1.004l.067.112c.031.053.055.111.073.171.005.03.01.061.013.091.003.033.004.067.004.102z"
                  clipRule="evenodd"
                />
              </svg>
              {post.replyCount}
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
