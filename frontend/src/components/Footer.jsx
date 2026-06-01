import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">🏥 HealthHub</h3>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/doctors">{t('nav.doctors')}</Link></li>
              <li><Link to="/dashboard">{t('nav.dashboard')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.services')}</h4>
            <ul className="footer-links">
              <li><span>General Medicine</span></li>
              <li><span>Cardiology</span></li>
              <li><span>Ayurveda</span></li>
              <li><span>Homeopathy</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.contactUs')}</h4>
            <ul className="footer-links footer-contact">
              <li>📍 Connaught Place, New Delhi</li>
              <li>📞 +91 11-2345-6789</li>
              <li>✉️ support@healthhub.in</li>
              <li>🕐 Mon–Sat: 9AM–8PM IST</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} HealthHub. {t('footer.rights')}</p>
          <div className="footer-bottom-links">
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
