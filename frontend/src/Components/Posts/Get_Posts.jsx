import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';




export default function GetPosts(props) {
  const params = useParams();
  const {flag,auser} = params || props;
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
      await axios.get(`/api/posts/getTweets`,{
        params:{
          flag,
          auser
        }
      })
        .then((res) => { 
          // console.log(res.data);
          setPosts(res.data.posts)
         })


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
        posts?.map(post => (
          <PostCard key={post.id} post={post} setRefetch0={setRefetch0} />
        )))
      }
    </>
  )
}