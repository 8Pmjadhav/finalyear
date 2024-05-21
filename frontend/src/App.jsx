import { useEffect, useState } from "react";
import { Header, Footer, Error500,Loader } from "./Components/index.js";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from "./store/authSlice.js";
import { isAuthenticated } from "./hooks/user.js";

//import 'dotenv/config';




export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // console.log("Don't take following errors seriously");
  const accessToken = useSelector(selectAccessToken);
  const isServerDown = useSelector((state) => state.serverStatus.isDown);





  useEffect(() => {
    (async () => {
      try {

        await isAuthenticated(dispatch);
      } catch (error) {
        console.error('Error fetching authentication status:', error);
      } finally {
        setLoading(false); // Don't forget to set loading to false after fetching authentication status
      }
    })();

  }, [dispatch]);



  return (
    <>
    {
      loading ? ( <Loader />) : (
    <div className='min-h-screen font-mono flex flex-wrap content-between dark:bg-black dark:text-white bg-cover bg-fixed'
     >
     
      <div className={`w-full lg:mx-96 mdlglg:mx-80 mdlg:mx-40  md:mx-20  smmd:mx-0 ${!accessToken && 'flex flex-col justify-center items-center'}`}>
         <Header />
        <main >
          {isServerDown ? <Error500 /> : <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  )}
  </>)
}

