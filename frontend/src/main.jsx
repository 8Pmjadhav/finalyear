import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home, Contact, Login, SignUp, ForgotPassword,
  GetProfile, UpdateProfile,
  Following_Posts, AllPosts,
  CreatePost, ViewPost, EditPost
} from './Components/index.js';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'following_post',
            element: <Following_Posts />
          },
          {
            path: 'allposts',
            element: <AllPosts />
          },
          {
            path: 'profile/:username', // Relative path
            element: <GetProfile />,
          },
          {
            path: 'profile/:username/update', // Relative path to render UpdateProfile
            element: <UpdateProfile />
          },
          {
            path: 'posts/createPost',
            element: <CreatePost />
          },
          {
            path: 'posts/viewPost/:id',
            element: <ViewPost />,
            
          },
          {
            path: 'posts/viewPost/:id/editPost',
            element: <EditPost />
          }
        ]
      },


      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
