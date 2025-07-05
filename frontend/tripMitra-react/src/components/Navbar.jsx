import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

  var currentLinkClass = "currectNavLink col-auto mx-3 px-2"
  var linkClass = "NavLink col-auto mx-3 px-2"

  return (
    <nav className='row bg-primary text-success justify-content-between min-h-full'>
      <div className='col-4 flex-grow-1'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvQHbmrL1LUyjF08sKQ5JKeX3EaUtdy7_1g&s" alt="logo" width={30} />
      </div>
      <div className='col-auto row mx-2'>
        <NavLink className={(e)=>{return e.isActive?currentLinkClass:linkClass}} to="/">Home</NavLink>
        <NavLink className={(e)=>{return e.isActive?currentLinkClass:linkClass}} to="/dashboard">Dashboard</NavLink>
        <NavLink className={(e)=>{return e.isActive?currentLinkClass:linkClass}} to="/login">Login</NavLink>
      </div>

    </nav>
  )
}

export default Navbar