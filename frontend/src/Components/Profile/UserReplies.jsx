import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import {ReplyCard,Loader} from '../index.js'




export default function GetUserReplies(props) {
  const params = useParams();
  const {  user_id } = params || props;
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch0, setRefetch0] = useState(false);
//   console.log( user_id);
  useEffect(() => {
    (async () => {
      await getReplies()
    }
    )();
  }, [refetch0]);

  async function getReplies() {
    try {
      await axios.get(`/api/reply/getUserReplies`, {
        params: {
          user_id
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
        
        replies?.map(reply => (
          <div className='items-end'>
          
          <ReplyCard key={reply.id} reply={reply} setRefetch={setRefetch0} />
          
          </div>
        )))
      }
    </>
  )
}