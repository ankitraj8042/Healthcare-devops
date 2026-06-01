import { useState } from 'react';
import './Contact.css';

const CONTACT_INFO = [
  { icon: '📍', title: 'Visit Us', detail: '123 Medical Center Dr, Suite 400\nNew York, NY 10001' },
  { icon: '📞', title: 'Call Us', detail: '(555) 123-4567\nMon–Sat: 8AM–8PM' },
  { icon: '✉️', title: 'Email Us', detail: 'support@healthhub.com\nWe reply within 24 hours' },
  { icon: '💬', title: 'Live Chat', detail: 'Available 24/7\nAverage response: 2 min' },
];

const FAQS = [
  {
    q: 'How do I book an appointment?',
    a: 'Simply create an account, browse our doctors directory, and click "Book Appointment" on any available doctor. You can also book directly from your dashboard.',
  },
  {
    q: 'Can I cancel or reschedule my appointment?',
    a: 'Yes, you can manage your appointments from your dashboard. Cancellations and reschedules are free up to 24 hours before your appointment.',
  },
  {
    q: 'Is my medical data secure?',
    a: 'Absolutely. We use enterprise-grade encryption and comply with HIPAA regulations to ensure your medical data is always protected.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'We work with most major insurance providers. You can verify your coverage during the booking process or contact our support team for assistance.',
  },
  {
    q: 'How do I contact my doctor after a visit?',
    a: 'After your appointment, you can send follow-up messages through your dashboard. Your doctor will respond within 1-2 business days.',
  },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-hero">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className="section-title">We're Here to Help</h1>
          <p className="section-subtitle">
            Have a question or need assistance? Reach out to our support team — we'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container contact-content">
        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          {CONTACT_INFO.map((item) => (
            <div key={item.title} className="card contact-info-card">
              <div className="contact-info-icon">{item.icon}</div>
              <h3 className="contact-info-title">{item.title}</h3>
              <p className="contact-info-detail">
                {item.detail.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        {/* Form + FAQ */}
        <div className="contact-body">
          {/* Contact Form */}
          <div className="card contact-form-card">
            <h2 className="contact-form-title">Send Us a Message</h2>
            {submitted && (
              <div className="toast-success animate-fade-in">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-chevron">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
