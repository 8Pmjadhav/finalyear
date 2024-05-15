import axios from "axios";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewPost(){
    const location = useLocation();
    const { post } = location.state || {};
    const [reply,setreply] = useState([]);
    const [likes,setLikes] = useState([]);

    useEffect(()=>{
        (async ()=>{
            try {
                await axios.get(`/api/posts/viewTweet?post_id=${post.id}`)
                    .then((res)=>{
                        console.log(res);
                        setreply(res.data.post.reply);
                        setLikes(res.data.post.likes);
                    })
            } catch (error) {
                console.log(error);
            }
        })();
    },[post])
    
    console.log(reply,likes);

    

    return (
        <>
            <PostCard post={post}  />
            
        </>
    )
}