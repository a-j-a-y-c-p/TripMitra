import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  return (
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container-fluid">
    <NavLink class="navbar-brand" href="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvQHbmrL1LUyjF08sKQ5JKeX3EaUtdy7_1g&s" alt="logo" width={30} />
    </NavLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-0 ms-lg-auto">
        <li class="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Dashboard</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/login">Login</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/signup">Signup</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar