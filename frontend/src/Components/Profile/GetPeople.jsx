import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import {PeopleCard,Loader} from '../index.js'




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
      await axios.get(`/api/follow/getPeople`, {
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
        
        people?.map(p => (
          <div className='items-end'>
          
          <PeopleCard key={p.id} user={p?.following || p?.follower || p} setRefetch={setRefetch0} />
          
          </div>
        )))
      }
    </>
  )
}