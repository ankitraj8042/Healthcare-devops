import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    closeMenu();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          🏥 HealthHub
        </Link>

        <button
          type="button"
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/doctors"
              className={`nav-link ${isActive('/doctors') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Doctors
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-secondary btn-nav-logout"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="btn btn-primary btn-nav-signup"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
