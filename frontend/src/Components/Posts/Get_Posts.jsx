import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {PostCard,Loader} from '../index.js'
import { useParams } from 'react-router-dom';




export default function GetPosts(props) {
  const params = useParams();
  const { flag, user_id , searchQuery } = params || props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch0, setRefetch0] = useState(false);
  // console.log(flag, user_id);
  useEffect(() => {
    (async () => {
      await getPosts()
    }
    )();
  }, [refetch0,flag,searchQuery]);

  async function getPosts() {
    try {
      await axios.get(`/api/posts/getTweets`, {
        params: {
          flag,
          user_id,
          searchQuery
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
        
        posts?.map((post) => (
          <div>
          
          <PostCard key={post.id} post={post} setRefetch0={setRefetch0} />
          
          </div>
        )))
      }
    </>
  )
}