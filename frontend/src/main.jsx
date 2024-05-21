import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home, Contact, Login, SignUp, ForgotPassword,
  GetProfile, UpdateProfile,GetUserReplies,GetPeople,
   GetPosts,CreatePost, ViewPost, EditPost,
  HandleSearch,
  Welcome,
  Settings,ChangePassword , DeleteAccount
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
            path:'settings',
            element:<Settings/>,
            children :[
              {
                path:'changePassword',
                element:<ChangePassword/>
              },
              {
                path:'deleteAccount',
                element:<DeleteAccount/>
              }
            ]
          },
          {
            path:'search/:searchQuery',
            element:<HandleSearch/>,
            children:[
              {
                path:'posts/:flag',
                element:<GetPosts/>
              },
              {
                path:'people/:flag',
                element:<GetPeople/>
              },
              {
                path:'replies/:flag',
                element:<GetUserReplies/>
              }
            ]
          },
          {
            path:'',
            element:<Welcome/>
          },
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'following_post/:flag',
            element: <GetPosts />
          },
          {
            path: 'getposts/:flag',
            element: <GetPosts />
          },
          {
            path: 'profile/:username', // Relative path
            element: <GetProfile />,
            children:[
              {
                path:'posts/:flag/:user_id',
                element:<GetPosts/>,
              },
              {
                path:'replies/:user_id',
                element: <GetUserReplies/>,
              },
              {
                path:'likes/:flag/:user_id',
                element:<GetPosts/>,
              },
              {
                path:'followers/:flag/:user_id',
                element:<GetPeople/>,
              },
              {
                path:'following/:flag/:user_id',
                element:<GetPeople/>,
              }
            ]
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
