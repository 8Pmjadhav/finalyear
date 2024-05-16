import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Loader from '../Loader';




export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch0, setRefetch0] = useState(false);

  useEffect(() => {
    (async () => {
      await getPosts()
    }
    )();
  }, [refetch0]);

  async function getPosts() {
    try {
      await axios.get(`/api/posts/getTweets`)
        .then((res) => { setPosts(res.data.posts) })


    } catch (error) {
      console.error('Error posting tweet:', error);
      // Optionally, handle error case
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <>

      {loading ? (<Loader />) : (
        posts.slice().reverse().map(post => (
          <PostCard key={post.id} post={post} setRefetch0={setRefetch0} />
        )))
      }
    </>
  )
}