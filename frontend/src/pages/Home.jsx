import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container home-page">
      <div className="hero">
        <h1>Your Health, Our Priority</h1>
        <p className="hero-description">
          Schedule appointments with top-rated physicians in seconds.
          Stay informed with real-time health insights and never miss a check-up again.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Get Started
        </Link>
      </div>

      <div className="features">
        <div className="card feature-card">
          <h3>🩺 Expert Physicians</h3>
          <p>Connect with board-certified doctors across 20+ specialties.</p>
        </div>
        <div className="card feature-card">
          <h3>📅 Instant Booking</h3>
          <p>Choose a convenient slot and confirm your visit in one tap.</p>
        </div>
        <div className="card feature-card">
          <h3>📋 Health Dashboard</h3>
          <p>Monitor appointments, prescriptions, and medical history in one place.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
