import React, { useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage'
import WritePostPage from './pages/WritePostPage'
import Header from './components/Header'
import Footer from './components/Footer'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Header />
      <HomePage />
      <Footer />
      </div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/post/:id",
    element: <div>
      <Header />
      <SinglePostPage />
      <Footer />
      </div>,
  },
  {
    path: "/write",
    element: <div>
      <Header />
      <WritePostPage />
      <Footer />
      </div>,
  },
]);

function App() {

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
