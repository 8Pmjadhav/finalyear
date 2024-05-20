import { useEffect, useState } from "react"
import { useParams, Link, Outlet } from "react-router-dom"


export default function HandleSearch() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState();
  const user = {
    username: 'arvind',
    user_id: 1
  }
  let flag = 1;
  useEffect(() => {
    setSearchQuery(params.searchQuery);
  }, [params]);

  return (
    <div className=" min-h-screen lg:mx-40 dark:text-white ">
      {/* Profile Content */}
      <div className="container mx-auto  ">
        <div className="max-w-xl mx-auto bg-white dark:bg-black border border-gray-600 shadow-md rounded-lg overflow-hidden">
          <header className="shadow sticky top-0 max-w-xl">
            <nav className=" border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex  justify-between items-center mx-auto">


                <ul className="flex   font-medium justify-between flex-grow lg:mt-0">
                  <li>
                    <Link
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/search/${searchQuery}/posts/${flag = 3}` && 'bg-blue-600'}`} to={`posts/${flag = 3}`}
                    >
                      <span className="mx-2 text-sm font-medium">{user._count?.post} (Posts)</span>
                    </Link>

                  </li>
                  <li>
                  <Link
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/search/${searchQuery}/people/${flag = 3}` && 'bg-blue-600'}`} to={`people/${flag = 3}`}
                    >
                      <span className="mx-2 text-sm font-medium">{user._count?.post} (People)</span>
                    </Link>

                  </li>
                  <li>
                  <Link
                      className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600 
                              ${location.pathname === `/search/${searchQuery}/replies/${flag = 1}` && 'bg-blue-600'}`} to={`replies/${flag = 1}`}
                    >
                      <span className="mx-2 text-sm font-medium">{user._count?.post} (replies)</span>
                    </Link>

                  </li>
                  

                </ul>
              </div>
            </nav>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  )
}