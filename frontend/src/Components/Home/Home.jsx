import React,{useState,useEffect} from 'react';
import Loader from '../Loader.jsx';
import Sidebar from './Sidebar.jsx';


import axios from 'axios';
import { selectAccessToken } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../Auth/Login.jsx';


export default function Home() {
  
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  // console.log(accessToken);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false once authentication state is resolved
  }, [accessToken]);

  if (loading) {
    return (
      <Loader/>
    ); // Render nothing while loading
  }

  

  if(accessToken){
    return (
      <div className="mt-14">
      <div className="flex">
      {/* Sidebar component */}
      <Sidebar  dispatch={dispatch}/>
      {/* Main content */}
      <div className="flex-1 lg:p-10 bg-yellow-50 lg:m-8 lg:ml-72 ">
        <Outlet/>
      </div>
    </div>
    </div>
    )
  }
  else{
    return (
      <Login/>
    )
  }
    
  }                
  