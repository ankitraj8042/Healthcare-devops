import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const token = localStorage.getItem('token');

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => { setMenuOpen(false); setLangOpen(false); };

  const handleLogout = () => {
    localStorage.removeItem('token');
    closeMenu();
    window.location.href = '/login';
  };

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          🏥 HealthHub test2
        </Link>

        <div className="navbar-right">
          {/* Language Selector */}
          <div className="lang-selector">
            <button type="button" className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
              🌐 {currentLang?.short}
            </button>
            {langOpen && (
              <div className="lang-dropdown animate-scale-in">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`lang-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => { changeLanguage(lang.code); setLangOpen(false); }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button type="button" className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Hamburger */}
          <button type="button" className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.home')}</Link></li>
          <li><Link to="/doctors" className={`nav-link ${isActive('/doctors') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.doctors')}</Link></li>
          <li><Link to="/health-tools" className={`nav-link ${isActive('/health-tools') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.healthTools')}</Link></li>
          <li><Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.contact')}</Link></li>
          {token ? (
            <>
              <li><Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.dashboard')}</Link></li>
              <li><button type="button" className="btn btn-secondary btn-nav-logout" onClick={handleLogout}>{t('nav.logout')}</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.login')}</Link></li>
              <li><Link to="/signup" className="btn btn-primary btn-nav-signup" onClick={closeMenu}>{t('nav.signup')}</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
