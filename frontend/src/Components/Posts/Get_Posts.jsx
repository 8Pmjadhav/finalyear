import React, { useState, useEffect } from 'react';
import { PostCard, Loader, client, ReplyCard } from '../index.js'
import { useParams } from 'react-router-dom';




export default function GetPosts(props) {
  const params = useParams();
  const { flag, user_id, searchQuery } = params || props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch0, setRefetch0] = useState(false);
  const [filter, setFilter] = useState(1);
  // console.log(flag, user_id);
  useEffect(() => {
    (async () => {
      await getPosts()
    }
    )();
  }, [refetch0, flag, searchQuery, filter]);

  async function getPosts() {
    try {
      await client.get(`/api/posts/getTweets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        params: {
          flag,
          user_id,
          searchQuery,
          filter
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
  // console.log(posts);

  return (
    <>
      {loading ? (<Loader />) : (
        <div >
          <div className='fixed top-30 right-2 lg:right-96'>
            <div className="mb-4">
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none border border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring"
              >
                <option value="0">Select Filter</option>
                <option value="1">Latest</option>
                <option value="2">Popularity</option>
              </select>
            </div>
          </div>
          <div>{
            (flag === 2) ?
              (
                posts.length ?
                  posts?.map((post) => (
                    <PostCard key={post.id} post={post} setRefetch0={setRefetch0} />
                  )) :
                  <div className="flex  justify-center lg:h-200px mt-5  dark:bg-black dark:text-white">
                    <div className="p-8  rounded-lg shadow-md dark:shadow-white border border-gray-600 max-w-2xl text-center">
                      <h1 className="text-4xl font-bold mb-4">Posts not found</h1>
                      <p className="text-lg text-gray-700 dark:text-gray-400">
                      </p>
                    </div>
                  </div>
              ) : (
                posts.length &&
                posts?.map((post) => (
                  post.type === 'reply' ? (
                    <ReplyCard key={post.id} reply={post} setRefetch={setRefetch0} />
                  ) :
                    (
                      <PostCard key={post.id} post={post} setRefetch0={setRefetch0} />
                    )
                ))
              )
          }
          </div>
        </div>
      )
      }
    </>
  )
}