import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, NavLink, Outlet } from "react-router-dom";
import { Error404, Loader } from '../index.js'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice.js";
import { Pencil } from "lucide-react";

export function GetProfile() {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [follow, setFollow] = useState(false);
  const [refetch, setRefecth] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { username } = params;
  const user1 = useSelector(selectUser);

  let flag = 1;
  useEffect(() => {
    (async () => {
      await getProfile();

    })()

  }, [refetch,username])

  useEffect(() => {
    const ch = user?.following?.find((ele) => ele.follower_id === user1.id)
    if (ch) {
      setFollow(true);
    }
    if (user1.username === username) {
      setEdit(true);
    }
    else {
      setEdit(false);
    }
  }, [user]);


  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();

  function toggleModal(file) {
    setIsOpen(!isOpen);
    setFile(file);
  };
  async function getProfile() {
    try {
      await axios.get(`/api/profile/profile?username=${username}`)
        .then((response) => {
          setUser(response.data);
          // console.log(response.data);
        });

    } catch (error) {
      setUser(false)
      console.error("Error fetching profile:", error.response.data);
    }
    setLoading(false);
  }

  async function followUser() {
    try {
      await axios.post('/api/follow/follow_un_User', { user_id: user.id })
        .then((res) => {
          setRefecth(prev => !prev);
          setFollow(prev => !prev);
        });

      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching follow status:", error.response.data);
    }
  }



  //getProfile();
  if (!user) {
    return (
      <>{loading ? <Loader/>:<Error404 />}</>
    )
  }
  else {
    return (
      <div>
        <div className=" min-h-screen lg:mx-40 dark:text-white ">
          {/* Profile Content */}
          <div className="container mx-auto  ">
            <div className="max-w-xl mx-auto bg-white dark:bg-black border border-gray-600 shadow-md rounded-lg overflow-hidden">
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
                  {edit && <Link to={`/profile/${user1.username}/update`}>
                    <button className="absolute bottom-0 right-0 dark:bg-black bg-white mr-5  px-2 py-2 rounded-2xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      <Pencil className="h-5 w-5 " />
                    </button>
                  </Link>}
                </div>
              </div>

              {/* Username */}
              <div className="flex justify-between mt-4 md:mt-6 px-6 md:px-8">
                <div className="text-start ">
                  <h2 className="text-2xl md:text-3xl font-bold dark:text-white">@{user.username}{edit && ' (You)'}</h2>
                  <p className="text-gray-600 dark:text-white">{ }{user.profession}</p>
                </div>
                {!edit && <button
                  type='submit'
                  onClick={followUser}
                  className="inline-flex w-2/6 h-12 items-center justify-center rounded-md bg-green-500  px-2.5 py-1  font-semibold leading-7 text-white dark:text-black hover:bg-gray-600"
                >
                  {follow ? 'Following' : 'follow'}
                </button>}</div>

              {/* Description */}
              <div className="px-6 py-4 md:px-8 md:py-6">
                <p className="text-gray-700 dark:text-white text-sm md:text-base">
                  {user.description}
                </p>

              </div>

              {/* Followers and Following */}
              <div className="flex justify-around border-y border-gray-200 dark:text-white py-4">
              <Link
                  className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/following/${flag = 1}/${user.id}` && 'bg-blue-600'}`} to={`following/${flag = 1}/${user.id}`}
                >
                <div className="text-center">
                  <h3 className="text-lg font-bold">{user._count?.following}</h3>
                  <p className="text-gray-600">Followers</p>
                </div>
                </Link>
                <Link
                  className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/followers/${flag = 2}/${user.id}` && 'bg-blue-600'}`} to={`followers/${flag = 2}/${user.id}`}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{user._count?.followers}</h3>
                    <p className="text-gray-600">Following</p>
                  </div>
                </Link>

              </div>
              <header className="shadow sticky top-0 max-w-xl">
                <nav className=" border-gray-200 px-4 lg:px-6 py-2.5">
                  <div className="flex  justify-between items-center mx-auto">


                    <ul className="flex  mt-4 font-medium justify-between flex-grow lg:mt-0">
                      <li>
                        <Link
                          className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/posts/${flag = 1}/${user.id}` && 'bg-blue-600'}`} to={`posts/${flag = 1}/${user.id}`}
                        >
                          <span className="mx-2 text-sm font-medium">{user._count?.post} (Posts)</span>
                        </Link>

                      </li>
                      <li>
                        <Link
                          className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/replies/${user.id}` && 'bg-blue-600'}`} to={`replies/${user.id}`}
                        >
                          <span className="mx-2 text-sm font-medium">{user._count?.reply} (Replies)</span>
                        </Link>

                      </li>
                      <li>
                        <Link
                          className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/profile/${user.username}/likes/${flag = 2}/${user.id}` && 'bg-blue-600'}`} to={`likes/${flag = 2}/${user.id}`}
                        >
                          <span className="mx-2 text-sm font-medium">{user._count?.likes} (likes)</span>
                        </Link>


                      </li>

                    </ul>
                  </div>
                </nav>
              </header>
            </div>
          </div>

          <Outlet />
        </div>
        {isOpen && (
          <div className="fixed lg:top-32 lg:left-20 top-0 left-0 lg:h-2/5 lg:w-2/5 h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={toggleModal}>
            {file === 'avatar' && (user.avatar && <img src={user.avatar} alt="Avatar Image" className="h-full " />)}
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
