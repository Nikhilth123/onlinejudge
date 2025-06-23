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
import AddProblemForm  from './pages/AddProblemForm.jsx'
import EditProblemForm from './pages/EditProblemForm.jsx'
import Notfound from './pages/Notfound.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

const router=createBrowserRouter([
  {
  path:'/',
  element:<Layout/>,
  errorElement:<ErrorPage/>,
  children:[
    {
      path:'',
      element:<Home/>
    },
    {
      path:'/problems',
      element:<Problems/>
    },
    {path:'/addproblem',
      element:<AddProblemForm></AddProblemForm>

    },{
      path:'/problems/edit/:id',
      element:<EditProblemForm/>
    },
    {
  path:'*',
  element:<Notfound/>
}
  
  ]

},
{
  path:'/login',
  element:<Login/>,
  errorElement:<ErrorPage/>
},
{
  path:'/signup',
  element:<Signup/>,
  errorElement:<ErrorPage/>
},
{
  path:'*',
  element:<Notfound/>
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
