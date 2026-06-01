import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ClinicMap from '../components/ClinicMap';
import './Contact.css';

function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const CONTACT_INFO = [
    { icon: '📍', titleKey: 'contact.visitUs', detail: 'Connaught Place, New Delhi\n110001, India' },
    { icon: '📞', titleKey: 'contact.callUs', detail: '+91 11-2345-6789\nMon–Sat: 9AM–8PM IST' },
    { icon: '✉️', titleKey: 'contact.emailUs', detail: 'support@healthhub.in\n24 hrs response time' },
    { icon: '💬', titleKey: 'contact.liveChat', detail: '24/7 Available\nAvg response: 2 min' },
  ];

  const FAQ_KEYS = [1, 2, 3, 4, 5];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="section-label">{t('contact.label')}</span>
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
      </section>

      <div className="container contact-content">
        <div className="contact-info-grid">
          {CONTACT_INFO.map((item) => (
            <div key={item.titleKey} className="card contact-info-card">
              <div className="contact-info-icon">{item.icon}</div>
              <h3 className="contact-info-title">{t(item.titleKey)}</h3>
              <p className="contact-info-detail">
                {item.detail.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="contact-body">
          <div className="card contact-form-card">
            <h2 className="contact-form-title">{t('contact.formTitle')}</h2>
            {submitted && (
              <div className="toast-success animate-fade-in">{t('contact.formSuccess')}</div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="contact-name">{t('contact.yourName')}</label>
                <input id="contact-name" name="name" type="text" placeholder="Rahul Sharma" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">{t('contact.yourEmail')}</label>
                <input id="contact-email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">{t('contact.message')}</label>
                <textarea id="contact-message" name="message" placeholder={t('contact.messagePlaceholder')} rows={5} value={formData.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">{t('contact.send')}</button>
            </form>
          </div>

          <div className="faq-section">
            <h2 className="faq-title">{t('contact.faqTitle')}</h2>
            <div className="faq-list">
              {FAQ_KEYS.map((num) => (
                <div key={num} className={`faq-item ${openFaq === num ? 'open' : ''}`}>
                  <button type="button" className="faq-question" onClick={() => toggleFaq(num)}>
                    <span>{t(`contact.faq${num}q`)}</span>
                    <span className="faq-chevron">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>{t(`contact.faq${num}a`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinic Map */}
        <div className="map-section">
          <h2 className="section-title" style={{ textAlign: 'center', marginTop: '40px' }}>{t('contact.mapTitle')}</h2>
          <ClinicMap />
        </div>
      </div>
    </div>
  );
}

export default Contact;
