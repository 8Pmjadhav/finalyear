import { useEffect, useState } from "react"
import { Header,Footer } from "./Components/index.js"; 
import axios from 'axios';
import { Outlet } from "react-router-dom";
//import 'dotenv/config';


export default function App() {
  
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

