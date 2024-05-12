import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Error404 } from '../index.js'
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../../store/authSlice.js";

export function GetProfile() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const { username } = params;
 const dispatch = useDispatch();
 const user1 = useSelector(selectUsername).username;


  async function getProfile() {
    try {
      const response = await axios.get(`/api/profile/profile?username=${username}`);
      setUser(response.data);
      // console.log(response.data);
    } catch (error) {
      setUser(false)
      console.error("Error fetching profile:", error.response.data);
    }
  }
  useEffect(() => {
    if (user1 === username) {
      setEdit(true);
    }
    getProfile();
  }, [dispatch])
  //getProfile();
  if (!user) {
    return (
      <Error404 />
    )
  }
  else {
    return (
      <div>
        <div className="bg-gray-100 min-h-screen">
          {/* Header */}
          <header className="bg-blue-500 text-white py-4 flex justify-between">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            {edit && <Link to={`/profile/${user1}/update`}>
              <button className="bg-black mr-5 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Edit
              </button>
            </Link>}
          </header>

          {/* Profile Content */}
          <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              {/* Avatar and Backcover */}
              <div className="relative">
                <img
                  className="w-full h-40 md:h-64 object-cover object-center"
                  src={user.backcover}
                  alt="Backcover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white"
                    src={user.avatar}
                    alt="Avatar"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="text-center mt-4 md:mt-6">
                <h2 className="text-2xl md:text-3xl font-bold">{user.username}</h2>
                <p className="text-gray-600">Frontend Developer</p>
              </div>

              {/* Description */}
              <div className="px-6 py-4 md:px-8 md:py-6">
                <p className="text-gray-700 text-sm md:text-base">
                  {user.description}
                </p>
              </div>

              {/* Followers and Following */}
              <div className="flex justify-around border-t border-gray-200 py-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold">100</h3>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold">150</h3>
                  <p className="text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}