import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './Home.css';

const STATS = [
  { value: 500, suffix: '+', label: 'Expert Doctors' },
  { value: 10000, suffix: '+', label: 'Happy Patients' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

const FEATURES = [
  {
    icon: '🩺',
    title: 'Expert Physicians',
    description: 'Connect with board-certified doctors across 20+ specialties tailored to your needs.',
  },
  {
    icon: '📅',
    title: 'Instant Booking',
    description: 'Choose a convenient slot and confirm your visit in seconds — no phone calls needed.',
  },
  {
    icon: '📋',
    title: 'Health Dashboard',
    description: 'Monitor appointments, prescriptions, and medical history all in one place.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your medical data is encrypted end-to-end with enterprise-grade security protocols.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    avatar: 'SJ',
    color: '#3b82f6',
    rating: 5,
    text: 'HealthHub made finding a specialist so easy. I booked my appointment in under a minute and the doctor was fantastic!',
  },
  {
    name: 'Michael Chen',
    role: 'Patient',
    avatar: 'MC',
    color: '#8b5cf6',
    rating: 5,
    text: 'The dashboard keeps track of everything. I never miss an appointment anymore. Truly a game-changer for managing my health.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Patient',
    avatar: 'ER',
    color: '#ec4899',
    rating: 4,
    text: 'Love how clean and intuitive the interface is. Scheduled appointments for my whole family in minutes.',
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
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
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
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-decor" />
        <div className="container hero-inner">
          <span className="section-label animate-fade-in-up">
            #1 Healthcare Platform
          </span>
          <h1 className="hero-title animate-fade-in-up delay-1">
            Your Health,{' '}
            <span className="gradient-text">Our Priority</span>
          </h1>
          <p className="hero-description animate-fade-in-up delay-2">
            Schedule appointments with top-rated physicians in seconds.
            Stay informed with real-time health insights and never miss a check-up again.
          </p>
          <div className="hero-actions animate-fade-in-up delay-3">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/doctors" className="btn btn-outline btn-lg">
              Browse Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-value">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Everything you need for better health</h2>
            <p className="section-subtitle">
              From finding the right specialist to tracking your medical history,
              we've got every aspect of your healthcare journey covered.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className={`card feature-card animate-fade-in-up delay-${index + 1}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="features-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What our patients say</h2>
            <p className="section-subtitle">
              Thousands of patients trust HealthHub for their healthcare needs.
            </p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card testimonial-card">
                <StarRating rating={t.rating} />
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-inner">
          <h2 className="cta-title">Ready to take control of your health?</h2>
          <p className="cta-desc">
            Join thousands of patients who already trust HealthHub. Create your free account today.
          </p>
          <div className="cta-actions">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg cta-outline-btn">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
