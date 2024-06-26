import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Error404, PostCard, ReplyCard, Loader, client } from '../index.js'
import ReactLoading from 'react-loading';


export default function ViewPost() {
    const params = useParams()
    const post_id = params.id;
    // console.log(location);
    const [post, setPost] = useState(post_id);
    const [loading, setLoading] = useState(true);
    const [reply_loading, setReply_loading] = useState(false);
    const [filter,setFilter] = useState(1);


    const [reply, setreply] = useState([]);
    const [likes, setLikes] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const [newReply, setNewReply] = useState("");

    useEffect(() => {
        setReply_loading(true);
        (async () => {
            try {
                await client.get(`/api/posts/viewTweet/${post_id}`, {
                    params:{
                        filter
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                })
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
    }, [refetch,filter])
    if (!post) return <Error404 />


    // console.log(reply, likes);
    async function postReply(e) {
        e.preventDefault();
        setReply_loading(true);
        try {
            await client.post(`/api/reply/post/${post.id}/doReply`, { newReply }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
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


    return (loading ? (<Loader />) :
        <>
            <PostCard post={post} setRefetch={setRefetch} />

            <div className="max-w-xl mx-auto  bottom-2 border  border-gray-600  shadow-md rounded-md overflow-hidden mb-4">

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
                        disabled={reply_loading}
                    >
                        {reply_loading ? <ReactLoading type='spin' color='#153448' height={'20px'} width={'20px'} className="mx-2" />
                            : <SendHorizonal fill="aqua" strokeWidth={1} className="h-8 w-8 mx-2" />}
                    </button>

                </form>
            </div>
            {reply_loading ? <Loader /> :
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
                    {reply.map((rep) => (
                        <ReplyCard key={rep.id} reply={rep} setRefetch={setRefetch} />
                    ))}
                </div>
            }
        </>
    )
}