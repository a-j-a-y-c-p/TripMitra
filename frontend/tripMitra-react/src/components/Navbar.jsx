import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex bg-black text-white justify-between min-h-10'>
      <div>
        <img className='pt-1.5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvQHbmrL1LUyjF08sKQ5JKeX3EaUtdy7_1g&s" alt="logo" width={30} />
      </div>
      <div className='flex justify-content-between space-x-3 mx-3'>
        <NavLink className={(e)=>{return e.isActive?"bg-blue-700 p-1.5":"p-1.5"}} to="/">Home</NavLink>
        <NavLink className={(e)=>{return e.isActive?"bg-blue-700 p-1.5":"p-1.5"}} to="/dashboard">Dashboard</NavLink>
        <NavLink className={(e)=>{return e.isActive?"bg-blue-700 p-1.5":"p-1.5"}} to="/login">Login</NavLink>
      </div>

    </nav>
  )
}

export default Navbar