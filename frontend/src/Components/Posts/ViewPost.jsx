import axios from "axios";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import {Error404,PostCard,ReplyCard,Loader,GoBackButton} from '../index.js'
import ReactLoading from 'react-loading';


export default function ViewPost() {
    const params = useParams()
    const pid = params.id ;
    // console.log(location);
    const [post,setPost] = useState(pid);
    const [loading,setLoading] = useState(true);
    const [reply_loading,setReply_loading] = useState(false);

    const [reply, setreply] = useState([]);
    const [likes, setLikes] = useState([]);
    const [refetch,setRefetch] = useState(false);

    const [newReply , setNewReply] = useState("");

    useEffect(() => {
        setReply_loading(true);
        (async () => {
            try {
                await axios.get(`/api/posts/viewTweet/${pid}`)
                    .then((res) => {
                        setPost(res.data.postData);
                        setreply(res.data.postData.reply);
                        setLikes(res.data.postData.likes);
                        setLoading(false);
                    })
            } catch (error) {
                console.log(error);
            }
        })();
        setReply_loading(false);
    }, [refetch])
    if(!post) return <Error404/>


    // console.log(reply, likes);
    async function postReply(e){
        e.preventDefault();
        setReply_loading(true);
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
        setReply_loading(false);
    }


    return (loading ? (<Loader/>):
        <>
            <PostCard post={post} setRefetch={setRefetch} />
            <div className="max-w-xl mx-auto  bottom-2 border-2 border-gray-600  shadow-md rounded-md overflow-hidden mb-4">
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
                        disabled = {reply_loading}
                    >
                       {reply_loading ?   <ReactLoading type='spin' color='#153448' height={'20px'} width={'20px'} className="mx-2" />
                        :<SendHorizonal fill="aqua" strokeWidth={1} className="h-8 w-8 mx-2"/>}
                    </button>
                </form>
            </div>
            {reply_loading ? <Loader/> :
                reply.map((rep)=>(
                    <ReplyCard key={rep.id} reply={rep} setRefetch={setRefetch}/>
                ))
            }
        </>
    )
}