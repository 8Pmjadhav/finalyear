import axios from "axios";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import ReplyCard from "./ReplyCard";
import {Error404} from '../index.js'

export default function ViewPost() {
    const location = useLocation();
    const { post } = location.state || false ;
    if(!post) return <Error404/>
    const [reply, setreply] = useState([]);
    const [likes, setLikes] = useState([]);
    const [refetch,setRefetch] = useState(false);
    const [notfound,setNotfound] = useState(false);

    const [newReply , setNewReply] = useState("");

    useEffect(() => {
        (async () => {
            try {
                await axios.get(`/api/posts/viewTweet/${post.id}`)
                    .then((res) => {
                         console.log(res);
                        setreply(res.data.postData.reply);
                        setLikes(res.data.postData.likes);
                    })
            } catch (error) {
                console.log(error);
            }
        })();
    }, [post,refetch])

    // console.log(reply, likes);
    async function postReply(e){
        e.preventDefault();
        try {
            await axios.post(`/api/reply/post/${post.id}/doReply`,{newReply})
                .then((res) => {
                    // console.log(res);
                    setRefetch(prev => !prev);
                    setNewReply("");
                    // setLikes(res.data.postData.likes);
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <PostCard post={post} />
            <div className="max-w-lg mx-auto bg-white dark:bg-stone-900 bottom-2 border-2 border-black dark:border-white shadow-md rounded-md overflow-hidden mb-4">
                <form className="flex w-full  space-x-1 " onSubmit={postReply}>
                    <input
                        className="flex-1 h-10 w-full rounded-md dark:text-white  bg-transparent px-3 py-1 text-sm placeholder:text-gray-600 dark:placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Reply"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                    ></input>
                    <button
                        type="submit"
                        className="hover:bg-slate-400"
                    >
                        <SendHorizonal fill="aqua" strokeWidth={1} className="h-8 w-8 mx-2"/>
                    </button>
                </form>
            </div>
            {
                reply.slice().reverse().map((rep)=>(
                    <ReplyCard key={rep.id} reply={rep} setRefetch={setRefetch}/>
                ))
            }
        </>
    )
}