import React from 'react'
import {createBrowserRouter, RouterProvider}from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

/*
RouterProvider es un componente genérico 
— no sabe de antemano cuáles son tus rutas. 
Por eso necesita que vos le pases el objeto router (creado previamente con createBrowserRouter) 
para saber qué mapeo de URLs → componentes tiene que usar.
*/
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
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
