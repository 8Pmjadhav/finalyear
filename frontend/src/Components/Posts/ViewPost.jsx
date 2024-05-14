import axios from "axios";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";

export default function ViewPost(){
    const location = useLocation();
    const { post } = location.state || {};

    return (
        <>
            <PostCard post={post}/>
        </>
    )
}