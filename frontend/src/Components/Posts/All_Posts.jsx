import React, { useState,useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';




export default function AllPosts() {
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts(){
    try {
     await axios.get(`/api/posts/getTweets`)
      .then((res) => {setPosts(res.data.posts)})

    } catch (error) {
      console.error('Error posting tweet:', error);
      // Optionally, handle error case
    }
  }

  function viewPost(postId){

  }
  return (
    <>
     {
      posts.slice().reverse().map(post=>(
        <PostCard key={post.id}  post={post} viewPost={viewPost} />
      ))
     }
    </>
  )
}