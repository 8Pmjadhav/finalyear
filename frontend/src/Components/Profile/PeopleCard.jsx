import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";

export default function PeopleCard({ user }) {
     const user1 = useSelector(selectUser);         // logged in user
    const [edit, setEdit] = useState(false);
    let flag;
    useEffect(() => {
        if (user1.username === user.username) {
            setEdit(true);
        }

    }, [user])

    


    // console.log(user);


    

    return (

        <div className="max-w-xl mx-auto  bottom-2  dark:text-white border border-gray-600 shadow-md rounded-md overflow-hidden mb-1">
            <hr className='border border-gray-600 ' />

            <div className='flex justify-between'>
                <div className="flex items-center px-4">

                    <Link to={`/profile/${user.username}`}>
                        <div className="flex items-center p-4">
                            <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
                            <span className="font-semibold dark:text-white"> @{user.username}{edit && ' (You)'}</span>
                        </div>
                    </Link> 
                    </div>
               </div>
               <div className="flex justify-between px-4">
               <Link
                  className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/following/${flag = 1}/${user.id}` && 'bg-blue-600'}`} to={`/profile/${user.username}/following/${flag = 1}/${user.id}`}
                >
                <div className="text-center flex space-x-2">
                  <h4 className="text-lg font-bold">{user._count?.following}</h4>
                  <p className="text-gray-600">Followers</p>
                </div>
                </Link>
                <Link
                  className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/followers/${flag = 2}/${user.id}` && 'bg-blue-600'}`} to={`/profile/${user.username}/followers/${flag = 2}/${user.id}`}
                >
                  <div className="text-center flex space-x-2">
                    <h4 className="text-lg font-bold">{user._count?.followers}</h4>
                    <p className="text-gray-600">Following</p>
                  </div>
                </Link></div>
        </div>
    )
}