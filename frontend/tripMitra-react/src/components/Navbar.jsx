import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../images/temp-logo-tm.png'
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {

  const { token, user, logout } = useContext(AuthContext);
  const dashboardPath = user?.role === 'ADMIN' ? "/admin_dashboard" : "/dashboard";

  const handleLogout = () => {
    logout();
  };
  return (

    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={Logo} alt="logo" height={40} width={80} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>

        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-0 ms-lg-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</NavLink>
            </li>
            {token && (
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to={dashboardPath}>Dashboard</NavLink>
              </li>)
            }

            {token ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.name || user?.email || "Profile"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/profile">My Profile</NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/signup">Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar