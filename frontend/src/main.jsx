import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home,Contact,Login,SignUp} from './Components/index.js';
import './index.css';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path:'',
        element:<Home/>
      },
      {
        path:'contact',
        element:<Contact/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'signup',
        element:<SignUp/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
