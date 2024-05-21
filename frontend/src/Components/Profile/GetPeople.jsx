import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import {PeopleCard,Loader, client} from '../index.js'




export default function GetPeople(props) {
  const params = useParams();
  const { flag, user_id ,searchQuery} = params || props;
  const [loading, setLoading] = useState(true);
  const [people,setPeople] = useState();
  const [refetch0, setRefetch0] = useState(false);
//   console.log( user_id);
  useEffect(() => {
    (async () => {
      await getPeople()
    }
    )();
  }, [refetch0,flag,user_id,searchQuery]);

  async function getPeople() {
    try {
      await client.get(`/api/follow/getPeople`, {
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
          setPeople(res.data.people)
        })


    } catch (error) {
      console.error('Error gating People:', error);
      // Optionally, handle error case
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (<Loader />) : (
        people?.length ? 
        people?.map(p => (
          <div className='items-end'>
          
          <PeopleCard key={p.id} user={p?.following || p?.follower || p} setRefetch={setRefetch0} />
          
          </div>
        )): <div className="flex  justify-center lg:h-200px mt-5  dark:bg-black dark:text-white">

        <div className="p-8  rounded-lg shadow-md dark:shadow-white border border-gray-600 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Users not found</h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
        </p>
      </div></div>)
      }
    </>
  )
}