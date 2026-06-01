import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const STATS = [
  { value: 500, suffix: '+', labelKey: 'home.stat1' },
  { value: 10000, suffix: '+', labelKey: 'home.stat2' },
  { value: 98, suffix: '%', labelKey: 'home.stat3' },
  { value: 250, suffix: '+', labelKey: 'home.stat4' },
];

const FEATURES = [
  { icon: '🩺', titleKey: 'home.feat1Title', descKey: 'home.feat1Desc' },
  { icon: '📅', titleKey: 'home.feat2Title', descKey: 'home.feat2Desc' },
  { icon: '📋', titleKey: 'home.feat3Title', descKey: 'home.feat3Desc' },
  { icon: '🔒', titleKey: 'home.feat4Title', descKey: 'home.feat4Desc' },
];

const TESTIMONIALS = [
  {
    name: 'Rahul Verma',
    role: 'Delhi',
    avatar: 'RV',
    color: '#3b82f6',
    rating: 5,
    text: 'HealthHub ने स्पेशलिस्ट ढूंढना बहुत आसान बना दिया। एक मिनट में अपॉइंटमेंट बुक हो गई!',
    textEn: 'HealthHub made finding a specialist so easy. I booked my appointment in under a minute and the doctor was fantastic!',
  },
  {
    name: 'Anita Desai',
    role: 'Mumbai',
    avatar: 'AD',
    color: '#8b5cf6',
    rating: 5,
    text: 'डैशबोर्ड सब कुछ ट्रैक करता है। अब कोई अपॉइंटमेंट मिस नहीं होती। सच में गेम-चेंजर है!',
    textEn: 'The dashboard keeps track of everything. I never miss an appointment anymore. Truly a game-changer for managing my health.',
  },
  {
    name: 'Karthik Nair',
    role: 'Bengaluru',
    avatar: 'KN',
    color: '#ec4899',
    rating: 4,
    text: 'इंटरफ़ेस बहुत साफ और सहज है। पूरे परिवार के लिए मिनटों में अपॉइंटमेंट बुक कर ली।',
    textEn: 'Love how clean and intuitive the interface is. Scheduled appointments for my whole family in minutes.',
  },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  );
}

function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-bg-decor" />
        <div className="container hero-inner">
          <span className="section-label animate-fade-in-up">{t('home.heroLabel')}</span>
          <h1 className="hero-title animate-fade-in-up delay-1">
            {t('home.heroTitle1')}{' '}
            <span className="gradient-text">{t('home.heroTitle2')}</span>
          </h1>
          <p className="hero-description animate-fade-in-up delay-2">{t('home.heroDesc')}</p>
          <div className="hero-actions animate-fade-in-up delay-3">
            <Link to="/signup" className="btn btn-primary btn-lg">{t('home.getStarted')}</Link>
            <Link to="/doctors" className="btn btn-outline btn-lg">{t('home.browseDoctors')}</Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          {STATS.map((stat) => (
            <div key={stat.labelKey} className="stat-item">
              <div className="stat-value">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <span className="section-label">{t('home.featuresLabel')}</span>
            <h2 className="section-title">{t('home.featuresTitle')}</h2>
            <p className="section-subtitle">{t('home.featuresSubtitle')}</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.titleKey} className={`card feature-card animate-fade-in-up delay-${i + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{t(f.titleKey)}</h3>
                <p className="feature-desc">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="features-header">
            <span className="section-label">{t('home.testimonialsLabel')}</span>
            <h2 className="section-title">{t('home.testimonialsTitle')}</h2>
            <p className="section-subtitle">{t('home.testimonialsSubtitle')}</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((tm) => (
              <div key={tm.name} className="card testimonial-card">
                <StarRating rating={tm.rating} />
                <p className="testimonial-text">
                  "{language === 'en' ? tm.textEn : tm.text}"
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ backgroundColor: tm.color }}>
                    {tm.avatar}
                  </div>
                  <div>
                    <div className="testimonial-name">{tm.name}</div>
                    <div className="testimonial-role">{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2 className="cta-title">{t('home.ctaTitle')}</h2>
          <p className="cta-desc">{t('home.ctaDesc')}</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn btn-primary btn-lg">{t('home.ctaBtn1')}</Link>
            <Link to="/contact" className="btn btn-outline btn-lg cta-outline-btn">{t('home.ctaBtn2')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
