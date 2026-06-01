import { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
} from '../api';
import './Dashboard.css';

const initialFormState = {
  patientName: '',
  doctorName: '',
  date: ''
};

const formatDate = (value) => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString();
};

function Dashboard() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const message = location.state?.message;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const patientName = formData.patientName.trim();
    const doctorName = formData.doctorName.trim();
    const { date } = formData;

    if (!patientName || !doctorName || !date) {
      setError('Patient name, doctor name, and date are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createAppointment({ patientName, doctorName, date });
      setFormData(initialFormState);
      await fetchAppointments();
    } catch (err) {
      setError(err.message || 'Failed to create appointment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async (appointmentId) => {
    setError('');

    try {
      setUpdatingId(appointmentId);
      const updated = await updateAppointmentStatus(
        appointmentId,
        'completed'
      );
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === updated._id ? updated : appointment
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update appointment.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, User</h1>
          <p className="dashboard-subtitle">Manage your appointments and health schedule.</p>
          {message ? <p className="status-message success">{message}</p> : null}
          {error ? <p className="status-message error">{error}</p> : null}
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats">
        <div className="card stat-card">
          <div className="stat-card-icon">📊</div>
          <div>
            <div className="stat-card-value">{appointments.length}</div>
            <div className="stat-card-label">Total Appointments</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-card-icon pending">⏳</div>
          <div>
            <div className="stat-card-value">
              {appointments.filter((a) => a.status === 'pending').length}
            </div>
            <div className="stat-card-label">Pending</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-card-icon completed">✅</div>
          <div>
            <div className="stat-card-value">
              {appointments.filter((a) => a.status === 'completed').length}
            </div>
            <div className="stat-card-label">Completed</div>
          </div>
        </div>
      </div>

      <div className="card appointment-form-card">
        <h2>Book Appointment</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="patientName">Patient Name</label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              placeholder="John Doe"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="doctorName">Doctor Name</label>
            <input
              id="doctorName"
              name="doctorName"
              type="text"
              placeholder="Dr. Smith"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="appointment-form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Book'}
            </button>
          </div>
        </form>
      </div>

      <div className="appointments-section">
        <h2>Your Appointments</h2>

        {loading ? (
          <LoadingPlaceholder count={3} />
        ) : appointments.length === 0 ? (
          <p className="no-appointments">
            <span className="no-appointments-icon">📅</span>
            No appointments yet. Book your first one above!
          </p>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <AppointmentCard
                key={apt._id}
                doctor={apt.doctorName}
                date={formatDate(apt.date)}
                status={apt.status}
                onComplete={() => handleComplete(apt._id)}
                isUpdating={updatingId === apt._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
