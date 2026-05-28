import './LoadingPlaceholder.css';

function LoadingPlaceholder({ count = 3 }) {
  return (
    <div className="loading-placeholder">
      {Array.from({ length: count }).map((_, i) => (
        <div className="card skeleton-card" key={i}>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingPlaceholder;
