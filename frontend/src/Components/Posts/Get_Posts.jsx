import React, { useState, useEffect } from 'react';
import {PostCard,Loader, client} from '../index.js'
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
      await client.get(`/api/posts/getTweets`, {
        headers:{
          'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
        },
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
        posts.length ? 
        posts?.map((post) => (
          <div>
          
          <PostCard key={post.id} post={post} setRefetch0={setRefetch0} />
          
          </div>
        )) : 
        <div className="flex  justify-center lg:h-200px mt-5  dark:bg-black dark:text-white">

        <div className="p-8  rounded-lg shadow-md dark:shadow-white border border-gray-600 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Posts not found</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
        </p>
      </div></div>)
      }
    </>
  )
}