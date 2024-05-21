import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetTime } from "./basic";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import { Merge, Pencil, Trash2 } from "lucide-react";
import ReactLoading from 'react-loading';
import {Loader} from '../index.js';



export default function ReplyCard({ reply, setRefetch }) {
    const [edit, setEdit] = useState(false);
    const [editry, setEditry] = useState(false);
    const [replyContent, setReplyContent] = useState(reply.content);
    const [loading,setLoading] = useState(false);
    const [deleteLoading,setDeleteLoading] = useState(false);

    const user = useSelector(selectUser);


    useEffect(() => {
        setLoading(false);
        if (user.username === reply.user.username) {
            setEdit(true);
        }
        
    }, [user, reply])

    async function submitEditedReply() {
        try {
            await axios.put(`/api/reply/editReply/${reply.id}`, { 
                    replyContent:replyContent
                },
                {
                    headers:{
                        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                      },
                }  
             )
                .then((res) => {
                    // console.log(replyContent);
                    setRefetch(prev => !prev);
                    // setNewReply('');
                    // setLikes(res.data.postData.likes);
                })
        } catch (error) {
            console.log(error);
        }
    }


    async function deleteReply() {
        setDeleteLoading(true);
        try {
            await axios.delete(`/api/reply/deleteReply/${reply.id}`,{
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then((res) => {
                    // console.log(res);
                    setDeleteLoading(false);
                    setRefetch(prev => !prev);
                    
                    // setNewReply('');
                    // setLikes(res.data.postData.likes);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        
        <>{loading ? <Loader/> :
        <div className="max-w-xl mx-auto bottom-2  dark:text-white border border-gray-600 shadow-md rounded-md overflow-hidden mb-1">
            <hr className='border border-gray-600 ' />

            <div className='flex justify-between'>
                <div className="flex items-center p-4">
                    <Link to={`/posts/viewPost/${reply.post_id}`}><Merge className="h-5 w-5 " /></Link>

                    <Link to={`/profile/${reply.user.username}`}>
                        <div className="flex items-center p-4">
                            <img src={reply.user.avatar} alt={reply.user.username} className="w-8 h-8 rounded-full mr-2" />
                            <span className="font-semibold dark:text-white"> @{reply.user.username}{edit && ' (You)'}</span>
                        </div>
                    </Link> </div>
                {edit &&
                    (<div className='flex items-center p-4 space-x-3'>

                        <button
                            type='button'
                            onClick={() => {
                                setEditry(prev => !prev);
                                editry && submitEditedReply();
                            }}
                            className="inline-flex w-full items-center justify-center rounded-md bg-green-500  px-2.5 py-1  font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
                        >
                            {editry ? 'Submit' : <Pencil className="h-5 w-5" />}
                        </button>

                        <button
                            type="submit"
                            onClick={deleteReply}
                            disabled={deleteLoading}
                            className="inline-flex w-full items-center justify-center rounded-md bg-red-500  px-2.5 py-1 font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
                        >
                            {deleteLoading ? (
                                <ReactLoading type='spin' color='#153448' height={'20px'} width={'20px'} />
                            ) : <Trash2 className='h-5 w-5' />}
                        </button>
                    </div>
                    )}</div>
            <div className="p-4">
                {!editry ? <p className="text-black dark:text-white whitespace-pre-line">{replyContent}</p> : (
                    <textarea
                        id="content"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="resize border  border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none focus:ring h-28 w-full"
                    ></textarea>
                )}
                <div className="text-sm mt-3">
                    <GetTime timestamp={reply.created_At} />
                </div>

            </div>
        </div>}</>
    )
}