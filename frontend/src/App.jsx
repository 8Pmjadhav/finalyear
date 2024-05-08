import { useEffect, useState } from "react";
import { Header,Footer } from "./Components/index.js"; 
import axios from 'axios';
import { Outlet } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { selectAccessToken} from "./store/authSlice.js";
import { isAuthenticated } from "./hooks/user.js";
import Loader from "./Components/Loader.jsx";
//import 'dotenv/config';




export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const accessToken = useSelector(selectAccessToken);



  useEffect(()=>{
    ( async () => {
      try {
        await isAuthenticated(dispatch);
      } catch (error) {
        console.error('Error fetching authentication status:', error);
      } finally {
        setLoading(false); // Don't forget to set loading to false after fetching authentication status
      }
    }) ();
  
  },[dispatch]);

  //setLoading(false);
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-500'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Loader/>
  )
}

