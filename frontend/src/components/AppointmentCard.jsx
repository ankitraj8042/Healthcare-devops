import './AppointmentCard.css';

function AppointmentCard({ doctor, date, status, onComplete, isUpdating }) {
  const badgeClass = `badge badge-${status}`;
  const canComplete = status !== 'completed' && typeof onComplete === 'function';

  return (
    <div className="card appointment-card">
      <div className="appointment-info">
        <h3 className="doctor-name">Dr. {doctor}</h3>
        <p className="appointment-date">Date: {date}</p>
      </div>
      <div className="appointment-actions">
        <span className={badgeClass}>{status}</span>
        {canComplete ? (
          <button
            type="button"
            className="btn btn-secondary btn-compact"
            onClick={onComplete}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Mark as Completed'}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default AppointmentCard;
