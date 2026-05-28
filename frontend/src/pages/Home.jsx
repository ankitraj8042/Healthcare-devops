import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container home-page">
      <div className="hero">
        <h1>Welcome to Healthcare System</h1>
        <p className="hero-description">
          Book appointments with trusted doctors quickly and easily.
          Manage your health records and stay on top of your medical schedule.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Book Appointment
        </Link>
      </div>

      <div className="features">
        <div className="card feature-card">
          <h3>🩺 Find Doctors</h3>
          <p>Browse through our list of qualified healthcare professionals.</p>
        </div>
        <div className="card feature-card">
          <h3>📅 Easy Scheduling</h3>
          <p>Pick a date and time that works best for you.</p>
        </div>
        <div className="card feature-card">
          <h3>📋 Track Records</h3>
          <p>View your appointment history and upcoming visits.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
