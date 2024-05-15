import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Error404 } from '../index.js'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice.js";

export function GetProfile() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const { username } = params;
 const user1 = useSelector(selectUser).username;

 

 const [isOpen, setIsOpen] = useState(false);
  const [file,setFile] = useState();

  function toggleModal(file) {
    setIsOpen(!isOpen);
    setFile(file);
  };

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
    else{
      setEdit(false);
    }
    getProfile();
  }, [user1,username])
  //getProfile();
  if (!user) {
    return (
      <Error404 />
    )
  }
  else {
    return (
      <div>
        <div className="bg-gray-100 min-h-screen dark:bg-slate-800">
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
          <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 ">
            <div className="max-w-4xl mx-auto bg-white dark:bg-black shadow-md rounded-lg overflow-hidden">
              {/* Avatar and Backcover */}
              <div className="relative">
                <img
                  className="w-full h-40 md:h-64 object-cover object-center"
                  src={user.backcover}
                  alt="Backcover"
                  onClick={() => toggleModal('backcover')} 
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white"
                    src={user.avatar}
                    alt="Avatar"
                    onClick={() => toggleModal('avatar')} 
                  />
                </div>
              </div>

              {/* Username */}
              <div className="text-center mt-4 md:mt-6">
                <h2 className="text-2xl md:text-3xl font-bold dark:text-white">@{user.username}</h2>
                <p className="text-gray-600 dark:text-white">{}{user.profession}</p>
              </div>

              {/* Description */}
              <div className="px-6 py-4 md:px-8 md:py-6">
                <p className="text-gray-700 dark:text-white text-sm md:text-base">
                  {user.description}
                </p>
              </div>

              {/* Followers and Following */}
              <div className="flex justify-around border-t border-gray-200 dark:text-white py-4">
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
        {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={toggleModal}>
          {file === 'avatar' && (user.avatar && <img src={user.avatar} alt="Avatar Image" className="max-w-2/4 max-h-2/4" />)}
          {file === 'backcover' && (user.backcover && <img src={user.backcover} alt="Backcover Image" className="max-w-3/4 max-h-3/4" />)}
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={toggleModal}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      </div>
    );
  }
}