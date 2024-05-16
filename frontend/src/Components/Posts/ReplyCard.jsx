import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { GetTime  } from "./basic";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";

export default function ReplyCard({ reply,setRefetch }) {
    const [edit, setEdit] = useState(false);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user.username === reply.user.username) {
          setEdit(true);
        }
        
      }, [user, reply])

    async function deleteReply(){
        try {
            await axios.delete(`/api/reply/deleteReply/${reply.id}`)
                .then((res) => {
                    // console.log(res);
                    setRefetch(prev => !prev);
                    // setNewReply('');
                    // setLikes(res.data.postData.likes);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-stone-900 bottom-2 border-2 border-black dark:border-white shadow-md rounded-md overflow-hidden mb-4">
            <div className='flex justify-between'>
                <Link to={`/profile/${reply.user.username}`}>
                    <div className="flex items-center p-4">
                        <img src={reply.user.avatar} alt={reply.user.username} className="w-8 h-8 rounded-full mr-2" />
                        <span className="font-semibold dark:text-white"> @{reply.user.username}</span>
                    </div>
                </Link>
                {edit &&
                    (<div className='flex items-center p-4 space-x-3'>
                        <Link to='/reply/:id'>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-green-500  px-2.5 py-1  font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
                            >
                                Edit
                            </button></Link>
                        
                            <button
                                type="submit"
                                onClick={deleteReply}
                                className="inline-flex w-full items-center justify-center rounded-md bg-red-500  px-2.5 py-1 font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
                            >
                                Delete
                            </button>
                    </div>
                    )}</div>
            <div className="p-4">
                <p className="text-black dark:text-white">{reply.content}</p>
                <div className="text-sm mt-3">
                    <GetTime timestamp={reply.created_At}/>
                </div>
                
            </div>
        </div>
    )
}