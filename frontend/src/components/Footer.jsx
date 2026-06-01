import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">🏥 HealthHub</h3>
            <p className="footer-tagline">
              Connecting patients with top-rated physicians.
              Quality healthcare made simple and accessible.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/dashboard">Appointments</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><span>General Checkup</span></li>
              <li><span>Cardiology</span></li>
              <li><span>Dermatology</span></li>
              <li><span>Pediatrics</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links footer-contact">
              <li>📍 123 Medical Center Dr.</li>
              <li>📞 (555) 123-4567</li>
              <li>✉️ support@healthhub.com</li>
              <li>🕐 Mon–Sat: 8AM–8PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} HealthHub. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
