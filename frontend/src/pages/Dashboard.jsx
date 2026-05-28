import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import './Dashboard.css';

// Dummy data — replace with API call when backend is ready
const DUMMY_APPOINTMENTS = [
  { id: 1, doctor: 'Sarah Johnson', date: '2026-06-02, 10:00 AM', status: 'confirmed' },
  { id: 2, doctor: 'Michael Chen', date: '2026-06-05, 02:30 PM', status: 'pending' },
  { id: 3, doctor: 'Emily Davis', date: '2026-05-20, 09:00 AM', status: 'cancelled' },
  { id: 4, doctor: 'Raj Patel', date: '2026-06-10, 11:15 AM', status: 'confirmed' },
];

function Dashboard() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // Simulate API call with a short delay
    const timer = setTimeout(() => {
      setAppointments(DUMMY_APPOINTMENTS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const message = location.state?.message;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="container dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, User</h1>
          <p className="dashboard-subtitle">Here are your upcoming appointments.</p>
          {message ? <p className="status-message success">{message}</p> : null}
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="appointments-section">
        <h2>Your Appointments</h2>

        {loading ? (
          <LoadingPlaceholder count={3} />
        ) : appointments.length === 0 ? (
          <p className="no-appointments">No appointments found.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                doctor={apt.doctor}
                date={apt.date}
                status={apt.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
