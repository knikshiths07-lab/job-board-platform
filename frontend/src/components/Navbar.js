import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getToken } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">JobBoard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employer">Employer</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {token ? (
              <> 
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <> 
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
