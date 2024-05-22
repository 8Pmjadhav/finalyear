import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { ReplyCard, Loader, client } from '../index.js'




export default function GetUserReplies(props) {
  const params = useParams();
  const { user_id, flag, searchQuery } = params || props;
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch0, setRefetch0] = useState(false);
  const [filter,setFilter] = useState(1);

  //   console.log( user_id);
  useEffect(() => {
    (async () => {
      await getReplies()
    }
    )();
  }, [refetch0,filter]);

  async function getReplies() {
    try {
      await client.get(`/api/reply/getUserReplies`, {
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
          setReplies(res.data.replies)
        })


    } catch (error) {
      console.error('Error gating replies:', error);
      // Optionally, handle error case
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <>
      {loading ? (<Loader />) : (
        <div>
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
          {replies.length ?
            replies?.map(reply => (
              <div className='items-end'>

                <ReplyCard key={reply.id} reply={reply} setRefetch={setRefetch0} />

              </div>
            )) : <div className="flex  justify-center lg:h-200px mt-5  dark:bg-black dark:text-white">

              <div className="p-8  rounded-lg shadow-md dark:shadow-white border border-gray-600 max-w-2xl text-center">
                <h1 className="text-4xl font-bold mb-4">Replies not found</h1>
                <p className="text-lg text-gray-700 dark:text-gray-400">
                </p>
              </div></div>}</div>)
      }
    </>
  )
}