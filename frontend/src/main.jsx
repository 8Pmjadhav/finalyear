import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter,useLocation } from 'react-router-dom'
import { Home, Contact, Login, SignUp, Following_Posts, AllPosts, GetProfile } from './Components/index.js';
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
            path: '/following_post',
            element: <Following_Posts />
          },
          {
            path: '/allposts',
            element: <AllPosts />
          },
          {
            path: '/profile/:username',
            element: <GetProfile />,
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
