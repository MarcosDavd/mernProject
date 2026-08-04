import React from 'react'
import {createBrowserRouter, RouterProvider}from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Verify from './pages/Verify';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
/*
RouterProvider es un componente genérico 
— no sabe de antemano cuáles son tus rutas. 
Por eso necesita que vos le pases el objeto router (creado previamente con createBrowserRouter) 
para saber qué mapeo de URLs → componentes tiene que usar.
*/
const router = createBrowserRouter([
  {
    path:'/home',
    element:<><ProtectedRoute></ProtectedRoute><Navbar/><Home/></>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },{
    path:'/verify',
    element:<VerifyEmail/>
  },{
    path:'/verify/:token',
    element: <Verify/>
  },{
    path:'/forgot-password',
    element:<ForgotPassword/>
  }

]);
// le paso mi router con contexto de mis rutas
const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
