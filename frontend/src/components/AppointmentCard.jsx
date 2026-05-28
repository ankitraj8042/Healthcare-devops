import './AppointmentCard.css';

function AppointmentCard({ doctor, date, status }) {
  const badgeClass = `badge badge-${status}`;

  return (
    <div className="card appointment-card">
      <div className="appointment-info">
        <h3 className="doctor-name">Dr. {doctor}</h3>
        <p className="appointment-date">📅 {date}</p>
      </div>
      <span className={badgeClass}>{status}</span>
    </div>
  );
}

export default AppointmentCard;
