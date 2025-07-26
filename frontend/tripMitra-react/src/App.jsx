import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import React from 'react'
import './css/logo.css'
import Logo from './components/Logo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Navbar />
      <Logo />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App