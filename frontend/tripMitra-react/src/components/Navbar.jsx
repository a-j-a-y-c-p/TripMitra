import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/temp-logo-tm.png';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  const dashboardPath = user?.role === 'ADMIN' ? "/admin_dashboard" : "/dashboard";

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid">
        
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} alt="logo" height={40} width={80} className="me-2" />
        </NavLink>

        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                to="/"
              >
                Home
              </NavLink>
            </li>

            {token && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  to={dashboardPath}
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {token ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div
                    className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2"
                    style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}
                  >
                    {user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="d-none d-lg-inline">
                    {user?.name || user?.email || "User"}
                  </span>
                </a>
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
                  <NavLink
                    className={({ isActive }) => isActive
                      ? "btn btn-outline-light me-2"
                      : "btn btn-outline-secondary me-2"}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => isActive
                      ? "btn btn-light"
                      : "btn btn-primary"}
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
