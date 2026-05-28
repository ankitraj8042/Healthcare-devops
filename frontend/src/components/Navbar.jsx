import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          🏥 Healthcare System
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className={isActive('/signup') ? 'active' : ''}>
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={isActive('/dashboard') ? 'active' : ''}
            >
              Appointments
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
