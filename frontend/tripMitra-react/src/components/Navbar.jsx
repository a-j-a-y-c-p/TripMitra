import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'


const Navbar = () => {

  return (
    
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
  <div className="container-fluid">
    
    <NavLink className="navbar-brand" href="/">
      <Logo />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-0 ms-lg-auto">
        <li className="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/dashboard">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/signup">Signup</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar