import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Problems from './pages/Problems.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider } from '../context/AuthcontextProvider.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router=createBrowserRouter([
  {
  path:'/',
  element:<Layout/>,
  children:[
    {
      path:'',
      element:<Home/>
    },
    {
      path:'/problems',
      element:<Problems/>
    }
  ]

},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/signup',
  element:<Signup/>
}
]
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
  <AuthProvider>

    <RouterProvider router={router}/>
  
  </AuthProvider>
  <ToastContainer></ToastContainer>
  </StrictMode>
)
