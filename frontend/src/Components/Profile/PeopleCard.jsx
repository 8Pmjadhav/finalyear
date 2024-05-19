import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";

export default function PeopleCard({ user, setRefetch }) {
     const user1 = useSelector(selectUser);         // logged in user
    const [edit, setEdit] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (user1.username === user.username) {
            setEdit(true);
        }

    }, [user])

    useEffect(() => {
        // This effect will run whenever the location changes
        console.log("Pathname changed:", location.pathname);
    }, [location.pathname]);


    console.log(user);


    

    return (

        <div className="max-w-xl mx-auto  bottom-2  dark:text-white border border-gray-600 shadow-md rounded-md overflow-hidden mb-1">
            <hr className='border border-gray-600 ' />

            <div className='flex justify-between'>
                <div className="flex items-center p-4">

                    <Link to={`/profile/${user.username}`}>
                        <div className="flex items-center p-4">
                            <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
                            <span className="font-semibold dark:text-white"> @{user.username}{edit && ' (You)'}</span>
                        </div>
                    </Link> </div>
               </div>
        </div>
    )
}